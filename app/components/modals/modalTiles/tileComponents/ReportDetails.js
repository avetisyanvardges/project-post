import React from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
//Components
import AppText from "../../../dataDisplays/AppText";
//Queries
import { useQuery } from "@apollo/client";
import {
  REPORT_POST_REASON_DETAILS,
  REPORT_USER_REASON_DETAILS,
} from "../../../../services/graphql/reportQueries";
import { colors, theme } from "../../../../config/theme";

function ReportDetails({ reportId, userId, onSubmit }) {
  const reportDetailInfo = useQuery(REPORT_POST_REASON_DETAILS, {
    variables: {
      userId: userId,
      reportPostReasonId: reportId,
    },
  });

  if (reportDetailInfo.error) {
    "Report List Query " + reportDetailInfo.error;
  }

  return !reportDetailInfo.loading && !reportDetailInfo.error ? (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <AppText style={styles.header}>
          {reportDetailInfo.data.reportPostReason.reason}
        </AppText>
        <AppText style={styles.details}>
          {reportDetailInfo.data.reportPostReason.description}
        </AppText>
      </ScrollView>
      <View
        style={{
          flex: 1,
          flexDirection: "flex-end",
        }}
      >
        <TouchableWithoutFeedback onPress={() => onSubmit()}>
          <View style={styles.submitContainer}>
            <View style={styles.submitButton}>
              <AppText style={styles.submitText}>Submit Request</AppText>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  ) : null;
}

const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    paddingTop: 10,
    paddingLeft: 10,
    color: theme.modal.textColor,
    opacity: 0.5,
    paddingBottom: 20,
  },
  details: {
    fontSize: 18,
    paddingVertical: 10,
    paddingHorizontal: 10,
    color: theme.modal.textColor,
  },
  submitContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    width: "100%",
  },
  submitButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.modal.warningColor,
    borderRadius: 3,
    width: "90%",
  },
  submitText: {
    color: theme.modal.textColor,
    paddingVertical: 10,
    fontSize: 18,
    fontWeight: "500",
  },
});

export default ReportDetails;
