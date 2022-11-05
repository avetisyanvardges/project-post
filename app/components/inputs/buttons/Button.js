import React from "react";
import { Text, TouchableOpacity } from "react-native";
import AppText from "../../dataDisplays/AppText";

import PropTypes from "prop-types";

const Button = ({
  children,
  feedback,
  onPress,
  type,
  color,
  padding,
  borderColor,
  style,
}) => {
  // const Btn = feedback === true ? TouchableOpacity : TouchableWithoutFeedback

  const btnBgColor =
    type === "filled" ? (color ? color : "#ffffff") : "transparent";
  const btnTextColor =
    type === "filled" ? "#343434" : color ? color : "#ffffff";
  //   const btnBorderRadius = bordered ? 30 : 5;

  const border =
    type === "transparent"
      ? {
          borderColor: "transparent",
          borderWidth: 1,
        }
      : type === "filled"
      ? {
          borderColor: color,
          borderWidth: 1,
        }
      : {
          borderColor: borderColor ? borderColor : "#ffffff50",
          borderWidth: 1,
        };

  const buttonContainer = {
    paddingVertical: padding ? padding : 12,
    paddingHorizontal: padding ? padding : 12,
    backgroundColor: btnBgColor,
    borderRadius: 3,
    // borderRadius: btnBorderRadius,
  };

  const buttonText = {
    color: btnTextColor,
    fontWeight: "700",
    textAlign: "center",
    alignSelf: "center",
  };

  return (
    <React.Fragment>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={1}
        style={[buttonContainer, border]}
      >
        <AppText style={[buttonText, style]}>{children}</AppText>
      </TouchableOpacity>
    </React.Fragment>
  );
};

Button.proptypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]).isRequired,
  onPress: PropTypes.func,
  type: PropTypes.string,
  color: PropTypes.string,
  padding: PropTypes.number,
  borderColor: PropTypes.string,
};

export default Button;
