import React, {useEffect} from 'react';
import {useAppSelector} from '../../app/hooks';
import {checkUserAuthenticate} from '../../services/auth.service';
import AuthNavigator from '../auth-navigator/AuthNavigator';
import {useCheckAuthenticated} from '../../hooks/auth/query/useCheckAuthenticated';
import SplashScreen from '../../screens/auth/splash-screen';
import DrawerNavigation from '../drawer-navigator/DrawerNavigator';

const AppNavigator = () => {
  const loginState = useAppSelector(state => state.login.status);

  switch (loginState) {
    case 'loggedIn':
      return <DrawerNavigation />;
    case 'logout':
      return <AuthNavigator />;
    default:
      return <AuthNavigator />;
  }
};

export default AppNavigator;
