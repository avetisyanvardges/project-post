import React from "react";
import { useFormikContext } from "formik";

import { View, StyleSheet } from "react-native";

import FieldTextInput from "./FieldTextInput";
import ErrorMessage from "./ErrorMessage";
import { colors } from "../../../config/theme";

function FormField({ name, title, ...otherProps }) {
  const { setFieldTouched, handleChange, errors, touched } = useFormikContext();

  return (
    <>
      <FieldTextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={handleChange(name)}
        title={title}
        {...otherProps}
      />
      <View style={styles.underline}></View>
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}
const styles = StyleSheet.create({
  underline: {
    height: 1,
    width: "100%",
    backgroundColor: colors.white,
    marginBottom: 2,
  },
});

export default FormField;
