import React, { useState, useMemo } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
//Configurations and Constants
import { theme, colors } from "../../config/theme";
import { NAVIGATION_PARAM } from "../../config/routes";
//Components
import TopBar from "../layouts/TopBar";
import AppText from "../dataDisplays/AppText";
import Icon from "../svgIcons/Icon";
//Modals
import AlertModal from "../modals/AlertModal";

function AddCoupon({ onSuccess }) {
  //Onsuccess - should have deal readeemed alert message
  const [text, setText] = useState("");
  const [isIconVisible, setIsIconVisible] = useState(true);
  const [isPromoVisible, setIsPromoVisible] = useState(false);
  const [inputError, setInputError] = useState("");
  const [isSuccessful, setIsSuccessful] = useState(false);

  const dismissKeyboard = () => {
    if (text.length == 0) {
      setIsIconVisible(true);
      setIsPromoVisible(false);
    }
    Keyboard.dismiss();
  };

  const onPromoPress = () => {
    setIsIconVisible(false);
    setIsPromoVisible(true);
  };

  const onPromoSubmit = () => {
    setIsSuccessful(true);
  };

  const onPromoClear = () => {
    setText("");
    setIsIconVisible(true);
    setIsPromoVisible(false);
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={() => dismissKeyboard()}>
        <View style={{ flex: 1, paddingVertical: 50, paddingHorizontal: 20 }}>
          <View style={[styles.singleLine_Input, { flexDirection: "row" }]}>
            <TextInput
              blurOnSubmit={true}
              autoCorrect={false}
              style={{
                width: "90%",
                fontSize: 18,
                color: theme.input.textColor,
              }}
              placeholder="Coupon Code"
              placeholderTextColor={theme.input.placeholderColor}
              multiline={false}
              onChangeText={(text) => setText(text)}
              onPressIn={() => onPromoPress()}
              onSubmitEditing={() => dismissKeyboard()}
              autoCapitalize={"characters"}
              value={text}
            />
            {text.length > 0 ? (
              <TouchableOpacity onPress={() => onPromoClear()}>
                <View
                  style={{
                    backgroundColor: theme.input.placeholderColor,
                    height: 22,
                    width: 22,
                    borderRadius: 11,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon style={styles.closeButton} name="close" size={12} />
                </View>
              </TouchableOpacity>
            ) : null}
          </View>
          {inputError.length > 0 ? (
            <AppText style={styles.errorText}>{inputError}</AppText>
          ) : null}
          {isIconVisible ? (
            <View
              style={{
                height: "85%",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon
                name="bookmark"
                fill={theme.input.placeholderColor}
                size={150}
              />
            </View>
          ) : null}
        </View>
      </TouchableWithoutFeedback>
      <KeyboardAvoidingView behavior="position">
        {isPromoVisible ? (
          <View style={{ paddingBottom: 10 }}>
            <TouchableOpacity onPress={() => onPromoSubmit()}>
              <View style={styles.footerContainer}>
                <View style={styles.footerButton}>
                  <AppText
                    style={{
                      fontSize: 15,
                      fontWeight: "600",
                      color: colors.white,
                    }}
                  >
                    Add Promo
                  </AppText>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        ) : null}
      </KeyboardAvoidingView>
      <AlertModal
        title={"Deal Redeemed!"}
        message={
          text
            ? text
            : "Your promotion" +
              " has been successfully redeemed. Your promotion will be successfully applied at checkout."
        }
        btnLabel={"Close"}
        onPress={() => {
          onSuccess(text);
          setIsSuccessful(false);
        }}
        isOpen={isSuccessful}
      />
    </>
  );
}

const styles = StyleSheet.create({
  label: {
    marginTop: 25,
    marginBottom: 10,
    fontSize: theme.label.fontSize,
    color: theme.input.textColor,
  },
  singleLine_Input: {
    flexDirection: "row",
    width: "100%",
    borderWidth: 1,
    paddingVertical: 10,
    paddingLeft: 15,
    backgroundColor: theme.input.backgroundColor,
    borderColor: theme.input.lineColor,
    borderRadius: theme.input.borderRadius,
  },
  errorText: {
    color: colors.red,
    paddingTop: 5,
  },
  footerContainer: {
    height: 60,
    width: "100%",
    flex: 1,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    bottom: 0,
  },
  footerButton: {
    borderRadius: 8,
    height: "70%",
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.blue,
  },
});

export default AddCoupon;
