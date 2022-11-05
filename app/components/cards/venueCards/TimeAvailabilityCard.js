import React from "react";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { colors } from "../../../config/theme";
import AppText from "../../dataDisplays/AppText";

function TimeAvailabilityCard({
  onBookNow,
  timeSlot,
  timeZone,
  hostedLanguage,
  surchageAmount,
  numberOfTravelers,
  cost,
}) {
  return (
    <View style={{ marginBottom: 10, marginHorizontal: 5 }}>
      <View
        style={{
          borderRadius: 3,
          padding: 10,
        }}
      >
        <AppText style={styles.time}>
          {timeSlot} {timeZone}
        </AppText>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <AppText style={styles.text}>
              ${cost}/travler
              {surchageAmount != null
                ? " + ($" + surchageAmount + " surchage)"
                : null}
            </AppText>
            <AppText style={styles.text}>
              {numberOfTravelers} Traveler(s){" "}
            </AppText>
            <AppText style={styles.text}>Hosted In {hostedLanguage}</AppText>
          </View>
          <View
            style={{
              alignItems: "flex-end",
              justifyContent: "flex-end",
            }}
          >
            <TouchableWithoutFeedback
              onPress={() => onBookNow(timeSlot, timeZone)}
            >
              <View style={styles.button}>
                <AppText style={styles.buttonText}>Book</AppText>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.blue,
    borderRadius: 15,
    paddingHorizontal: 30,
    paddingVertical: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 17,
    color: colors.white,
    fontWeight: "500",
  },
  text: {
    fontSize: 14,
    fontWeight: "400",
    color: colors.white,
  },
  time: {
    fontSize: 19,
    fontWeight: "500",
    marginBottom: 5,
    color: colors.blue,
  },
});

export default TimeAvailabilityCard;
