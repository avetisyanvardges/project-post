// components/TextInput.tsx
import React from "react";
import {
  View,
  TextInput as RNTextInput,
  Icon,
  Text,
  StyleSheet,
} from "react-native";
import {
  useController,
  useFormContext,
  ControllerProps,
  UseControllerProps,
} from "react-hook-form";

const ControlledInput = ({ name, label, rules, defaultValue, ...props }) => {
  const formContext = useFormContext();
  const { formState } = formContext;

  const { field } = useController({ name, rules, defaultValue });

  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <RNTextInput
        onChangeText={field.onChange}
        onBlur={field.onBlur}
        defaultValue={defaultValue}
        value={field.value}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    color: "white",
    marginTop: 20,
    textAlign: "center",
  },
  container: {
    flex: -1,
    justifyContent: "center",
    padding: 8,
    backgroundColor: "#0e101c",
    borderColor: "white",
    borderWidth: 1,
  },
  input: {
    backgroundColor: "white",

    height: 40,
    padding: 10,
    borderRadius: 4,
  },
});

export default ControlledInput;
