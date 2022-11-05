import React, { useRef, useEffect } from "react";
import { View, StyleSheet, Animated } from "react-native";

import { colors } from "../../config/theme";
import AppText from "../dataDisplays/AppText";

function SuccessAnimation({ text, isVisible, setIsVisible }) {
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      successAnimation();
    }
    return () => {};
  }, [isVisible]);

  const successAnimation = () => {
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
            <AppText style={styles.text}>
              {text ? text : "Your submission has been processed successfully."}
            </AppText>
          </View>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    position: "absolute",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  alertContainer: {
    backgroundColor: colors.darkCharcoal,
    height: 80,
    width: "100%",
    bottom: 0,
    borderRadius: 8,
  },
  textContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    paddingVertical: 20,
    textAlign: "center",
    color: colors.white,
    fontSize: 16,
    fontWeight: "500",
  },
});

export default SuccessAnimation;
