import React from "react";
import { TouchableWithoutFeedback, View } from "react-native";

import { icon } from "../../../config/theme";

import PropTypes from "prop-types";
import Icon from "../../svgIcons/Icon";

const SaveOutlined = ({ toggleSave, isSaved, isTranslucent, ...props }) => {
  const iconOpacity =
    isTranslucent === true
      ? { opacity: icon.opacity.heavy }
      : {
          opacity: 1,
        };

  return (
    <TouchableWithoutFeedback onPress={toggleSave}>
      <View>
        {isSaved ? (
          <Icon name="bookmark" {...props} style={iconOpacity} />
        ) : (
          <Icon name="bookmark-outline" {...props} style={iconOpacity} />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

SaveOutlined.propTypes = {
  toggleSave: PropTypes.func.isRequired,
  isSaved: PropTypes.bool.isRequired,
};

export default SaveOutlined;
