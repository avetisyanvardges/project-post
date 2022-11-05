import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import PropTypes from "prop-types";
//Theme
import { colors, theme } from "../../../config/theme";
//DataDisplays
import AppText from "../../dataDisplays/AppText";
import Avatar from "../../dataDisplays/Avatar";
import Icon from "../../svgIcons/Icon";

function ShareTile({ item, onSelect }) {
  const [isSelected, setIsSelected] = useState(item.isItemSelected);

  const handlePress = () => {
    onSelect(item);
    setIsSelected((prevSelect) => !prevSelect);
    if (isSelected == true) {
      setIsSelected(false);
    } else {
      setIsSelected(true);
    }
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={() => handlePress()}>
        <View style={styles.shareContainer}>
          <View style={styles.avatarContainer}>
            <Avatar
              size="xs"
              image={item.avatar}
              style={[
                styles.avatar,
                item.featuredVideo
                  ? { borderWidth: 1, borderColor: theme.modal.themeBlue }
                  : null,
              ]}
            />
            <View style={{ justifyContent: "center" }}>
              <AppText style={styles.handle}>{item.username}</AppText>
              <AppText style={styles.level}>Level {item.level}</AppText>
            </View>
          </View>
          <View
            style={{
              height: "100%",
              width: 50,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: isSelected ? colors.blue : "transparent",
                height: 24,
                width: 24,
                borderRadius: 14,
                borderWidth: 1,
                borderColor: isSelected
                  ? colors.blue
                  : theme.modal.separatorColor,
              }}
            >
              {isSelected ? (
                <Icon
                  name="check"
                  fill={theme.modal.backgroundColor}
                  size={10}
                />
              ) : null}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.separator} />
    </>
  );
}
const styles = StyleSheet.create({
  avatarContainer: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
  },
  shareContainer: {
    flexDirection: "row",
    height: 60,
    paddingTop: 3,
  },
  separator: {
    height: 1,
    backgroundColor: theme.modal.separatorColor,
    opacity: 0.2,
    margin: 3,
  },
  avatar: {
    marginRight: 10,
  },
  handle: {
    color: theme.modal.textColor,
    fontSize: 15,
    fontWeight: "500",
    paddingBottom: 2,
  },
  level: {
    color: colors.lightGrey,
    fontWeight: "400",
    fontSize: 14,
  },
});

ShareTile.propTypes = {
  item: PropTypes.object,
  onSelect: PropTypes.func,
};

export default ShareTile;
