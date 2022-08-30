const regions = [
  {region: 'us-east-1', name: 'US East (N. Virginia)'},
  {region: 'us-east-2', name: 'US East (Ohio)'},
  {region: 'us-west-1', name: 'US West (N. California)'},
  {region: 'us-west-2', name: 'US West (Oregon)'},
  {region: 'af-south-1', name: 'Africa (Cape Town)'},
  {region: 'ap-east-1', name: 'Asia Pacific (Hong Kong)'},
  {region: 'ap-southeast-3', name: 'Asia Pacific (Jakarta)'},
  {region: 'ap-south-1', name: 'Asia Pacific (Mumbai)'},
  {region: 'ap-northeast-3', name: 'Asia Pacific (Osaka)'},
  {region: 'ap-northeast-2', name: 'Asia Pacific (Seoul)'},
  {region: 'ap-southeast-1', name: 'Asia Pacific (Singapore)'},
  {region: 'ap-southeast-2', name: 'Asia Pacific (Sydney)'},
  {region: 'ap-northeast-1', name: 'Asia Pacific (Tokyo)'},
  {region: 'ca-central-1', name: 'Canada (Central)'},
  {region: 'eu-central-1', name: 'Europe (Frankfurt)'},
  {region: 'eu-west-1', name: 'Europe (Ireland)'},
  {region: 'eu-west-2', name: 'Europe (London)'},
  {region: 'eu-south-1', name: 'Europe (Milan)'},
  {region: 'eu-west-3', name: 'Europe (Paris)'},
  {region: 'eu-north-1', name: 'Europe (Stockholm)'},
  {region: 'me-south-1', name: 'Middle East (Bahrain)'},
  {region: 'sa-east-1', name: 'South America (São Paulo)'},
];

export const getRegions = () => regions;

export const getDefaultRegion = () => regions[0].region;

export const getRegionIndex = region => {
  for (let i = 0; i < regions.length; i++) {
    if (regions[i].region === region) {
      return i;
    }
  }
  return 0;
};
