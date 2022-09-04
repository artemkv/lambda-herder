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

export const restoreAppState = (region, order) => ({
  type: actionTypes.RESTORE_APP_STATE,
  payload: {region, order},
});

export const updateSortingOrderIndex = orderIndex => ({
  type: actionTypes.UPDATE_SORTING_ORDER,
  payload: {orderIndex},
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
