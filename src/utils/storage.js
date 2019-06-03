import { AsyncStorage } from 'react-native';

export const clear = () => AsyncStorage.clear();

export const deleteFromStorage = (fieldName) => AsyncStorage.removeItem(fieldName);

export async function getFromStorage(fieldName) {
  try {
    const value = await AsyncStorage.getItem(fieldName);
    // console.log('TOKEN', value !== null ? value : null);
    return value !== null ? value : null;
  } catch (error) {
    throw new Error('Error retrieving data');
  }
}

export const saveToStorage = async (fieldName, data) =>
  // console.log('TOKENS', data);
  AsyncStorage.setItem(fieldName, JSON.stringify(data));
export const updateTokens = async (accessToken, refreshToken) => {
  try {
    return Promise.all([saveToStorage('access_token', accessToken), saveToStorage('refresh_token', refreshToken)]);
  } catch (error) {
    throw error;
  }
};

export const detectInitialLang = async () => {
  try {
    const current = await AsyncStorage.getItem('lang');
    return (current && JSON.parse(current)) || 'en';
  } catch (error) {
    throw error;
  }
};
