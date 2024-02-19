import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import Config from 'react-native-config';
import {logout} from '../app/reducers/login/login-reducer';
import {store} from '../app/store';

const client = axios.create({baseURL: `${Config.REACT_APP_BASE_URL}`});
console.log(Config.REACT_APP_BASE_URL);

export const request = async (options: AxiosRequestConfig<any>) => {
  const token = await AsyncStorage.getItem(`${Config.REACT_APP_SECRET_KEY}`);
  client.defaults.headers.common.authorization = `Bearer ${token}`;

  const onSuccess = (response: AxiosResponse) => response.data;
  const onError = (error: any) => {
    if (error.message === 'Request failed with status code 401') {
      store.dispatch(logout());
    }

    return error.response;
  };

  try {
    const response = await client(options);

    return onSuccess(response);
  } catch (error) {
    return onError(error);
  }
};
