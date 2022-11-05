import React from "react";
import { StyleSheet, View, Image } from "react-native";
import AppText from "../../../dataDisplays/AppText";
import Icon from "../../../svgIcons/Icon";
import { colors } from "../../../../config/theme";

function MediumCardv1({ title, text, price, image }) {
  return (
    <View
      style={{
        height: 380,
        width: 280,
        marginRight: 30,
        backgroundColor: colors.lightCharcoal,
        borderRadius: 5,
        overflow: "hidden",
        paddingBottom: 20,
      }}
    >
      <Image
        style={{
          width: "100%",
          height: 125,
          marginBottom: 10,
          marginRight: 5,
        }}
        source={image}
      />
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1, marginLeft: 10 }}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <AppText
                style={{
                  fontWeight: "700",
                  fontSize: 20,
                  color: colors.white,
                  marginBottom: 1,
                }}
              >
                {title}
              </AppText>
              <AppText
                style={{
                  fontWeight: "400",
                  fontSize: 16,
                  color: colors.white,
                  marginBottom: 1,
                }}
              >
                {text}
              </AppText>
            </View>
            <View
              style={{
                marginBottom: 10,
                marginHorizontal: 10,
                //flex: 1,
              }}
            >
              <AppText
                style={{
                  fontSize: 24,
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
                a person
              </AppText>
            </View>
          </View>
          <AppText
            style={{
              fontSize: 16,
              fontWeight: "500",
              color: colors.white,
            }}
          >
            <Icon
              name="location"
              size={14}
              fill={colors.blue}
              style={{ marginTop: 1, marginRight: 4 }}
            />
            Cabo San Lucas, Mexico
          </AppText>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginVertical: 10,
          marginHorizontal: 10,
        }}
      >
        <View style={{ flex: 1 }}>
          <View style={{ height: 25, justifyContent: "center" }}>
            <AppText
              style={{
                fontSize: 14,
                color: colors.white,
              }}
            >
              <Icon name="clock" size={16} fill={colors.blue} /> Mobile ticket
            </AppText>
          </View>
          <View style={{ height: 25, justifyContent: "center" }}>
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
          <View style={{ height: 25, justifyContent: "center" }}>
            <AppText
              style={{
                fontSize: 14,
                color: colors.white,
              }}
            >
              <Icon name="clock" size={16} fill={colors.blue} /> Mobile ticket
            </AppText>
          </View>
          <View style={{ height: 25, justifyContent: "center" }}>
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
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <View
          style={{
            width: "70%",
            height: 40,
            borderWidth: 2,
            borderColor: colors.blue,
            borderRadius: 5,
            alignItems: "center",
            justifyContent: "center",
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

export default MediumCardv1;
