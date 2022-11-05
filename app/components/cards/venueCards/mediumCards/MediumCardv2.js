import React from "react";
import { StyleSheet, View, Image } from "react-native";

import AppText from "../../../dataDisplays/AppText";
import Icon from "../../../svgIcons/Icon";
import { colors } from "../../../../config/theme";

function MediumCardv2({ title, text, price, image }) {
  return (
    <View
      style={{
        width: 250,
        marginHorizontal: 5,
        backgroundColor: colors.midCharcoal,
        borderRadius: 5,
        overflow: "hidden",
      }}
    >
      <Image
        style={{
          width: "100%",
          height: 155,
          marginBottom: 10,
        }}
        source={image}
      />
      <View style={{ flex: 1, paddingHorizontal: 5 }}>
        <View style={{ flexDirection: "row", marginBottom: 10 }}>
          <View style={{ flex: 1 }}>
            <AppText
              style={{
                fontWeight: "700",
                fontSize: 16,
                color: colors.white,
              }}
            >
              {title}
            </AppText>
          </View>
          <View style={{ paddingLeft: 20, paddingRight: 10 }}>
            <AppText
              style={{
                fontSize: 22,
                color: colors.white,
              }}
            >
              {price}
            </AppText>
            <AppText
              style={{
                fontSize: 10,
                color: colors.white,
              }}
            >
              per person
            </AppText>
          </View>
        </View>
        <AppText
          style={{
            fontWeight: "400",
            fontSize: 14,
            color: colors.white,
            marginBottom: 1,
          }}
        >
          {text}
        </AppText>
        <View
          style={{
            paddingVertical: 5,
            flexDirection: "row",
          }}
        >
          <Icon
            name="location"
            size={22}
            fill={colors.blue}
            style={{ marginRight: 6 }}
          />
          <AppText
            style={{
              fontSize: 14,
              fontWeight: "500",
              color: colors.white,
            }}
          >
            Cabo San Lucas, Mexico
          </AppText>
        </View>
      </View>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <View
          style={{
            width: "55%",
            height: 35,
            borderRadius: 5,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 15,
            backgroundColor: colors.blue,
          }}
        >
          <AppText style={{ color: colors.white }}>SEE MORE</AppText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
  },
  text: {
    justifyContent: "center",
  },
  title: {
    color: "white",
    fontSize: 16,
    paddingBottom: 2,
  },
  level: {
    color: "white",
    fontSize: 14,
  },
  separator: {
    color: colors.white,
    width: 1,
  },
});

export default MediumCardv2;
