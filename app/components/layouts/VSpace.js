import React from "react";
import { View } from "react-native";

const VSpace = ({ value = 8, color = "transparent" }) => {
  return <View style={{ height: value, backgroundColor: color }} />;
};

export default VSpace;
