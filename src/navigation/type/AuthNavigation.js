import React from 'react';
import {AuthNav} from '../navigationKey';
import {AuthRoute} from '../navigationRoute';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function AuthNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={AuthNav.LogIn}>
      <Stack.Screen name={AuthNav.LogIn} component={AuthRoute.LogIn} />
    </Stack.Navigator>
  );
}
