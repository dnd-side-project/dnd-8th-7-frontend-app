import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key: string, value: object) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    return Promise.resolve();
  } catch (e) {
    return Promise.reject(null);
  }
};

const getData = async <T = object>(key: string): Promise<T | null> => {
  try {
    const jsonObject = await AsyncStorage.getItem(key);
    return !jsonObject ? null : JSON.parse(jsonObject);
  } catch (e) {
    return Promise.reject(null);
  }
};

const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    return Promise.reject(null);
  }
};

const deviceStorage = {
  storeData,
  getData,
  removeData,
};
export default deviceStorage;
