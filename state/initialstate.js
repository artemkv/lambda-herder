import {getDefaultRegion, getRegionIndex, getRegions} from '../awsregions';
import {SPLASH, ORDER_BY_NAME} from './constants';

const getInitialState = () => {
  const regions = getRegions();

  return {
    flowState: SPLASH,
    settings: {
      region: getDefaultRegion(), // 'us-east-1'
      regionName: regions[getRegionIndex(getDefaultRegion())].name,
      order: ORDER_BY_NAME,
    },
    filter: {
      regions,
      region: regions[getRegionIndex(getDefaultRegion())], // {region: 'us-east-1', name: 'US East (N. Virginia)'}
      order: ORDER_BY_NAME,
    },
  };
};

export default getInitialState;
