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
import {jj} from './util';

const byDate = (a, b) => new Date(a).getTime() - new Date(b).getTime();
const byDateDescending = (a, b) =>
  new Date(b).getTime() - new Date(a).getTime();

// Different metrics:
// https://docs.aws.amazon.com/lambda/latest/dg/monitoring-metrics.html
// Good ones:
// - Invocations
// - Errors
// - Throttles
// - Duration
// - ConcurrentExecutions

// TODO: sorting
// TODO: paging
export const listLambdas = async (region, accessKeyId, secretAccessKey) => {
  const client = new LambdaClient({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
  // max 50 items, paginate for more
  // https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-lambda/interfaces/listfunctionscommandinput.html
  const command = new ListFunctionsCommand({});
  const data = await client.send(command);
  return from(data.Functions)
    .sorted((a, b) => byDateDescending(a.LastModified, b.LastModified))
    .map(f => f.FunctionName)
    .return();
};

export const getMetricData = async (
  region,
  names,
  accessKeyId,
  secretAccessKey,
) => {
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

  return from(names)
    .map(n => ({
      name: n,
      metrics: {
        inv: prependZeroes(metrics[getInvocationsId(metricIds[n])], 24),
        dur: prependZeroes(metrics[getDurationId(metricIds[n])], 24),
        err: prependZeroes(metrics[getErrorsId(metricIds[n])], 24),
        thr: prependZeroes(metrics[getThrottlesId(metricIds[n])], 24),
        cnc: prependZeroes(
          metrics[getConcurrentExecutionsId(metricIds[n])],
          24,
        ),
      },
    }))
    .return();
};

const prependZeroes = (aa, n) => {
  return [...Array(n - aa.length).fill(0), ...aa];
};

export const getLogs = async (
  region,
  lambdaName,
  accessKeyId,
  secretAccessKey,
) => {
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
  // TODO: stop after certain amount of events
  for (let i = 0; i < logStreamNames.length; i++) {
    const logStreamName = logStreamNames[i];

    // TODO:  check if can specify the limit here
    const command = new GetLogEventsCommand({
      logGroupName,
      logStreamName,
    });

    const data = await client.send(command);
    // TODO: could limit here as well
    const messages = data.events.map(x => x.message);
    allMessages = [...allMessages, ...messages];
  }

  return allMessages;
};

const getLatestLogStreamNames = async (client, logGroupName) => {
  const describeLogStreams = new DescribeLogStreamsCommand({
    logGroupName,
    limit: 10,
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
