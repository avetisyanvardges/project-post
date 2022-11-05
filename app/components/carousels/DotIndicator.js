import React from "react";
import { Animated, View, Dimensions, StyleSheet } from "react-native";

import { colors } from "../../config/theme";

import PropTypes from "prop-types";

const DotIndicator = ({ scrollX, data, itemWidth, color }) => {
  let { width } = Dimensions.get("window");

  let scrollWidth = itemWidth ? itemWidth : width;
  let activeDotColor = color ? color : colors.blue;

  return (
    <View style={styles.container}>
      {data.map((_, i) => {
        let inputRange = [
          (i - 1) * scrollWidth,
          i * scrollWidth,
          (i + 1) * scrollWidth,
        ];

        const dotColor = scrollX.interpolate({
          inputRange,
          outputRange: [colors.white, activeDotColor, colors.white],
        });

        return (
          <Animated.View
            key={`dot-${i}`}
            style={{
              height: 7,
              width: 7,
              borderRadius: 3.5,
              backgroundColor: dotColor,
              margin: 5,
            }}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    bottom: 0,
    flexDirection: "row",
    justifyContent: "center",
  },
});

DotIndicator.propTypes = {
  scrollX: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  itemWidth: PropTypes.number,
  color: PropTypes.string,
};

export default DotIndicator;
