import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { colors } from "../../../config/theme";
import AppText from "../../dataDisplays/AppText";

function TimeVenueCard(props) {
  return (
    <ScrollView horizontal>
      <View style={styles.available}>
        <AppText style={{ color: colors.white, fontSize: 12 }}>7:00 AM</AppText>
      </View>
      <View style={styles.available}>
        <AppText style={{ color: colors.white, fontSize: 12 }}>8:00 AM</AppText>
      </View>
      <View style={styles.selected}>
        <AppText style={{ color: colors.white, fontSize: 12 }}>9:00 AM</AppText>
      </View>
      <View style={styles.available}>
        <AppText style={{ color: colors.white, fontSize: 12 }}>
          10:00 AM
        </AppText>
      </View>
      <View style={styles.unavailable}>
        <AppText style={{ color: colors.grey, fontSize: 12 }}>11:00 AM</AppText>
      </View>
      <View style={styles.unavailable}>
        <AppText style={{ color: colors.grey, fontSize: 12 }}>12:00 PM</AppText>
      </View>
      <View style={styles.unavailable}>
        <AppText style={{ color: colors.grey, fontSize: 12 }}>1:00 PM</AppText>
      </View>
      <View style={styles.unavailable}>
        <AppText style={{ color: colors.grey, fontSize: 12 }}>2:00 PM</AppText>
      </View>
      <View style={styles.unavailable}>
        <AppText style={{ color: colors.grey, fontSize: 12 }}>3:00 PM</AppText>
      </View>
      <View style={styles.unavailable}>
        <AppText style={{ color: colors.grey, fontSize: 12 }}>4:00 PM</AppText>
      </View>
      <View style={styles.unavailable}>
        <AppText style={{ color: colors.grey, fontSize: 12 }}>5:00 PM</AppText>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  available: {
    height: 30,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.white,
    width: 90,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
  },
  unavailable: {
    height: 30,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.grey,
    width: 100,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
  },
  selected: {
    height: 30,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.blue,
    width: 100,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
  },
});
export default TimeVenueCard;
