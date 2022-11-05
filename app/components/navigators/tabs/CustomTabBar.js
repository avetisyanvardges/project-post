import React, { useCallback, useMemo, useRef } from "react";
import {
  findNodeHandle,
  ScrollView,
  StyleSheet,
  View,
  Pressable,
  Dimensions,
  Animated,
  useWindowDimensions,
} from "react-native";

import { colors } from "../../../config/theme";

import Icon from "../../svgIcons/Icon";

export const CustomTabBar = ({ navigationState, setIndex }) => {
  const scrollRef = useRef < ScrollView > null;

  const { width } = useWindowDimensions();

  const tabs = useMemo(() => {
    return navigationState.routes.map((route, index) => {
      return (
        <TabBarButton
          key={index}
          index={index}
          onPress={setIndex}
          title={route.title}
          active={navigationState.index === index}
          scrollViewRef={scrollRef.current}
        />
      );
    });
  }, [navigationState.index, navigationState.routes, setIndex]);

  return <View style={styles.tabBar}>{tabs}</View>;
};

const TabBarButton = ({ active, index, onPress, title, scrollViewRef }) => {
  const xPosition = useRef(null);

  const handleRef = useCallback(
    (el) => {
      const scrollNode = findNodeHandle(scrollViewRef);
      if (el && scrollNode) {
        el.measureLayout(
          scrollNode,
          (offsetX) => {
            xPosition.current = offsetX;
          },
          () => {}
        );
      }
    },
    [scrollViewRef]
  );

  const wrappedOnPress = useCallback(() => {
    if (xPosition.current) {
      scrollViewRef?.scrollTo({
        x: index === 0 ? 0 : xPosition.current,
        y: 0,
        animated: true,
      });
    }
    return onPress(index);
  }, [index, onPress, scrollViewRef]);

  return (
    <Pressable onPress={wrappedOnPress}>
      <Animated.View
        ref={handleRef}
        style={[
          styles.tab,
          {
            borderBottomColor: active ? colors.blue : "transparent",
            borderBottomWidth: 2,
          },
        ]}
      >
        <Icon name={title} size={20} />
        {/* <Text>{title}</Text> */}
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 0,
  },
  contentContainer: {
    flexGrow: 1,
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 10,
  },
  tab: {
    alignItems: "center",
    paddingVertical: 4,
    width: Dimensions.get("window").width / 3,
    paddingBottom: 10,
  },
});
