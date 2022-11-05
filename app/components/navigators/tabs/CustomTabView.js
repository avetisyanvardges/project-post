import React from "react";
import { StyleSheet } from "react-native";

import { TabView } from "react-native-tab-view";

import { colors } from "../../../config/theme";

export const CustomTabView = ({
  routes,
  width,
  renderTabBar,
  index,
  setIndex,
  renderScene,
}) => {
  return (
    <TabView
      lazy
      style={{ zIndex: 2 }}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={(p) =>
        renderTabBar({
          ...p,
          setIndex,
        })
      }
      onIndexChange={setIndex}
      initialLayout={{ width }}
      swipeEnabled={true}
    />
  );
};

const styles = StyleSheet.create({
  indicator: {
    backgroundColor: colors.blue,
  },
  container: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: colors.charcoal,
    elevation: 0,
  },
});
