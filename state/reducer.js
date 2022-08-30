import getInitialState from './initialstate';
import actionTypes from './actiontypes';
import {getRegionIndex} from '../awsregions';
import {NEED_ACCEPTANCE, NEED_CONNECTION, ALL_GOOD, SPLASH} from './constants';

// TODO: use some lens library
export default function (state = getInitialState(), action) {
  if (action.type === actionTypes.INIT_FILTER) {
    return {
      flowState: state.flowState,
      settings: state.settings,
      filter: {
        regions: state.filter.regions,
        region: state.filter.regions[getRegionIndex(state.settings.region)],
      },
    };
  } else if (action.type === actionTypes.APPLY_FILTER) {
    return {
      flowState: state.flowState,
      settings: {
        region: state.filter.region.region,
        regionName: state.filter.region.name,
      },
      filter: state.filter,
    };
  } else if (action.type === actionTypes.UPDATE_FILTER_REGION) {
    return {
      flowState: state.flowState,
      settings: state.settings,
      filter: {
        regions: state.filter.regions,
        region: action.payload.region,
      },
    };
  } else if (action.type === actionTypes.FLOW_REINIT) {
    return {
      flowState: SPLASH,
      settings: state.settings,
      filter: state.filter,
    };
  } else if (action.type === actionTypes.FLOW_NEED_ACCEPTANCE) {
    return {
      flowState: NEED_ACCEPTANCE,
      settings: state.settings,
      filter: state.filter,
    };
  } else if (action.type === actionTypes.FLOW_NEED_CONNECTION) {
    return {
      flowState: NEED_CONNECTION,
      settings: state.settings,
      filter: state.filter,
    };
  } else if (action.type === actionTypes.FLOW_ALL_GOOD) {
    return {
      flowState: ALL_GOOD,
      settings: state.settings,
      filter: state.filter,
    };
  }

  return state;
}
