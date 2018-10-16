import { AsyncStorage } from 'react-native';

export const setToken = async (token) => {
  const bearerToken = token ? `Bearer ${token}` : null;

  try {
    await AsyncStorage.setItem('jwt', token);
  } catch (e) {
    throw new Error('utils/auth/setToken', e);
  }
}

export const getToken = async () => {
  try {
    return await AsyncStorage.getItem('jwt');
  } catch (e) {
    throw new Error('utils/auth/getToken', e);
  }
}

export const rmToken = async () => {
  try {
    await AsyncStorage.removeItem('jwt');
  } catch (e) {
    throw new Error('utils/auth/rmToken', e);
  }
}