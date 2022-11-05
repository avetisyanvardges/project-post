import React from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "../../../config/theme";
import AppText from "../../dataDisplays/AppText";

function AddressSelectionCard({ item }) {
  return (
    <View style={{ marginBottom: 20, marginHorizontal: 5 }}>
      <View
        style={{
          height: "100%",
          width: 50,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: isSelected ? colors.blue : "transparent",
            height: 24,
            width: 24,
            borderRadius: 14,
            borderWidth: 1,
            borderColor: isSelected ? colors.blue : theme.modal.separatorColor,
          }}
        >
          {isSelected ? (
            <Icon name="check" fill={theme.modal.backgroundColor} size={10} />
          ) : null}
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <AppText>{item.address}</AppText>
        <AppText>{item.city}</AppText>
        <AppText>{item.state}</AppText>
        <AppText>{item.zip}</AppText>
        <AppText>{item.country}</AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});

export default AddressSelectionCard;
