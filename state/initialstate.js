import {getDefaultRegion, getRegionIndex, getRegions} from '../awsregions';
import {
  getOrderOptions,
  getDefaultOrderOption,
  getOrderOptionIndex,
} from '../awslambdaordering';
import {SPLASH} from './constants';

const getInitialState = () => {
  const regions = getRegions();
  const orderOptions = getOrderOptions();

  return {
    flowState: SPLASH,
    settings: {
      region: getDefaultRegion(), // e.g. 'us-east-1'
      regionName: regions[getRegionIndex(getDefaultRegion())].name, // e.g. 'US East (N. Virginia)'
      order: getDefaultOrderOption(), // e.g. ORDER_BY_NAME
    },
    filter: {
      regions,
      regionIndex: getRegionIndex(getDefaultRegion()),
      orderOptions,
      orderIndex: getOrderOptionIndex(getDefaultOrderOption()),
    },
  };
};

export default getInitialState;
