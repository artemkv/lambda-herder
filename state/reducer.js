import {set, view, lensProp, compose} from 'ramda';
import getInitialState from './initialstate';
import actionTypes from './actiontypes';
import {getRegionIndex} from '../awsregions';
import {getOrderOptionIndex} from '../awslambdaordering';
import {NEED_ACCEPTANCE, NEED_CONNECTION, ALL_GOOD, SPLASH} from './constants';

const flowStateProp = lensProp('flowState');
const settingsProp = lensProp('settings');
const filterProp = lensProp('filter');
const regionProp = lensProp('region');
const regionNameProp = lensProp('regionName');
const orderProp = lensProp('order');
const regionIndexProp = lensProp('regionIndex');
const orderIndexProp = lensProp('orderIndex');

const flowStateLens = compose(flowStateProp);
const filterRegionIndexLens = compose(filterProp, regionIndexProp);
const filterOrderIndexLens = compose(filterProp, orderIndexProp);
const settingsRegionLens = compose(settingsProp, regionProp);
const settingsRegionNameLens = compose(settingsProp, regionNameProp);
const settingsOrderLens = compose(settingsProp, orderProp);

export default function (state = getInitialState(), action) {
  if (action.type === actionTypes.INIT_FILTER) {
    return compose(
      s => set(filterRegionIndexLens, getRegionIndex(s.settings.region), s),
      s => set(filterOrderIndexLens, getOrderOptionIndex(s.settings.order), s),
    )(state);
  } else if (action.type === actionTypes.APPLY_FILTER) {
    return compose(
      s =>
        set(
          settingsRegionLens,
          state.filter.regions[view(filterRegionIndexLens, s)].region,
          s,
        ),
      s =>
        set(
          settingsRegionNameLens,
          state.filter.regions[view(filterRegionIndexLens, s)].name,
          s,
        ),
      s =>
        set(
          settingsOrderLens,
          state.filter.orderOptions[view(filterOrderIndexLens, s)].order,
          s,
        ),
    )(state);
  } else if (action.type === actionTypes.UPDATE_FILTER_REGION) {
    return set(filterRegionIndexLens, action.payload.regionIndex, state);
  } else if (action.type === actionTypes.UPDATE_FILTER_ORDER) {
    return set(filterOrderIndexLens, action.payload.orderIndex, state);
  } else if (action.type === actionTypes.RESTORE_FILTER) {
    return compose(
      s =>
        set(
          settingsRegionLens,
          state.filter.regions[getRegionIndex(action.payload.region)].region,
          s,
        ),
      s =>
        set(
          settingsRegionNameLens,
          state.filter.regions[getRegionIndex(action.payload.region)].name,
          s,
        ),
      s =>
        set(
          settingsOrderLens,
          state.filter.orderOptions[getOrderOptionIndex(action.payload.order)]
            .order,
          s,
        ),
    )(state);
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
