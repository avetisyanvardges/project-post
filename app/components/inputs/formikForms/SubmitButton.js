import React from "react";
import { useFormikContext } from "formik";
import { TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "../../../config/theme";
import AppText from "../../dataDisplays/AppText";

function SubmitButton({ title, onPress, color = "charcoal" }) {
  //const { handleSubmit } = useFormikContext();

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors[color] }]}
      onPress={onPress}
    >
      <AppText style={styles.text}>{title}</AppText>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderColor: "transparent",
    borderRadius: 10,
    borderWidth: 3,
    height: 55,
    justifyContent: "center",
    marginTop: 15,
    //margin: 1,
  },
  text: {
    color: colors.white,
    fontSize: 20,
    padding: 2,
    fontWeight: "500",
    //textTransform: "uppercase",
  },
});

export default SubmitButton;
