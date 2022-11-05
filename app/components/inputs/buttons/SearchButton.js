import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { colors } from "../../../config/theme";

export const SearchButton = ({ label, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.text}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    backgroundColor: colors.blue,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  text: {
    fontSize: 16,
    color: colors.white,
    fontWeight: "400",
  },
});

export default SearchButton;
