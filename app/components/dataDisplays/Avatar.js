import React, { useState } from "react";
import { Image } from "react-native";

import { theme } from "../../config/theme";
import PropTypes from "prop-types";

const Avatar = ({ image, internal, size, style, mh, mv, onPress }) => {
  const [valid, setValid] = useState(true);

  const avatarSize =
    size === "xs"
      ? theme.avatar.xs
      : size === "sm"
      ? theme.avatar.sm
      : size === "lg"
      ? theme.avatar.lg
      : size === "md"
      ? theme.avatar.md
      : theme.avatar.md;

  const placeholder = internal
    ? internal
    : require("../../assets/avatar-stock-ph.jpg");

  let marginHorizontal = mh !== undefined ? mh : 8;
  let marginVertical = mv !== undefined ? mv : 5;

  const avatarContainer = {
    width: avatarSize,
    height: avatarSize,
    borderRadius: avatarSize / 2,
    resizeMode: "cover",
    marginHorizontal: marginHorizontal,
    marginVertical: marginVertical,
  };

  return (
    <Image
      onError={() => setValid(false)}
      style={[avatarContainer, style]}
      // source={valid ? image : placeholder}
      source={
        valid
          ? image !== "" && image !== null && image !== undefined
            ? { uri: image }
            : placeholder
          : placeholder
      }
      defaultSource={placeholder}
    />
  );
};

Avatar.propTypes = {
  //image: PropTypes.string,
  size: PropTypes.string,
  mh: PropTypes.number,
  mv: PropTypes.number,
};

export default Avatar;
