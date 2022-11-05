import React from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
//Theme Constants
import { colors } from "../../../config/theme";
import { NAVIGATION_PARAM } from "../../../config/routes";
//Navigation
import { useNavigation } from "@react-navigation/core";

const DynamicText = ({
  content,
  hashtags,
  mentions,
  fontSize,
  color,
  linkColor,
  align,
}) => {
  const navigation = useNavigation();

  const textContent = content === null ? "" : content;

  const textStyle = {
    fontSize,
    color,
    textAlign: align,
  };

  const linkStyle = {
    fontSize,
    textAlign: align,
    color: linkColor,
    fontWeight: "700",
  };

  const mentionStyle = (string) => {
    let mention = string.replace(/(?:#|\s)/g, "");

    for (let mentionObject of mentions) {
      if (
        (mention.toLowerCase() === mentionObject.username.toLowerCase()) &
        mentionObject.userid
      ) {
        return {
          linkStyle,
        };
      } else {
        return {
          color: color,
        };
      }
    }
  };

  const onHashtagPress = (string) => {
    let hashtag = string.replace(/(?:#|\s)/g, "");

    for (let hashtagObject of hashtags) {
      if (hashtag.toLowerCase() === hashtagObject.hashtag.toLowerCase()) {
        navigation.push(NAVIGATION_PARAM.rootStack.hashtags, {
          item: {
            tagId: hashtagObject.tagid,
            hashtag: hashtagObject.hashtag.toLowerCase(),
          },
        });
      }
    }
  };

  const onMentionPress = (string) => {
    let mention = string.replace(/(?:#|\s)/g, "");

    for (let mentionObject of mentions) {
      if (
        (mention.toLowerCase() === mentionObject.username.toLowerCase()) &
        mentionObject.userid
      ) {
        navigation.push(NAVIGATION_PARAM.rootStack.profile, {
          screen: NAVIGATION_PARAM.profileNavigator.guest,
          userId: mentionObject.userid,
        });
      }
    }
  };

  const formattedText = textContent
    .split(/((?:#[a-z\d-]+|@[a-z\d-]+))/gi)
    .filter(Boolean)
    .map((string, i) => {
      if (string.startsWith("#")) {
        return (
          <TouchableWithoutFeedback
            key={i}
            onPress={() => onHashtagPress(string)}
          >
            <Text style={linkStyle}>{string}</Text>
          </TouchableWithoutFeedback>
        );
      } else if (string.startsWith("@")) {
        return (
          <TouchableWithoutFeedback
            key={i}
            onPress={() => onMentionPress(string)}
          >
            <Text style={mentionStyle(string)}>{string}</Text>
          </TouchableWithoutFeedback>
        );
      }
      {
        return (
          <Text key={i} style={textStyle}>
            {string}
          </Text>
        );
      }
    });

  return <Text>{formattedText}</Text>;
};

DynamicText.defaultProps = {
  fontSize: 14,
  color: colors.white,
  numOfLines: 2,
  linkColor: colors.lightBlue,
};

export default DynamicText;
