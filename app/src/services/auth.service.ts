import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';
import {login, logout} from '../app/reducers/login/login-reducer';
import {updateProfileData} from '../app/reducers/user/user-reducer';
import {store} from '../app/store';

export const checkUserAuthenticate = async (data: any) => {
  if (data.status === 400 || data.status === 401) {
    store.dispatch(logout());
  } else if (data.status === 'success') {
    const token = await AsyncStorage.getItem(`${Config.REACT_APP_SECRET_KEY}`);
    if (token === null) {
      store.dispatch(logout());
    } else {
      store.dispatch(updateProfileData(data.data));
      store.dispatch(login(token));
    }
  } else if (data.status === 'error') {
    store.dispatch(logout());
    customAlert.show({
      title: data.title,
      message: data.message,
    });
  }
};
