import React from "react";
import { SafeAreaView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Screen = ({ children }) => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      style={{
        paddingTop: insets.top,
        paddingLeft: insets.left,
        paddingBottom: insets.bottom,
        paddingRight: insets.right,
        flex: 1,
      }}
    >
      {children}
    </SafeAreaView>
  );
};

export default Screen;
