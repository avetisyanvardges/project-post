import React from "react";
import { StyleSheet, View, Image } from "react-native";

import AppText from "../../../dataDisplays/AppText";
import Avatar from "../../../dataDisplays/Avatar";
import Icon from "../../../svgIcons/Icon";
import { colors } from "../../../../config/theme";

function SmallCardv2({ title, subTitle, location, price }) {
  return (
    <View style={{ height: 325, width: 200, marginRight: 10 }}>
      <Image
        style={{
          width: "100%",
          height: 250,
          borderRadius: 5,
          marginBottom: 10,
          marginRight: 5,
          backgroundColor: colors.red,
        }}
        source={require("../../../../assets/FeedData/FeedImages/Hiker.jpg")}
      />
      <View
        style={{
          width: "100%",
          height: 250,
          borderRadius: 5,
          marginBottom: 10,
          marginRight: 5,
          position: "absolute",
        }}
      >
        <View style={{ position: "absolute", right: 10, top: 10 }}>
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
        <View style={{ position: "absolute", left: 10, bottom: 10 }}>
          <View style={styles.container}>
            <View>
              <Avatar size="xs" />
            </View>
            <View style={{ flexDirection: "column" }}>
              <AppText style={styles.title}>@ann_brian</AppText>
              <View style={{ flexDirection: "row" }}>
                <AppText style={styles.level}>Level 25</AppText>
                <AppText style={styles.level}> | </AppText>
                <Icon name="star" size={14} fill={colors.blue} />
                <AppText style={styles.level}> 5/5</AppText>
              </View>
            </View>
          </View>
        </View>
      </View>
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
          fontWeight: "600",
          fontSize: 16,
          color: colors.white,
          marginBottom: 1,
        }}
      >
        {subTitle}
      </AppText>
      <AppText
        style={{
          fontWeight: "400",
          fontSize: 16,
          color: colors.white,
        }}
      >
        {location}
      </AppText>
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

export default SmallCardv2;
