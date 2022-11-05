import React from "react";
import { StyleSheet, View, Text, TouchableWithoutFeedback } from "react-native";
import PropTypes from "prop-types";

import Icon from "../../svgIcons/Icon";
import { colors, icon } from "../../../config/theme";

import Numbers from "../../dataDisplays/dataMasks/Numbers";
import AppText from "../../dataDisplays/AppText";

function Comment({
  color,
  tSize,
  sSize,
  isTranslucent,
  onCommentPress,
  numberOfComments,
}) {
  const commentSize = sSize;

  const textSize =
    tSize === "sm" ? 10 : tSize === "lg" ? 16 : tSize === "md" ? 13 : 13;

  const text = {
    color: color,
    fontSize: textSize,
  };

  //const hasShadow = textShadow === true ? shadow : null;

  const iconOpacity =
    isTranslucent === true
      ? {
          opacity: icon.opacity.medium,
        }
      : {
          opacity: 1,
        };
  return (
    <TouchableWithoutFeedback onPress={onCommentPress}>
      <View style={[styles.shares, iconOpacity]}>
        <Icon name="comment" size={commentSize} fill={colors.white} />
        <AppText style={text}>
          <Numbers number={numberOfComments} />
        </AppText>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  shares: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },
});

Comment.propTypes = {
  onCommentPress: PropTypes.func.isRequired,
  numberOfComments: PropTypes.number,
  color: PropTypes.string,
  sSize: PropTypes.number,
  tSize: PropTypes.string,
};

Comment.defaultProps = {
  color: colors.white,
  sSize: 35,
  tSize: "md",
};

export default Comment;
