import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
} from "react";
import {
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  Pressable,
  Animated,
} from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import {
  useSharedValue,
  withTiming,
  withSpring,
} from "react-native-reanimated";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import UserProfileBottomSheet from "../components/sheets/UserProfileAdminMenu";
import BottomSheet from "./BottomSheet";

import PropTypes from "prop-types";

const { height, width } = Dimensions.get("window");
const MAX_TRANSLATEY = -height + 50;

const BottomSheetProvider = React.forwardRef(
  ({ children, scroll, ...props }, ref) => {
    const insets = useSafeAreaInsets();
    const translateY = useSharedValue(0);
    const context = useSharedValue({ y: 0 });
    const active = useSharedValue(false);

    const AnimatedTouchable = Animated.createAnimatedComponent(Pressable);

    const scrollTo = useCallback((destination) => {
      "worklet";
      if (destination === 0) {
        active.value = false;
      } else {
        active.value = true;
      }

      translateY.value = withSpring(destination, { damping: 50 });
    }, []);

    const isActive = useCallback(() => {
      return active.value;
    });

    useImperativeHandle(ref, () => ({ scrollTo, isActive }), [
      scrollTo,
      isActive,
    ]);

    const gesture = Gesture.Pan()
      .onStart(() => {
        context.value = { y: translateY.value };
      })
      .onUpdate((event) => {
        // translateY.value = event.translationY + context.value.y;

        translateY.value = event.translationY + context.value.y;

        translateY.value = Math.max(translateY.value, -height + insets.top);
      })
      .onEnd(() => {
        if (translateY.value > -height / 2.5) {
          translateY.value = withSpring(0, { damping: 50 });
          active.value = false;
        } else if (
          (translateY.value < -height / 2.5) &
          (translateY.value > -height / 1.5)
        ) {
          translateY.value = withSpring(-height / 1.8, { damping: 50 });
        } else if (translateY.value < -height / 1.5) {
          translateY.value = withSpring(-height + insets.top, { damping: 50 });
        }
      });

    const overlay = useMemo(() => {
      if (active.value === true) {
        return <Animated.View style={styles.overlay} />;
      } else {
        null;
      }
      console.log(active.value);
    }, [active]);

    return (
      <>
        {children}

        <GestureDetector gesture={gesture}>
          <BottomSheet {...props} translateY={translateY} />
        </GestureDetector>
      </>
    );
  }
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    position: "absolute",
    left: 0,
    top: 0,
    opacity: 0.5,
    backgroundColor: "black",
    width: width,
    height: height,
    zIndex: 2,
  },
});

BottomSheetProvider.defaultProps = {
  sheetHeight: height / 1.8,
  closeThreshold: height / 2,
  expandThresholdHeight: height / 1.7,
};

export default BottomSheetProvider;
