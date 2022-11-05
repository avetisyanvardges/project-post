import React from "react";
import { View } from "react-native";

const HSpace = ({ value = 8, color = "transparent" }) => {
  return <View style={{ width: value, backgroundColor: color }} />;
};

export default HSpace;
