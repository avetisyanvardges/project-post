import React from "react";
import { StyleSheet } from "react-native";
import MaskedView from "@react-native-community/masked-view";

function MaskView({ element, children }) {
  return (
    <MaskedView style={styles.container} maskElement={element}>
      {children}
    </MaskedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    height: "100%",
  },
});

export default MaskView;
