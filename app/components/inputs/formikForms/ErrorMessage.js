import React from "react";
import { StyleSheet } from "react-native";
import { colors } from "../../../config/theme";
import AppText from "../../dataDisplays/AppText";

function ErrorMessage({ error, visible }) {
  if (!visible || !error) return null;

  return <AppText style={styles.error}>{error}</AppText>;
}

const styles = StyleSheet.create({
  error: {
    color: colors.red,
    fontSize: 18,
  },
});

export default ErrorMessage;
