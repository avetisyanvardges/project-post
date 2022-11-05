import React, {useCallback, useContext, useMemo, useRef, useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {AuthContext} from '../config/context';

import Icon from '../components/svgIcons/Icon';

import FeedScreen from '../screens/FeedScreen';
import ProfileScreen from '../screens/ProfileScreen';
import DashboardScreen from '../screens/DashboardScreen';
import SearchScreen from '../screens/SearchScreen';

import CreatePostNavigator from './createPostNavigation/CreatePostNavigator';

import {NAV_CONSTANTS} from '../config/constants';
import {NAVIGATION_PARAM} from '../config/routes';
import {colors} from '../config/theme';
import BottomSheet from '@gorhom/bottom-sheet';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const insets = useSafeAreaInsets();
  const bottomNavHeight = NAV_CONSTANTS.bottomNavBarHeight + 34;
  const auth = useContext(AuthContext);
  const [createPostSheet, setCreatePostSheet] = useState(false);
  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '25%'], []);

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: colors.blue,
          tabBarInactiveTintColor: colors.white,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: colors.charcoal,
            height: bottomNavHeight,
            borderWidth: 0,
            borderTopColor: 'transparent',
          },
          headerShown: false,
        }}>
        <Tab.Screen
          name={NAVIGATION_PARAM.appNavigator.feed}
          component={FeedScreen}
          options={{
            tabBarIcon: ({color}) => (
              <Icon name="loop" fill={color} size={35} />
            ),
          }}
        />
        <Tab.Screen
          name={NAVIGATION_PARAM.appNavigator.search}
          component={SearchScreen}
          options={{
            tabBarIcon: ({color}) => (
              <Icon name="search" fill={color} size={25} />
            ),
          }}
        />
        <Tab.Screen
          name={NAVIGATION_PARAM.appNavigator.create}
          component={CreatePostNavigator}
          options={() => ({
            tabBarIcon: ({color}) => (
              <Icon name="plus" fill={color} size={25} />
            ),
            tabBarButton: ({color}) => (
              <TouchableOpacity
                onPress={() => setCreatePostSheet(true)}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Icon name="plus" fill={color} size={25} />
              </TouchableOpacity>
            ),
          })}
        />
        <Tab.Screen
          name={NAVIGATION_PARAM.appNavigator.dashboard}
          component={DashboardScreen}
          options={{
            tabBarIcon: ({color}) => (
              <Icon name="sphere" size={25} fill={color} />
            ),
          }}
        />
        <Tab.Screen
          name={NAVIGATION_PARAM.appNavigator.profile}
          options={{
            tabBarIcon: ({color}) => (
              <Icon name="user" size={25} fill={color} />
            ),
          }}>
          {props => <ProfileScreen {...props} />}
        </Tab.Screen>
      </Tab.Navigator>
      {createPostSheet && (
        <BottomSheet
          ref={bottomSheetRef}
          index={1}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          handleStyle={{
            backgroundColor: colors.darkCharcoal,
          }}
          onClose={() => setCreatePostSheet(!createPostSheet)}>
          <TouchableOpacity
            onPress={() => setCreatePostSheet(false)}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: colors.darkCharcoal,
            }}>
            <Text style={{color: colors.white}}>Record video</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setCreatePostSheet(false)}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: colors.darkCharcoal,
            }}>
            <Text style={{color: colors.white}}>Upload</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setCreatePostSheet(false)}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: colors.darkCharcoal,
            }}>
            <Text style={{color: colors.white}}>CLOSE</Text>
          </TouchableOpacity>
        </BottomSheet>
      )}
    </>
  );
};

export default AppNavigator;
