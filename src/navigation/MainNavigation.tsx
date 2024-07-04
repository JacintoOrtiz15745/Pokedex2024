import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Details, Home } from '../screens';

const Stack = createNativeStackNavigator();

export const MainNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{ header: () => null, animation: 'slide_from_right' }}>
      <Stack.Screen name="Home" component={Home}></Stack.Screen>
      <Stack.Screen name="Details" component={Details}></Stack.Screen>
    </Stack.Navigator>
  );
};
