import React from "react";
import { StyleSheet } from "react-native";
import Stars from "react-native-stars";
import Icon from "../svgIcons/Icon";
import PropTypes from "prop-types";
import { colors } from "../../config/theme";

function PostRating({ postRating }) {
  return (
    <Stars
      default={postRating}
      disabled={true}
      count={5}
      half={true}
      starSize={100}
      fullStar={<Icon name="star" size={25} fill={styles.myStarStyle} />}
      emptyStar={<Icon name="star" size={25} fill={styles.myStarStyle} />}
      halfStar={<Icon name="star" size={25} fill={styles.myStarStyle} />}
    />
  );
}
const styles = StyleSheet.create({
  myStarStyle: {
    color: colors.blue,
  },
  myEmptyStarStyle: {
    color: "transparent",
  },
});

PostRating.propTypes = {
  postRating: PropTypes.number,
};

export default PostRating;
