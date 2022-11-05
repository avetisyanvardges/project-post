import React from "react";
import { View, Text, StyleSheet } from "react-native";

import PropTypes from "prop-types";
import { colors } from "../../config/theme";
import AppText from "./AppText";
import Icon from "../svgIcons/Icon";

const Chip = ({ children, size, fill, borderColor, color, margin, icon }) => {
  const chipMargin = margin;

  const textColor = color;

  const border =
    fill === "transparent"
      ? {
          borderColor: borderColor ? borderColor : colors.blue,
          borderWidth: 1,
        }
      : null;

  const chipSize =
    size === "lg" ? 33 : size === "sm" ? 24 : size === "md" ? 28 : 28;
  const padding =
    size === "lg" ? 21.6 : size === "sm" ? 15 : size === "md" ? 20 : 20;
  const fontSize =
    size === "lg" ? 16 : size === "sm" ? 12 : size === "md" ? 13 : 13;

  const chip = {
    height: chipSize,
    borderRadius: chipSize / 2,
    backgroundColor: fill,
    justifyContent: "center",
    margin: chipMargin,
  };

  const text = {
    fontSize: fontSize,
    fontWeight: "500",
    flexWrap: "nowrap",
    color: textColor,
    paddingHorizontal: 10,
  };

  return (
    <View style={styles.tagContainer}>
      <View style={[chip, border]}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: padding - 10,
            // backgroundColor: "red",
          }}
        >
          <Text style={text}>{children}</Text>
          {icon && icon}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tagContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
  },
});

Chip.defaultProps = {
  size: "md",
  margin: 2,
  fill: colors.blue,
  color: colors.white,
};

Chip.propTypes = {
  icon: PropTypes.node,
  size: PropTypes.string,
  fill: PropTypes.string,
  color: PropTypes.string,
};

export default Chip;
