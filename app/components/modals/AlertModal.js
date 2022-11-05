import React from "react";
import { View, StyleSheet, Modal, TouchableOpacity } from "react-native";

import Text from "../dataDisplays/AppText";
import PropTypes from "prop-types";
import { colors, theme } from "../../config/theme";

const AlertModal = ({ title, message, isOpen, btnLabel, onPress }) => {
  return (
    <Modal animationType="fade" transparent={true} visible={isOpen}>
      <View style={styles.overlay}>
        <View style={{ flex: 4.5 }} />
        <View style={styles.modalContainer}>
          <View
            style={{
              flex: 1,
              alginItems: "center",
            }}
          >
            <View style={styles.modalContent}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
              </View>
              <View style={styles.messageContainer}>
                <Text style={styles.message}>{message}</Text>
              </View>
            </View>

            <View style={{ flex: 1 }}>
              <View style={styles.separator} />
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.button}
                onPress={onPress}
              >
                <Text style={styles.topBtnText}>{btnLabel}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ flex: 5 }} />
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

AlertModal.defaultProps = {
  title: "Action Failed",
  message: "Unable to complete your action. Please try again.",
  btnLabel: "Dismiss",
};

AlertModal.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  btnLabel: PropTypes.string.isRequired,
  onPress: PropTypes.func,
};

export default AlertModal;
