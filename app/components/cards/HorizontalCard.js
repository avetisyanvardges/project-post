import React from "react";

import {
  TouchableWithoutFeedback,
  View,
  Text,
  Dimensions,
  StyleSheet,
  ImageBackground,
} from "react-native";

import { colors } from "../../config/theme";

import PropTypes from "prop-types";

let { width } = Dimensions.get("window");

export const HorizontalCard = ({ name, image, onPress, placeholder }) => {
  // const isImageLink = image.includes("https");
  // console.log(isImageLink);

  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      onLongPress={null}
      onPressOut={null}
    >
      <View style={[{ width: width }, { height: width / 3 }, styles.container]}>
        {/* <ImageBackground source={image} style={styles.backgroundImage}> */}
        {image ? (
          <ImageBackground
            source={{ uri: image }}
            style={styles.backgroundImage}
          >
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{name}</Text>
            </View>
          </ImageBackground>
        ) : (
          <View style={styles.addImage}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{placeholder}</Text>
            </View>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    paddingBottom: 4,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    borderRadius: 5,
    overflow: "hidden",
  },
  addImage: {
    flex: 1,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: colors.grey,
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  titleContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: colors.white,
    fontWeight: "600",
    textShadowColor: "rgba(0, 0, 0, .6)",
    textShadowOffset: { width: 1.5, height: 1.5 },
    textShadowRadius: 2,
    fontSize: 24,
  },
});

HorizontalCard.propTypes = {
  name: PropTypes.string,
  image: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  onPress: PropTypes.func,
};
