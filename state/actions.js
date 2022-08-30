import actionTypes from './actiontypes';

export const applyFilter = _ => ({
  type: actionTypes.APPLY_FILTER,
  payload: {},
});

export const initFilter = _ => ({
  type: actionTypes.INIT_FILTER,
  payload: {},
});

export const updateFilterRegion = region => ({
  type: actionTypes.UPDATE_FILTER_REGION,
  payload: {region},
});

export const flowReInit = _ => ({
  type: actionTypes.FLOW_REINIT,
  payload: {},
});

export const flowNeedAcceptance = _ => ({
  type: actionTypes.FLOW_NEED_ACCEPTANCE,
  payload: {},
});

export const flowNeedConnection = _ => ({
  type: actionTypes.FLOW_NEED_CONNECTION,
  payload: {},
});

export const flowAllGood = _ => ({
  type: actionTypes.FLOW_ALL_GOOD,
  payload: {},
});
