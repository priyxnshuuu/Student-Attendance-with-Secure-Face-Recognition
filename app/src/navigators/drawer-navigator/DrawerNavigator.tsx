import React from 'react';
import HomeScreen from '../../screens/home';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {SuccessScreen} from '../../screens/success';
import ScanScreen from '../../screens/scan';
const DrawerNavigation = () => {
  const Stack = createNativeStackNavigator<TAppNavigatorParams>();
  return (
    <Stack.Navigator initialRouteName={'Home'}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Scan"
        component={ScanScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Success"
        component={SuccessScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default DrawerNavigation;
