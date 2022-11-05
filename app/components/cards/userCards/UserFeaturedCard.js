import React from "react";
import {
  View,
  Dimensions,
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import Avatar from "../../dataDisplays/Avatar";
import Chip from "../../dataDisplays/Chip";

import { colors, theme } from "../../../config/theme";
import PropTypes from "prop-types";

const avatarOffset = theme.avatar.md / 2;

export const UserFeaturedCard = ({
  image,
  avatar,
  username,
  level,
  tags,
  onPress,
}) => {
  let { width } = Dimensions.get("window");
  let imageHeight = width / 3;

  const mapTags = (tag) => {
    return (
      <Chip fill="transparent" margin={1.5} key={tag.id} size={"md"}>
        {tag.tag}
      </Chip>
    );
  };

  return (
    <View>
      <TouchableWithoutFeedback
        // onPress={onPress}
        onLongPress={null}
        onPressOut={null}
      >
        <View style={[{ width: width }, styles.container]}>
          <Image
            source={image}
            style={[styles.backgroundImage, { height: imageHeight }]}
          />
          <View style={[styles.titleContainer]}>
            <Text style={styles.title}>@{username}</Text>
            <Text style={styles.level}>Level: {level}</Text>
          </View>

          <View
            style={{
              position: "absolute",
              alignItems: "center",
              justifyContent: "center",
              top: -(imageHeight / 2 - avatarOffset),
              height: imageHeight,
              left: 0,
              right: 0,
            }}
          >
            <Avatar size="md" image={avatar} />
          </View>
        </View>
      </TouchableWithoutFeedback>
      <View style={[styles.tagContainer, { width: width }]}>
        {tags.map(mapTags)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    paddingTop: avatarOffset,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    borderRadius: 5,
    overflow: "hidden",
  },
  titleContainer: {
    position: "absolute",
    top: avatarOffset / 2 + 10,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: colors.white,
    fontWeight: "600",
    textShadowColor: "rgba(0, 0, 0, .7)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
    fontSize: 24,
  },
  level: {
    color: colors.white,
    fontWeight: "600",
    textShadowColor: "rgba(0, 0, 0, .6)",
    textShadowOffset: { width: 1.5, height: 1.5 },
    textShadowRadius: 2,
    fontSize: 16,
  },
  tagContainer: {
    flexDirection: "row",
    justifyContent: "center",

    flexWrap: "wrap",
    paddingHorizontal: 5,
  },
});

UserFeaturedCard.propTypes = {
  username: PropTypes.string.isRequired,
  image: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  avatar: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  onPress: PropTypes.func,
  tags: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.number, tag: PropTypes.string })
  ),
  onPress: PropTypes.func,
};
