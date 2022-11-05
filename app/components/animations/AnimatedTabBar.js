import React from 'react';
import {Animated, StyleSheet, View, Platform, Text} from 'react-native';

export const AnimatedTabBar = ({
  headerHeight,
  children,
  scrollY,
  ...otherProps
}) => {
  const tabViewOffset = Platform.OS === 'ios' ? -headerHeight : 0;

  const translateY = scrollY.interpolate({
    inputRange: [tabViewOffset, tabViewOffset + headerHeight],
    outputRange: [headerHeight, 0],
    extrapolate: 'clamp',
  });

  const opacity = scrollY.interpolate({
    inputRange: [
      tabViewOffset + headerHeight,
      tabViewOffset + headerHeight + 20,
    ],
    outputRange: [0, 1],
    extrapolateRight: 'clamp',
  });

  return (
    <Animated.View
      style={[styles.tabBar, {transform: [{translateY}]}]}
      {...otherProps}>
      {children}
      <Animated.View style={{opacity}}>
        <View style={styles.border} />
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    width: '100%',
    zIndex: 10,
  },
  border: {
    height: 0,
    // backgroundColor: "red",
  },
});
