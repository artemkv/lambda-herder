import {getDefaultRegion, getRegionIndex, getRegions} from '../awsregions';
import {SPLASH} from './constants';

const getInitialState = () => {
  const regions = getRegions();

  return {
    flowState: SPLASH,
    settings: {
      region: getDefaultRegion(), // 'us-east-1'
      regionName: regions[getRegionIndex(getDefaultRegion())].name,
    },
    filter: {
      regions,
      region: regions[getRegionIndex(getDefaultRegion())], // {region: 'us-east-1', name: 'US East (N. Virginia)'}
    },
  };
};

export default getInitialState;
