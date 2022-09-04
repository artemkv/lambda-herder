import {
  initialize,
  reportEvent,
  reportStageTransition,
  reportError,
} from 'journey3-react-native-sdk';
import {
  ORDER_BY_NAME,
  ORDER_BY_DATE,
  ORDER_BY_INVOCATIONS,
  ORDER_BY_DURATION,
  ORDER_BY_ERRORS,
  ORDER_BY_THROTTLING,
  ORDER_BY_CNCS,
} from './awslambdaordering';

const ACCEPT_POLICY_STAGE = 2;
const ACCEPT_POLICY_STAGE_NAME = 'accept';

const DEMO_STAGE = 3;
const DEMO_STAGE_NAME = 'demo';

const CONNECT_STAGE = 4;
const CONNECT_STAGE_NAME = 'connect';

export const startSession = _ => {
  const isRelease = __DEV__ ? false : true;
  initialize(
    'e04b43c9-69c1-4172-9dfd-a3ef1aa17d5e',
    '9d6261fe-e565-47bf-8a83-6ee801f43d43',
    '1.0',
    isRelease,
  );
};

export const reportAceptedPolicy = _ => {
  reportStageTransition(ACCEPT_POLICY_STAGE, ACCEPT_POLICY_STAGE_NAME);
};

export const reportEnterWithDemoData = _ => {
  reportStageTransition(DEMO_STAGE, DEMO_STAGE_NAME);
};

export const reportConnectedAccount = _ => {
  reportStageTransition(CONNECT_STAGE, CONNECT_STAGE_NAME);
};

export const reportNavigateToLambdaDetails = _ => {
  reportEvent('navto_lambda_details');
};

export const reportNavigateToFilter = _ => {
  reportEvent('navto_filter');
};

export const reportChangeRegion = _ => {
  reportEvent('change_region');
};

export const reportApplyFilter = _ => {
  reportEvent('apply_filter');
};

export const reportPickSortingOrder = order => {
  let orderString = '';
  switch (order) {
    case ORDER_BY_NAME:
      orderString = 'name';
      break;
    case ORDER_BY_DATE:
      orderString = 'date';
      break;
    case ORDER_BY_INVOCATIONS:
      orderString = 'inv';
      break;
    case ORDER_BY_DURATION:
      orderString = 'dur';
      break;
    case ORDER_BY_ERRORS:
      orderString = 'err';
      break;
    case ORDER_BY_THROTTLING:
      orderString = 'thr';
      break;
    case ORDER_BY_CNCS:
      orderString = 'cnc';
      break;
  }

  reportEvent(`sort_by_${orderString}`);
};

export const reportUnlinkAccount = _ => {
  reportEvent('unlink_acc');
};

export const reportErrorLoadingLambdaList = _ => {
  reportError('err_load_lambda_list');
};

export const reportErrorLoadingLambdaDetails = _ => {
  reportError('err_load_lambda_details');
};
