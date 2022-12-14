import AsyncStorage from '@react-native-async-storage/async-storage';

const ACCEPTANCE_KEY = 'lh.acc.json';
const CONNECTION_KEY = 'lh.conn.json';
const SELECTED_REGION_KEY = 'lh.region.json';
const SELECTED_ORDER_KEY = 'lh.order.json';

export const getAcceptance = async () => {
  const json = await AsyncStorage.getItem(ACCEPTANCE_KEY);
  if (!json) {
    return {
      status: false,
    };
  }
  return JSON.parse(json);
};

export const saveAcceptance = async acc => {
  return AsyncStorage.setItem(ACCEPTANCE_KEY, JSON.stringify(acc));
};

export const clearAcceptance = async _ => {
  return AsyncStorage.removeItem(ACCEPTANCE_KEY);
};

export const getConnection = async () => {
  const json = await AsyncStorage.getItem(CONNECTION_KEY);
  if (!json) {
    return {
      accessKeyId: '',
      secretAccessKey: '',
    };
  }
  return JSON.parse(json);
};

export const saveConnection = async conn => {
  return AsyncStorage.setItem(CONNECTION_KEY, JSON.stringify(conn));
};

export const clearConnection = async _ => {
  return AsyncStorage.removeItem(CONNECTION_KEY);
};

export const saveSelectedRegion = async region => {
  return AsyncStorage.setItem(SELECTED_REGION_KEY, region);
};

export const getSelectedRegion = async () => {
  return await AsyncStorage.getItem(SELECTED_REGION_KEY);
};

export const saveSelectedOrder = async order => {
  return AsyncStorage.setItem(SELECTED_ORDER_KEY, `${order}`);
};

export const getSelectedOrder = async () => {
  const json = await AsyncStorage.getItem(SELECTED_ORDER_KEY);
  if (!json) {
    return 0;
  }
  return parseInt(json, 10);
};
