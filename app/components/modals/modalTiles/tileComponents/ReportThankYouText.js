import React from "react";
import { StyleSheet, View } from "react-native";
import { theme } from "../../../../config/theme";
import AppText from "../../../dataDisplays/AppText";

function ReportThankYouText(props) {
  return (
    <View>
      <AppText style={styles.title}>Thank You For Reporting</AppText>
      <AppText style={styles.detials}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book.
      </AppText>
      <AppText style={styles.detials}>
        It has survived not only five centuries, but also the leap into
        electronic typesetting, remaining essentially unchanged. It was
        popularised in the 1960s with the release of Letraset sheets containing
        Lorem Ipsum passages, and more recently with desktop publishing software
        like Aldus PageMaker including versions of Lorem Ipsum.
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    paddingTop: 10,
    paddingLeft: 10,
    color: theme.modal.textColor,
    opacity: 0.5,
  },
  detials: {
    fontSize: 15,
    paddingVertical: 10,
    paddingLeft: 10,
    color: theme.modal.textColor,
  },
});

export default ReportThankYouText;
