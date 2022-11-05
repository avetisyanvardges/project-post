import React from "react";
import { StyleSheet, View, Text, TouchableWithoutFeedback } from "react-native";
import PropTypes from "prop-types";

import Icon from "../../svgIcons/Icon";
import { colors, icon } from "../../../config/theme";

import Numbers from "../../dataDisplays/dataMasks/Numbers";
import AppText from "../../dataDisplays/AppText";

const Like = ({
  color,
  handleLike,
  isLiked,
  isTranslucent,
  numberOfLikes,
  hSize,
  tSize,
  textShadow,
}) => {
  const likeColor = isLiked === true ? colors.red : colors.white;

  const likeSize = hSize;

  const textSize =
    tSize === "sm" ? 10 : tSize === "lg" ? 16 : tSize === "md" ? 13 : 13;

  const text = {
    color: color,
    fontSize: textSize,
  };

  //const hasShadow = textShadow === true ? shadow : null;

  const iconOpacity =
    isTranslucent === true
      ? { opacity: icon.opacity.medium }
      : {
          opacity: 1,
        };

  return (
    <TouchableWithoutFeedback onPress={handleLike}>
      <View style={[styles.likes, iconOpacity]}>
        <Icon name="heart" size={likeSize} fill={likeColor} />
        <AppText style={text}>
          <Numbers number={numberOfLikes} />
        </AppText>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  likes: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },
});

Like.defaultProps = {
  opacity: false,
  hSize: 35,
  tSize: "md",
  color: colors.white,
};

Like.propTypes = {
  handleLike: PropTypes.func.isRequired,
  isLiked: PropTypes.bool.isRequired,
  postLikeNumber: PropTypes.number,
  opacity: PropTypes.bool,
  color: PropTypes.string,
  sSize: PropTypes.number,
  tSize: PropTypes.string,
  textShadow: PropTypes.bool,
};

export default Like;
