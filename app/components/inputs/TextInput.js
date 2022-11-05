// components/TextInput.tsx
import React from "react";
import { StyleSheet } from "react-native";
import { useFormContext } from "react-hook-form";

import ControlledInput from "./ControlledInput";

const TextInput = ({ name, ...props }) => {
  const formContext = useFormContext();

  if (!formContext || !name) {
    const msg = !formContext
      ? "TextInput must be wrapped by the FormProvider"
      : "Name must be defined";
    console.error(msg);
    return null;
  }

  return <ControlledInput name={name} {...props} />;
};

export default TextInput;
