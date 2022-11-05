import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {NAVIGATION_PARAM} from '../config/routes';

import AppNavigator from './AppNavigator';

import {verticalAnimation} from '../components/animations/navigationAnimations/verticalAnimation';

const Stack = createStackNavigator();

function RootStack() {
  const insets = useSafeAreaInsets();

  return (
    //Inject Screens that do not show bottom navbar
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={NAVIGATION_PARAM.rootStack.app}
        component={AppNavigator}
      />
    </Stack.Navigator>
  );
}

export default RootStack;
