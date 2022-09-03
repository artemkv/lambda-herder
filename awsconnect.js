import 'react-native-url-polyfill/auto';

import {LambdaClient, ListFunctionsCommand} from '@aws-sdk/client-lambda';
import {
  CloudWatchLogsClient,
  GetLogEventsCommand,
  DescribeLogStreamsCommand,
} from '@aws-sdk/client-cloudwatch-logs';
import {
  CloudWatchClient,
  GetMetricDataCommand,
} from '@aws-sdk/client-cloudwatch';
import {from, pair} from 'datashaper-js';
import {listLambdasDemo, getMetricDataDemo, getLogsDemo} from './awsdemodata';
import {
  ORDER_BY_NAME,
  ORDER_BY_DATE,
  ORDER_BY_INVOCATIONS,
  ORDER_BY_DURATION,
  ORDER_BY_ERRORS,
  ORDER_BY_THROTTLING,
  ORDER_BY_CNCS,
} from './awslambdaordering';

const byDate = (a, b) => new Date(a).getTime() - new Date(b).getTime();
const byDateDescending = (a, b) =>
  new Date(b).getTime() - new Date(a).getTime();
const byName = (a, b) => a.localeCompare(b);

const isDemo = (accessKeyId, secretAccessKey) => {
  return !accessKeyId || !secretAccessKey;
};

const sum = aa => aa.reduce((acc, cur) => acc + cur, 0);
const avg = aa => (aa.length > 0 ? sum(aa) / aa.length : 0);

export const listLambdas = async (
  region,
  accessKeyId,
  secretAccessKey,
  order,
) => {
  if (isDemo(accessKeyId, secretAccessKey)) {
    return listLambdasDemo(order);
  }

  const client = new LambdaClient({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
  const command = new ListFunctionsCommand({});
  const data = await client.send(command);

  // Only second page is supported, arriving at 100 lambdas max
  let data2 = {Functions: []};
  if (data.NextMarker) {
    const command2 = new ListFunctionsCommand({
      Marker: data.NextMarker,
    });
    data2 = await client.send(command2);
  }

  let pipe = from(data.Functions).concat(data2.Functions);
  if (order === ORDER_BY_NAME) {
    pipe = pipe.sorted((a, b) => byName(a.FunctionName, b.FunctionName));
  } else if (order === ORDER_BY_DATE) {
    pipe = pipe.sorted((a, b) =>
      byDateDescending(a.LastModified, b.LastModified),
    );
  }
  return pipe.map(f => f.FunctionName).return();
};

// Different metrics:
// https://docs.aws.amazon.com/lambda/latest/dg/monitoring-metrics.html
// Good ones:
// - Invocations
// - Errors
// - Throttles
// - Duration
// - ConcurrentExecutions
export const getMetricData = async (
  region,
  names,
  accessKeyId,
  secretAccessKey,
  order,
) => {
  if (isDemo(accessKeyId, secretAccessKey)) {
    return getMetricDataDemo(names, order);
  }

  const client = new CloudWatchClient({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });

  const metricIds = {};

  const preparedMetrics = names.flatMap((name, idx) => {
    const id = `${idx}`;
    metricIds[name] = id;
    return prepareMetricQueries(id, name);
  });

  const now = new Date();
  const start = new Date(now.getTime());
  start.setHours(start.getHours() - 24);

  // 500 metrics per call
  // 100,800 data points per call
  const command = new GetMetricDataCommand({
    StartTime: start,
    EndTime: now,
    MetricDataQueries: preparedMetrics,
  });

  const data = await client.send(command);

  const metrics = from(data.MetricDataResults)
    .toMap(
      x => x.Id,
      x => {
        return from(x.Timestamps)
          .zip(x.Values, pair)
          .sorted((a, b) => byDate(a.fst, b.fst))
          .map(ts => ts.snd)
          .return();
      },
    )
    .return();

  let pipe = from(names).map(n => ({
    name: n,
    metrics: {
      inv: prependZeroes(metrics[getInvocationsId(metricIds[n])], 24),
      dur: prependZeroes(metrics[getDurationId(metricIds[n])], 24),
      err: prependZeroes(metrics[getErrorsId(metricIds[n])], 24),
      thr: prependZeroes(metrics[getThrottlesId(metricIds[n])], 24),
      cnc: prependZeroes(metrics[getConcurrentExecutionsId(metricIds[n])], 24),
    },
    aggregates: {
      inv: sum(metrics[getInvocationsId(metricIds[n])]),
      dur: avg(metrics[getDurationId(metricIds[n])]),
      err: sum(metrics[getErrorsId(metricIds[n])]),
      thr: sum(metrics[getThrottlesId(metricIds[n])]),
      cnc: avg(metrics[getConcurrentExecutionsId(metricIds[n])]),
    },
  }));

  if (order === ORDER_BY_INVOCATIONS) {
    pipe = pipe.sorted((a, b) => b.aggregates.inv - a.aggregates.inv);
  } else if (order === ORDER_BY_DURATION) {
    pipe = pipe.sorted((a, b) => b.aggregates.dur - a.aggregates.dur);
  } else if (order === ORDER_BY_ERRORS) {
    pipe = pipe.sorted((a, b) => b.aggregates.err - a.aggregates.err);
  } else if (order === ORDER_BY_THROTTLING) {
    pipe = pipe.sorted((a, b) => b.aggregates.thr - a.aggregates.thr);
  } else if (order === ORDER_BY_CNCS) {
    pipe = pipe.sorted((a, b) => b.aggregates.cnc - a.aggregates.cnc);
  }

  return pipe.return();
};

const prependZeroes = (aa, n) => {
  return [...Array(n - aa.length).fill(0), ...aa];
};

const MAX_LOG_MESSAGES_SHOWN = 50;

export const getLogs = async (
  region,
  lambdaName,
  accessKeyId,
  secretAccessKey,
) => {
  if (isDemo(accessKeyId, secretAccessKey)) {
    return getLogsDemo();
  }

  const client = new CloudWatchLogsClient({
    region: region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });

  const logGroupName = `/aws/lambda/${lambdaName}`;

  let allMessages = [];
  const logStreamNames = await getLatestLogStreamNames(client, logGroupName);

  for (let i = 0; i < logStreamNames.length; i++) {
    const logStreamName = logStreamNames[i];

    const command = new GetLogEventsCommand({
      logGroupName,
      logStreamName,
      limit: MAX_LOG_MESSAGES_SHOWN,
    });

    const data = await client.send(command);
    const messages = from(data.events)
      .map(x => x.message)
      .take(MAX_LOG_MESSAGES_SHOWN - allMessages.length)
      .return();
    allMessages = [...allMessages, ...messages];

    if (allMessages.length >= MAX_LOG_MESSAGES_SHOWN) {
      return allMessages;
    }
  }

  return allMessages;
};

const getLatestLogStreamNames = async (client, logGroupName) => {
  const describeLogStreams = new DescribeLogStreamsCommand({
    logGroupName,
    orderBy: 'LastEventTime',
    descending: true,
  });
  const data = await client.send(describeLogStreams);
  return data.logStreams.map(x => x.logStreamName);
};

const getInvocationsId = id => `m_${id}_inv`;
const getDurationId = id => `m_${id}_dur`;
const getErrorsId = id => `m_${id}_err`;
const getThrottlesId = id => `m_${id}_thr`;
const getConcurrentExecutionsId = id => `m_${id}_cnc`;

const prepareMetricQueries = (id, metricName) => {
  return [
    {
      Id: getInvocationsId(id),
      MetricStat: {
        Metric: {
          Namespace: 'AWS/Lambda',
          MetricName: 'Invocations',
          Dimensions: [
            {
              Name: 'FunctionName',
              Value: metricName,
            },
          ],
        },
        Period: 3600,
        Stat: 'Sum',
      },
    },
    {
      Id: getDurationId(id),
      MetricStat: {
        Metric: {
          Namespace: 'AWS/Lambda',
          MetricName: 'Duration',
          Dimensions: [
            {
              Name: 'FunctionName',
              Value: metricName,
            },
          ],
        },
        Period: 3600,
        Stat: 'Average',
      },
    },
    {
      Id: getErrorsId(id),
      MetricStat: {
        Metric: {
          Namespace: 'AWS/Lambda',
          MetricName: 'Errors',
          Dimensions: [
            {
              Name: 'FunctionName',
              Value: metricName,
            },
          ],
        },
        Period: 3600,
        Stat: 'Sum',
      },
    },
    {
      Id: getThrottlesId(id),
      MetricStat: {
        Metric: {
          Namespace: 'AWS/Lambda',
          MetricName: 'Throttles',
          Dimensions: [
            {
              Name: 'FunctionName',
              Value: metricName,
            },
          ],
        },
        Period: 3600,
        Stat: 'Sum',
      },
    },
    {
      Id: getConcurrentExecutionsId(id),
      MetricStat: {
        Metric: {
          Namespace: 'AWS/Lambda',
          MetricName: 'ConcurrentExecutions',
          Dimensions: [
            {
              Name: 'FunctionName',
              Value: metricName,
            },
          ],
        },
        Period: 3600,
        Stat: 'Maximum',
      },
    },
  ];
};
