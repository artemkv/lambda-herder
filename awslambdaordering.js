export const ORDER_BY_NAME = 0;
export const ORDER_BY_DATE = 1;
export const ORDER_BY_INVOCATIONS = 2;
export const ORDER_BY_DURATION = 3;
export const ORDER_BY_ERRORS = 4;
export const ORDER_BY_THROTTLING = 5;
export const ORDER_BY_CNCS = 6;

const orderOptions = [
  {name: 'Function name', order: ORDER_BY_NAME},
  {name: 'Date modified', order: ORDER_BY_DATE},
  {name: '# of invocations', order: ORDER_BY_INVOCATIONS},
  {name: 'Avg duration', order: ORDER_BY_DURATION},
  {name: '# of errors', order: ORDER_BY_ERRORS},
  {name: '# of throttles', order: ORDER_BY_THROTTLING},
  {name: 'Avg # of concurrent executions', order: ORDER_BY_CNCS},
];

export const getOrderOptions = () => orderOptions;

export const getDefaultOrderOption = () => ORDER_BY_NAME;

export const getOrderOptionIndex = order => {
  for (let i = 0; i < orderOptions.length; i++) {
    if (orderOptions[i].order === order) {
      return i;
    }
  }
  return 0;
};
