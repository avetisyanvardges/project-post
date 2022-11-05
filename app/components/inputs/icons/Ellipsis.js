import React from "react";
import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";

import Icon from "../../svgIcons/Icon";
import { colors, icon } from "../../../config/theme";

function Ellipsis({ eSize, isTranslucent }) {
  const size = eSize;

  const iconOpacity =
    isTranslucent === true
      ? {
          opacity: icon.opacity.medium,
        }
      : {
          opacity: 1,
        };

  return (
    <View style={[styles.ellipsis, iconOpacity]}>
      <Icon name="ellipsis" size={size} fill={colors.white} />
    </View>
  );
}

const styles = StyleSheet.create({
  ellipsis: {
    alignItems: "center",
    flex: 1,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    backgroundColor: colors.red,
  },
});

Ellipsis.propTypes = {
  eSize: PropTypes.number,
};

Ellipsis.defaultProps = {
  eSize: 35,
};

export default Ellipsis;
