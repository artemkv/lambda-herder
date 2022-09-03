import actionTypes from './actiontypes';

export const applyFilter = _ => ({
  type: actionTypes.APPLY_FILTER,
  payload: {},
});

export const initFilter = _ => ({
  type: actionTypes.INIT_FILTER,
  payload: {},
});

export const updateFilterRegionIndex = regionIndex => ({
  type: actionTypes.UPDATE_FILTER_REGION,
  payload: {regionIndex},
});

export const updateFilterOrderIndex = orderIndex => ({
  type: actionTypes.UPDATE_FILTER_ORDER,
  payload: {orderIndex},
});

export const restoreFilter = (region, order) => ({
  type: actionTypes.RESTORE_FILTER,
  payload: {region, order},
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
