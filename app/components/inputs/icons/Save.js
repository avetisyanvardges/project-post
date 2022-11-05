import React from "react";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import PropTypes from "prop-types";

import Icon from "../../svgIcons/Icon";
import { colors, icon } from "../../../config/theme";

import Numbers from "../../dataDisplays/dataMasks/Numbers";
import AppText from "../../dataDisplays/AppText";

const Save = ({
  color,
  handleSave,
  isSaved,
  isTranslucent,
  numberOfSaves,
  sSize,
  tSize,
  textShadow,
}) => {
  const saveColor = isSaved === true ? colors.lightBlue : colors.white;

  const saveSize = sSize;

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
    <TouchableWithoutFeedback onPress={handleSave}>
      <View style={[styles.saves, iconOpacity]}>
        <Icon name="bookmark" size={saveSize} fill={saveColor} />
        <AppText style={text}>
          <Numbers number={numberOfSaves} />
        </AppText>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  saves: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },
});

Save.defaultProps = {
  opacity: false,
  hSize: 35,
  tSize: "md",
  color: colors.white,
};

Save.propTypes = {
  handleSave: PropTypes.func.isRequired,
  isSaved: PropTypes.bool.isRequired,
  postSaveNumber: PropTypes.number,
  opacity: PropTypes.bool,
  color: PropTypes.string,
  sSize: PropTypes.number,
  tSize: PropTypes.string,
  textShadow: PropTypes.bool,
};

export default Save;
