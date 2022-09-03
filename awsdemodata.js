import {ORDER_BY_NAME} from './state/constants';

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

export const getMetricDataDemo = names => {
  const metricData = [
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

  return names.map(n => metricData.filter(m => m.name === n)[0]);
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
