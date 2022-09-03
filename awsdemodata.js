import {from} from 'datashaper-js';
import {
  ORDER_BY_NAME,
  ORDER_BY_DATE,
  ORDER_BY_INVOCATIONS,
  ORDER_BY_DURATION,
  ORDER_BY_ERRORS,
  ORDER_BY_THROTTLING,
  ORDER_BY_CNCS,
} from './state/constants';

const sum = aa => aa.reduce((acc, cur) => acc + cur, 0);
const avg = aa => (aa.length > 0 ? sum(aa) / aa.length : 0);

export const listLambdasDemo = order => {
  if (order === ORDER_BY_NAME) {
    return [
      'demo-lambda-function-01',
      'demo-lambda-function-02',
      'demo-lambda-function-03',
      'demo-lambda-function-04',
      'demo-lambda-function-05',
    ];
  }
  return [
    'demo-lambda-function-03',
    'demo-lambda-function-04',
    'demo-lambda-function-01',
    'demo-lambda-function-05',
    'demo-lambda-function-02',
  ];
};

export const getMetricDataDemo = (names, order) => {
  let metricData = [
    {
      name: 'demo-lambda-function-01',
      metrics: {
        inv: randomArray(24, 1000),
        dur: randomArray(24, 1000),
        err: randomArray(24, 10),
        thr: randomArray(24, 2),
        cnc: randomArray(24, 3),
      },
    },
    {
      name: 'demo-lambda-function-02',
      metrics: {
        inv: randomArray(24, 1000),
        dur: randomArray(24, 1000),
        err: randomArray(24, 10),
        thr: randomArray(24, 2),
        cnc: randomArray(24, 3),
      },
    },
    {
      name: 'demo-lambda-function-03',
      metrics: {
        inv: randomArray(24, 1000),
        dur: randomArray(24, 1000),
        err: randomArray(24, 10),
        thr: randomArray(24, 2),
        cnc: randomArray(24, 3),
      },
    },
    {
      name: 'demo-lambda-function-04',
      metrics: {
        inv: randomArray(24, 1000),
        dur: randomArray(24, 1000),
        err: randomArray(24, 10),
        thr: randomArray(24, 2),
        cnc: randomArray(24, 3),
      },
    },
    {
      name: 'demo-lambda-function-05',
      metrics: {
        inv: randomArray(24, 1000),
        dur: randomArray(24, 1000),
        err: randomArray(24, 10),
        thr: randomArray(24, 2),
        cnc: randomArray(24, 3),
      },
    },
  ];

  let pipe = from(metricData).map(m => ({
    name: m.name,
    metrics: m.metrics,
    aggregates: {
      inv: sum(m.metrics.inv),
      dur: avg(m.metrics.dur),
      err: sum(m.metrics.err),
      thr: sum(m.metrics.thr),
      cnc: avg(m.metrics.cnc),
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

  metricData = pipe.return();

  if (order === ORDER_BY_NAME || order === ORDER_BY_DATE) {
    return names.map(n => metricData.filter(m => m.name === n)[0]);
  }
  return metricData;
};

const randomArray = (n, r) => {
  return Array.from({length: n}, () => Math.floor(Math.random() * r));
};

export const getLogsDemo = () => {
  return getRandomLogs(10);
};

const getSuccessLogs = () => {
  return [
    'START RequestId: d626f790-eeb0-42c2-88d2-765d9c5cfeab Version: $LATEST\n',
    '2022-08-30T13:39:53.965Z	d626f790-eeb0-42c2-88d2-765d9c5cfeab	INFO	Rnd: 0.8042344992135853\n',
    '2022-08-30T13:39:53.965Z	d626f790-eeb0-42c2-88d2-765d9c5cfeab	INFO	all good\n',
    'END RequestId: d626f790-eeb0-42c2-88d2-765d9c5cfeab\n',
    'REPORT RequestId: d626f790-eeb0-42c2-88d2-765d9c5cfeab	Duration: 2.62 ms	Billed Duration: 3 ms	Memory Size: 1024 MB	Max Memory Used: 55 MB	Init Duration: 155.07 ms\n',
  ];
};

const getErrorLogs = () => {
  return [
    'START RequestId: 6becd088-8e8b-432d-bd45-78ed3df7724f Version: $LATEST\n',
    '2022-08-30T12:09:54.297Z	6becd088-8e8b-432d-bd45-78ed3df7724f	INFO	Rnd: 0.19676790147007583\n',
    '2022-08-30T12:09:54.298Z	6becd088-8e8b-432d-bd45-78ed3df7724f	ERROR	Invoke Error 	\n    {\n        "errorType": "Error",\n        "errorMessage": "Exception in lambda!",\n        "stack": [\n            "Error: Exception in lambda!",\n            "    at Runtime.exports.run [as handler] (/var/task/handler.js:6:11)",\n            "    at Runtime.handleOnce (/var/runtime/Runtime.js:66:25)"\n        ]\n    }\n',
    'END RequestId: 6becd088-8e8b-432d-bd45-78ed3df7724f\n',
  ];
};

const getRandomLogs = n => {
  return Array.from({length: n}, () => Math.floor(Math.random() * 10))
    .map(x => (x <= 2 ? getErrorLogs() : getSuccessLogs()))
    .flatMap(x => x);
};
