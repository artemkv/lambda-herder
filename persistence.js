import AsyncStorage from '@react-native-async-storage/async-storage';

const ACCEPTANCE_KEY = 'lh.acc.json';
const CONNECTION_KEY = 'lh.conn.json';

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
