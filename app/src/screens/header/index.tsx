import React from 'react';
import {Header} from '@rneui/base';
import {useAppDispatch} from '../../app/hooks';
import {logout} from '../../app/reducers/login/login-reducer';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const HeaderBar = () => {
  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<TAppNavigatorParams>>();
  return (
    <Header
      backgroundColor="#F00F89"
      leftComponent={{
        icon: 'qr-code-scanner',
        color: '#fff',
        style: {marginLeft: 15},
        onPress: () => navigation.navigate('Scan'),
      }}
      rightComponent={{
        icon: 'logout',
        color: '#fff',
        style: {marginRight: 15},
        onPress: () => dispatch(logout()),
      }}
    />
  );
};

export default HeaderBar;
