import React, { useRef, useEffect } from "react";
import { View, StyleSheet, Animated } from "react-native";

import { colors } from "../../config/theme";
import AppText from "../dataDisplays/AppText";
import Icon from "../svgIcons/Icon";

function ErrorAnimation({ text, isVisible, setIsVisible }) {
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      errorAnimation();
    }
    return () => {};
  }, [isVisible]);

  const errorAnimation = () => {
    fadeIn();
    setTimeout(() => {
      fadeOut();
      resetValues();
    }, 1500);
  };

  const fadeIn = () => {
    Animated.timing(fade, {
      toValue: 1,
      //duration: 500,
      useNativeDriver: true,
    }).start();
  };
  const fadeOut = () => {
    Animated.timing(fade, {
      toValue: 0,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  };

  const resetValues = () => {
    setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: fade, width: "100%" }}>
        <View style={styles.alertContainer}>
          <View style={styles.textContainer}>
            <Icon
              name="alert-circle"
              fille={colors.white}
              size={24}
              style={{ marginRight: 10 }}
            />
            <AppText style={styles.text}>
              {text
                ? text
                : " We were unable to process your request. Please, try again."}
            </AppText>
          </View>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  alertContainer: {
    backgroundColor: colors.red,
    height: 80,
    width: "100%",
    bottom: 0,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  text: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "500",
  },
});

export default ErrorAnimation;
