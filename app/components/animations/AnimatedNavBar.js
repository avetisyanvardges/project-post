import React, { useEffect, useRef, useState } from "react";
import { Animated, Platform } from "react-native";

export const AnimatedNavBar = ({ headerHeight, children, scrollY }) => {
  const [showTitle, setShowTitle] = useState(false);
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: showTitle ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [opacity, showTitle]);

  const tabViewOffset = Platform.OS === "ios" ? -headerHeight : 0;

  useEffect(() => {
    const listener = scrollY?.addListener(({ value }) => {
      setShowTitle(value > tabViewOffset + headerHeight * 0.6);
    });

    return () => {
      scrollY?.removeListener(listener);
    };
  });

  return <Animated.View style={{ opacity }}>{children}</Animated.View>;
};
