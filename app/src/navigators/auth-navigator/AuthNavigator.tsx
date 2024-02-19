import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import LoginScreen from '../../screens/auth/login';
import ForgotPasswordScreen from '../../screens/auth/forgo-password';
import ResetPasswordScreen from '../../screens/auth/reset-password';
import VerifyOTP from '../../screens/auth/verify-otp';

const AuthNavigator = () => {
  const Stack = createNativeStackNavigator<TAuthNavigatorParams>();
  return (
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{headerShown: false, animation: 'slide_from_bottom'}}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="VerifyOTP" component={VerifyOTP} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
