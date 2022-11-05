import React from "react";
import { StyleSheet, View, Image } from "react-native";

import AppText from "../../../dataDisplays/AppText";
import { colors } from "../../../../config/theme";
import TimeVenueCard from "../TimeVenueCard";
import Icon from "../../../svgIcons/Icon";

function LargeCardv1({ title, text, price, image }) {
  return (
    <View
      style={{
        borderRadius: 5,
        overflow: "hidden",
        marginBottom: 20,
      }}
    >
      <Image
        style={{
          width: "100%",
          height: 120,
          marginBottom: 10,
        }}
        source={image}
      />

      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <AppText style={styles.title}>{title}</AppText>
          <AppText
            style={{
              fontWeight: "300",
              fontSize: 14,
              color: colors.white,
              marginBottom: 1,
            }}
          >
            {text}
          </AppText>
        </View>
        <View>
          <AppText
            style={{
              fontSize: 28,
              color: colors.white,
            }}
          >
            {price}
          </AppText>
          <AppText
            style={{
              fontSize: 12,
              color: colors.white,
            }}
          >
            per person
          </AppText>
        </View>
      </View>
      {/* Time */}
      <TimeVenueCard />
      <View
        style={{
          flexDirection: "row",
          marginVertical: 5,
        }}
      >
        <View style={{ flex: 1 }}>
          <View style={{ height: 30, justifyContent: "center" }}>
            <AppText
              style={{
                fontSize: 14,
                color: colors.white,
              }}
            >
              <Icon name="clock" size={16} fill={colors.blue} /> Mobile ticket
            </AppText>
          </View>
          <View style={{ height: 30, justifyContent: "center" }}>
            <AppText
              style={{
                fontSize: 14,

                color: colors.white,
              }}
            >
              <Icon name="clock" size={16} fill={colors.blue} /> Mobile ticket
            </AppText>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ height: 30, justifyContent: "center" }}>
            <AppText
              style={{
                fontSize: 14,

                color: colors.white,
              }}
            >
              <Icon name="clock" size={16} fill={colors.blue} /> Mobile ticket
            </AppText>
          </View>
          <View style={{ height: 30, justifyContent: "center" }}>
            <AppText
              style={{
                fontSize: 14,

                color: colors.white,
              }}
            >
              <Icon name="clock" size={16} fill={colors.blue} /> Mobile ticket
            </AppText>
          </View>
        </View>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 10,
        }}
      >
        <View
          style={{
            height: 40,
            width: "98%",
            backgroundColor: colors.blue,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 5,
            marginVertical: 10,
          }}
        >
          <AppText
            style={{ fontSize: 16, color: colors.white, fontWeight: "700" }}
          >
            BOOK NOW
          </AppText>
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
    fontWeight: "700",
    fontSize: 20,
    color: colors.white,
    marginBottom: 1,
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

export default LargeCardv1;
