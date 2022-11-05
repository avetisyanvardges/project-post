import React from "react";
import { Animated, StyleSheet, Platform } from "react-native";

import { colors } from "../../config/theme";

export const AnimatedHeader = ({
  scrollY,
  children,
  headerHeight,
  ...otherProps
}) => {
  const tabViewOffset = Platform.OS === "ios" ? -headerHeight : 0;

  const translateY = scrollY.interpolate({
    inputRange: [tabViewOffset, tabViewOffset + headerHeight],
    outputRange: [0, -headerHeight],
    extrapolateLeft: "clamp",
  });

  let viewHeight = {
    height: headerHeight,
  };

  return (
    <Animated.View
      // onScroll={handleScroll}
      style={[viewHeight, styles.header, { transform: [{ translateY }] }]}
      {...otherProps}
    >
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
    top: 0,
    backgroundColor: colors.darkCharcoal,
    width: "100%",
    position: "absolute",
    zIndex: 10,
    // justifyContent: "center",
  },
});
