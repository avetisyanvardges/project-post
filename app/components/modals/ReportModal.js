import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  FlatList,
  Modal,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
//Global Context
import { AuthContext } from "../../config/context";
//PropTypes
import PropTypes from "prop-types";
//Theme Constants
import { colors, theme } from "../../config/theme";
//Data Displays
import AppText from "../dataDisplays/AppText";
import Icon from "../svgIcons/Icon";
//Components
import ReportTile from "./modalTiles/ReportTile";
import ReportDetails from "./modalTiles/tileComponents/ReportDetails";
import ReportThankYouText from "./modalTiles/tileComponents/ReportThankYouText";
//Queries and Mutations
import { useQuery, useMutation } from "@apollo/client";
import {
  REPORT_POST_REASON,
  REPORT_USER_REASON,
} from "../../services/graphql/reportQueries";
import {
  REPORT_POST,
  REPORT_USER,
} from "../../services/graphql/reportMutations";

function ReportModal({
  setIsReportVisible,
  isReportVisible,
  postId,
  userId,
  vendorId,
  handleReportError,
}) {
  //Global Context: Current User Id
  const reporterId = useContext(AuthContext);
  const [reportId, setReportId] = useState(null);
  const [isReportSubmit, setReportSubmit] = useState(false);
  const [isReportSelected, setIsReportSelected] = useState(false);
  const insets = useSafeAreaInsets();
  const flexAboveModal = 1;
  const flexOfModal = 2;

  //Queries
  const reportQueryList = useQuery(
    postId ? REPORT_POST_REASON : REPORT_USER_REASON
  );

  //Query Errors
  if (reportQueryList.error) {
    "Report List Query " + reportQueryList.error;
  }

  const [reportPost] = useMutation(REPORT_POST, {
    onError(error) {
      console.log("Report Post Failed: " + error.message);
      handleReportError();
    },
    onCompleted(data) {
      setReportSubmit(true);
    },
  });

  const [reportUser] = useMutation(REPORT_USER, {
    onError(error) {
      console.log("Report Post Failed: " + error.message);
      handleReportError();
    },
    onCompleted(data) {
      setReportSubmit(true);
    },
  });

  const selectReport = (reportId) => {
    setReportId(reportId);
    setIsReportSelected(true);
  };

  const onCancel = () => {
    setReportId(null);
    setIsReportSelected(false);
    setIsReportVisible(!isReportVisible);
  };

  const onSubmit = () => {
    if (postId) {
      console.log("postId: " + postId);
      reportPost({
        variables: {
          reporterId: reporterId,
          postId: postId,
          reasonId: reportId,
        },
      });
    }
    if (userId) {
      console.log("userId: " + userId);
      reportUser({
        variables: {
          reporterId: reporterId,
          userId: userId,
          reasonId: reportId,
        },
      });
    }
    if (vendorId) {
      return null;
    }
  };

  const onKeyExtraction = (item) => {
    if (postId) {
      return item.reportPostReasonId.toString();
    }
    if (userId) {
      return item.reportUserReasonId.toString();
    }
    if (vendorId) {
      return item.reportVendorReasonId.toString();
    }
  };

  return !reportQueryList.loading && !reportQueryList.error ? (
    <Modal animationType="fade" transparent={true} visible={isReportVisible}>
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={() => onCancel()}>
          <View style={{ flex: flexAboveModal }} />
        </TouchableWithoutFeedback>
        <View
          style={{
            flex: flexOfModal,
            backgroundColor: theme.modal.backgroundColor,
          }}
        >
          {/* Modal Header */}
          <View style={styles.headerContainer}>
            <TouchableWithoutFeedback
              onPress={() => setIsReportSelected(false)}
            >
              <View style={styles.iconContainer}>
                {!isReportSubmit ? (
                  isReportSelected ? (
                    <Icon
                      name="chevron-left"
                      size={15}
                      fill={colors.white}
                      style={{ marginTop: 5 }}
                    />
                  ) : (
                    <View />
                  )
                ) : (
                  <View />
                )}
              </View>
            </TouchableWithoutFeedback>
            <View style={styles.headerTitle}>
              <AppText style={styles.headerTitleText}>Report Post</AppText>
            </View>
            <TouchableWithoutFeedback onPress={() => onCancel()}>
              <View style={styles.iconContainer}>
                <AppText style={styles.headerTitleText}>X</AppText>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.separator} />
          {/* Modal Body */}
          <View
            style={{
              height: "100%",
              width: "100%",
              paddingBottom: insets.bottom + 50,
            }}
          >
            {!isReportSubmit ? (
              !isReportSelected ? (
                //Report List
                <FlatList
                  data={
                    postId
                      ? reportQueryList.data.reportPostReasons
                      : reportQueryList.data.reportUserReasons
                  }
                  keyExtractor={(item) => onKeyExtraction(item)}
                  renderItem={({ item }) => (
                    <ReportTile
                      reportId={
                        postId
                          ? item.reportPostReasonId
                          : item.reportUserReasonId
                      }
                      title={item.reason}
                      selectReport={selectReport}
                    />
                  )}
                />
              ) : (
                //Report Details
                <ReportDetails
                  reportId={reportId}
                  userId={reporterId}
                  onSubmit={onSubmit}
                />
              )
            ) : (
              //Report Thank You Message
              <ReportThankYouText />
            )}
          </View>
        </View>
      </View>
    </Modal>
  ) : null;
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: theme.modal.backgroundOverlay,
  },
  headerContainer: {
    width: "100%",
    height: 45,
    flexDirection: "row",
  },
  iconContainer: {
    height: "100%",
    width: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitleText: {
    color: theme.modal.textColor,
    fontSize: 16,
    fontWeight: "600",
  },
  separator: {
    height: 1,
    backgroundColor: theme.modal.separatorColor,
    opacity: 0.1,
    margin: 5,
  },
});

ReportModal.propTypes = {
  isReportVisible: PropTypes.bool.isRequired,
  setIsReportVisible: PropTypes.func.isRequired,
};

export default ReportModal;
