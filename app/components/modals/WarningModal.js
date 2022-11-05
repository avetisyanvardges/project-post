import React from "react";
import { View, StyleSheet, Modal, TouchableOpacity } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import Text from "../dataDisplays/AppText";
import PropTypes from "prop-types";
import { colors, theme } from "../../config/theme";

const WarningModal = ({
  title,
  titleStyle,
  message,
  messageStyle,
  isOpen,
  topLabel,
  bottomLabel,
  topOnPress,
  bottomOnPress,
  topLableStyle,
  bottomLabelStyle,
}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={isOpen}>
      <View style={styles.overlay}>
        <View style={{ flex: 3.5 }} />
        <View style={styles.modalContainer}>
          <View
            style={{
              flex: 1,
              alginItems: "center",
            }}
          >
            <View style={styles.modalContent}>
              <View style={styles.titleContainer}>
                <Text style={[styles.title, titleStyle]}>{title}</Text>
              </View>
              <View style={styles.messageContainer}>
                <Text style={[styles.message, messageStyle]}>{message}</Text>
              </View>
            </View>

            <View style={{ flex: 2 }}>
              <View style={styles.separator} />
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.button}
                onPress={topOnPress}
              >
                <Text style={[styles.topBtnText, topLableStyle]}>
                  {topLabel}
                </Text>
              </TouchableOpacity>

              <View style={styles.separator} />
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.button}
                onPress={bottomOnPress}
              >
                <Text style={[styles.bottomBtnText, bottomLabelStyle]}>
                  {bottomLabel}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ flex: 4 }} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: theme.modal.backgroundOverlay,
  },
  modalContainer: {
    flex: 3,
    bottom: 0,
    margin: 40,
    backgroundColor: theme.modal.backgroundColor,
    borderRadius: 10,
  },
  modalContent: {
    flex: 3,
    justifyContent: "center",
    marginHorizontal: 10,
  },
  separator: {
    height: 1,
    backgroundColor: theme.modal.separatorColor,
  },
  titleContainer: { marginTop: 10 },
  title: {
    color: colors.white,
    fontSize: 18,
    textAlign: "center",
    fontWeight: "800",
  },
  messageContainer: {
    marginVertical: 10,
  },
  message: {
    color: colors.silver,
    textAlign: "center",
  },
  topBtnText: {
    color: colors.blue,
    textAlign: "center",
    fontWeight: "600",
  },
  button: { flex: 1, justifyContent: "center" },
  bottomBtnText: {
    color: colors.white,
    textAlign: "center",
  },
});

WarningModal.defaultProps = {
  title: "Unsaved Changes",
  message: "Would you like to proceed without saving?",
  topLabel: "Yes",
  bottomLabel: "No",
};

WarningModal.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  topLabel: PropTypes.string.isRequired,
  bottomLabel: PropTypes.string.isRequired,
  topOnPress: PropTypes.func,
  bottomOnPress: PropTypes.func,
};

export default WarningModal;
