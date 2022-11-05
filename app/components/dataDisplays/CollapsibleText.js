import React, { useState } from "react";
import { Text, View, Animated } from "react-native";

import { colors } from "../../config/theme";

const CollapsibleText = ({
  children,
  numOfLines,
  fontSize,
  fontWeight,
  color,
  margin,
  align,
}) => {
  const [lengthOfContent, setLengthOfContent] = useState(undefined);
  const [numberOfLines, setNumberOfLines] = useState(undefined);

  const [expandedHeight, setExpandedHeight] = useState(undefined);
  const [collapsedHeight, setCollapsedHeight] = useState(undefined);

  const [isTextShown, setIsTextShown] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);

  const appearAnim = React.useRef(new Animated.Value(0)).current;

  const linkStyle = {
    color,
    fontWeight,
    fontSize,
    textAlign: align,
    marginVertical: margin,
  };

  const textExpand = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(appearAnim, {
      toValue: expanded,
      duration: 1000,
    }).start();
  };

  const textCollapse = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(appearAnim, {
      toValue: 1,
      duration: 1000,
    }).start();
  };

  const toggleTextShown = () => {
    if (lengthOfContent > numberOfLines) {
      setIsTextShown(true);
      setNumberOfLines(lengthOfContent);
    } else {
      setIsTextShown(false);
      setNumberOfLines(numOfLines);
    }
  };

  const updateLengthOfContent = (length) => {
    setLengthOfContent(length);
  };

  const onLayout = (e) => {
    let layoutHeight = e.nativeEvent.layout.height;

    if (numberOfLines === numOfLines) {
      setCollapsedHeight(layoutHeight);
    } else {
      setExpandedHeight(layoutHeight);
    }
  };

  // console.log(collapsedHeight, "-- COLLAPSED HEIGHT");
  // console.log(expandedHeight, "-- EXPANDED HEIGHT");

  const onTextLayout = (e) => {
    if (lengthOfContent === undefined) {
      updateLengthOfContent(e.nativeEvent.lines.length);

      if (e.nativeEvent.lines.length > numOfLines) {
        setShowReadMore(true);
        setNumberOfLines(numOfLines);
      } else {
        setShowReadMore(false);
      }
    }
  };

  // SDFASDF;

  return (
    <View>
      <Text onTextLayout={onTextLayout} numberOfLines={numberOfLines}>
        {children}
      </Text>
      {showReadMore ? (
        <Text style={linkStyle} onPress={toggleTextShown}>
          {isTextShown ? "Read less" : "Read more"}
        </Text>
      ) : null}
    </View>
  );
};

CollapsibleText.defaultProps = {
  fontSize: 14,
  color: colors.lightBlue,
  numOfLines: 2,
  fontWeight: "700",
  margin: 5,
};

export default CollapsibleText;
