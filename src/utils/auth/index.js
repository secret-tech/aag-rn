import { AsyncStorage } from 'react-native';
import jwtDecode from 'jwt-decode';

export const setToken = async (token) => {
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

export const getUserId = async () => {
  try {
    const jwt = await AsyncStorage.getItem('jwt');
    return jwtDecode(jwt).id;
  } catch (e) {
    throw new Error('utils/auth/getToken', e);
  }
}