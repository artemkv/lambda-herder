import {set, view, lensProp, compose} from 'ramda';
import getInitialState from './initialstate';
import actionTypes from './actiontypes';
import {getRegionIndex} from '../awsregions';
import {NEED_ACCEPTANCE, NEED_CONNECTION, ALL_GOOD, SPLASH} from './constants';

const flowStateProp = lensProp('flowState');
const settingsProp = lensProp('settings');
const filterProp = lensProp('filter');
const regionProp = lensProp('region');
const regionNameProp = lensProp('regionName');
const orderProp = lensProp('order');

const flowStateLens = compose(flowStateProp);
const filterRegionLens = compose(filterProp, regionProp);
const filterOrderLens = compose(filterProp, orderProp);
const settingsRegionLens = compose(settingsProp, regionProp);
const settingsRegionNameLens = compose(settingsProp, regionNameProp);
const settingsOrderLens = compose(settingsProp, orderProp);

export default function (state = getInitialState(), action) {
  if (action.type === actionTypes.INIT_FILTER) {
    return compose(
      s =>
        set(
          filterRegionLens,
          s.filter.regions[getRegionIndex(s.settings.region)],
          s,
        ),
      s => set(filterOrderLens, view(settingsOrderLens, s), s),
    )(state);
  } else if (action.type === actionTypes.APPLY_FILTER) {
    return compose(
      s => set(settingsRegionLens, view(filterRegionLens, s).region, s),
      s => set(settingsRegionNameLens, view(filterRegionLens, s).name, s),
      s => set(settingsOrderLens, view(filterOrderLens, s), s),
    )(state);
  } else if (action.type === actionTypes.UPDATE_FILTER_REGION) {
    return set(filterRegionLens, action.payload.region, state);
  } else if (action.type === actionTypes.UPDATE_FILTER_ORDER) {
    return set(filterOrderLens, action.payload.order, state);
  } else if (action.type === actionTypes.FLOW_REINIT) {
    return set(flowStateLens, SPLASH, state);
  } else if (action.type === actionTypes.FLOW_NEED_ACCEPTANCE) {
    return set(flowStateLens, NEED_ACCEPTANCE, state);
  } else if (action.type === actionTypes.FLOW_NEED_CONNECTION) {
    return set(flowStateLens, NEED_CONNECTION, state);
  } else if (action.type === actionTypes.FLOW_ALL_GOOD) {
    return set(flowStateLens, ALL_GOOD, state);
  }

  return state;
}
