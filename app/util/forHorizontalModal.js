import React from "react";
import { StyleSheet, SafeAreaView, Animated, Dimensions } from "react-native";

const { multiply } = Animated;

export const forHorizontalModal = ({ current, next, inverted, layouts }) => {
  let { width } = Dimensions.get("window");

  const translateFocused = multiply(
    current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [width, 0],
      extrapolate: "clamp",
    }),
    inverted
  );

  return {
    cardStyle: {
      transform: [
        // Translation for the animation of the current card
        { translateX: translateFocused },
        // Translation for the animation of the card in back
        { translateX: 0 },
      ],
    },

    shadowStyle: { shadowOpacity },
  };
};
