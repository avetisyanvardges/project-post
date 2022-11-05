import React from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import Icon from "../../svgIcons/Icon";
import { colors } from "../../../config/theme";
import AppText from "../../dataDisplays/AppText";

function FieldTextInput({ icon, title, ...otherProps }) {
  return (
    <>
      <View style={styles.titleContainer}>
        <AppText style={styles.title}>{title}</AppText>
        {title == "Password" && (
          <AppText style={styles.forgotPassword}>Forgot Password?</AppText>
        )}
      </View>
      <View style={styles.container}>
        {icon && (
          <Icon name={icon} size={23} fill={colors.white} style={styles.icon} />
        )}
        <TextInput
          placeholderTextColor="transparent"
          style={styles.text}
          placeholder={title}
          {...otherProps}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    borderRadius: 25,
    flexDirection: "row",
    width: "100%",
    padding: 5,
    marginVertical: 1,
  },
  icon: {
    marginRight: 5,
  },
  title: {
    flex: 2,
    color: colors.white,
    fontSize: 15,
    marginTop: 15,
  },
  titleContainer: {
    flexDirection: "row",
    width: "100%",
  },
  forgotPassword: {
    flex: 1,
    marginRight: 0,
    marginTop: 15,
    color: colors.blue,
  },
  text: {
    color: colors.white,
    fontSize: 22,
  },
});

export default FieldTextInput;
