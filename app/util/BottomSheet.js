import React, {
  useContext,
  useRef,
  useCallback,
  useEffect,
  useImperativeHandle,
} from "react";
import { View, Text, StyleSheet, Dimensions, Pressable } from "react-native";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

import { colors, theme } from "../config/theme";

const { height } = Dimensions.get("window");
const MAX_TRANSLATEY = -height + 50;

const BottomSheet = ({ sheet, translateY }) => {
  const reanimatedBottomSheetStyle = useAnimatedStyle(() => {
    return { transform: [{ translateY: translateY.value }] };
  });

  return (
    <Animated.View style={[styles.sheetContainer, reanimatedBottomSheetStyle]}>
      <View style={styles.line} />
      <View style={{ flex: 1 }}>
        <View style={styles.itemContainer}>
          <Pressable
            //   onPress={handleShare}
            style={styles.menuItem}
          >
            <Text style={styles.itemText}>Manage Account</Text>
          </Pressable>
        </View>
        <View style={styles.separator} />
        <View style={styles.itemContainer}>
          <Pressable
            //   onPress={handleReport}
            style={styles.menuItem}
          >
            <Text style={styles.itemText}>Privacy</Text>
          </Pressable>
        </View>
        <View style={styles.separator} />
        <View style={styles.itemContainer}>
          <Pressable
            //   onPress={handleBlock}
            style={styles.menuItem}
          >
            <Text style={styles.itemText}>Saved Posts</Text>
          </Pressable>
        </View>
        <View style={styles.separator} />
        <View style={styles.itemContainer}>
          <Pressable
            //   onPress={handleBlock}
            style={styles.menuItem}
          >
            <Text style={styles.itemText}>Support</Text>
          </Pressable>
        </View>
        <View style={styles.separator} />
        <View style={styles.itemContainer}>
          <Pressable
            //   onPress={handleBlock}
            style={styles.menuItem}
          >
            <Text style={styles.itemText}>Log Out</Text>
          </Pressable>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "transparent",
  },
  sheetContainer: {
    height: height,
    zIndex: 15,
    top: height,
    width: "100%",
    backgroundColor: colors.charcoal,
    position: "absolute",
    borderRadius: 25,
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: "#ffffff50",
    alignSelf: "center",
    marginVertical: 10,
  },
  separator: {
    height: 1,
    backgroundColor: theme.modal.separatorColor,
    opacity: 0.2,
    marginHorizontal: 5,
  },
  menuItem: {
    // flex: 1,
    height: 60,
    justifyContent: "center",
    // backgroundColor: "red",
  },
  itemText: {
    color: colors.white,
    fontSize: 16,
    marginHorizontal: 25,
    // textAlign: "center",
  },
  itemContainer: {
    // flex: 1,
  },
});

export default BottomSheet;
