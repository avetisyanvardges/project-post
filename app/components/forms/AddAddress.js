import React, { useState, useMemo } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/core";
//Form
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
//Configurations
import { theme, colors } from "../../config/theme";
//Components
import Icon from "../svgIcons/Icon";
import AppText from "../dataDisplays/AppText";
import TextInput from "../inputs/TextInput";
//Modal
import SinglSelectionModal from "../modals/SingleSelectionModal";
//Data
import VenueStateSelection from "../../assets/VenueData/VenueObjects/VenueStateSelection";

function AddAddress({ onSuccess }) {
  const [stateInput, setStateInput] = useState();
  const [isSelected, setIsSelected] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  //Error Text
  const [isNameErrorVisible, setIsNameErrorVisible] = useState(false);
  const [isPhoneErrorVisible, setIsPhoneErrorVisible] = useState(false);
  const [isAddressErrorVisible, setIsAddressErrorVisible] = useState(false);
  const [isCityErrorVisible, setIsCityErrorVisible] = useState(false);
  const [isStateErrorVisible, setIsStateErrorVisible] = useState(false);
  const [isZipErrorVisible, setIsZipErrorVisible] = useState(false);

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required(),
    phone: Yup.string()
      .required()
      .matches(phoneRegExp, "Phone number is not valid")
      .min(10, "Phone number is too short")
      .max(10, "Phone number is too long"),
    address_LineOne: Yup.string().required(),
    address_LineTwo: Yup.string(),
    city: Yup.string().required(),
    state: Yup.string().required(),
    zip: Yup.string().required(),
  });

  const { ...methods } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onError = (errors, e) => {
    if (errors.fullName) {
      setIsNameErrorVisible(true);
    }
    if (errors.phone) {
      setIsPhoneErrorVisible(true);
    }
    if (errors.address_LineOne) {
      setIsAddressErrorVisible(true);
    }
    if (errors.city) {
      setIsCityErrorVisible(true);
    }
    if (errors.zip) {
      setIsZipErrorVisible(true);
    }
    //console.log(errors);
  };

  return (
    <>
      <FormProvider {...methods}>
        <View style={{ marginHorizontal: 20 }}>
          <AppText style={styles.label}>Full Name *</AppText>
          <TextInput
            name="fullName"
            style={styles.singleLine_Input}
            //rules={{ required: true }}
            defaultValue=""
          />
          {isNameErrorVisible && (
            <AppText style={styles.errorText}>
              Please fill out required field.
            </AppText>
          )}
          <AppText style={styles.label}>Phone *</AppText>
          <TextInput
            name="phone"
            style={styles.singleLine_Input}
            defaultValue=""
          />
          {isPhoneErrorVisible && (
            <AppText style={styles.errorText}>
              Please fill out required field.
            </AppText>
          )}
          <AppText style={styles.label}>Address *</AppText>
          <TextInput
            name="address_LineOne"
            style={[styles.singleLine_Input, { marginBottom: 10 }]}
            defaultValue=""
          />
          <TextInput
            name="address_LineTwo"
            style={styles.singleLine_Input}
            defaultValue=""
          />
          {isAddressErrorVisible && (
            <AppText style={styles.errorText}>
              Please fill out required field.
            </AppText>
          )}
          <AppText style={styles.label}>City *</AppText>
          <TextInput
            name="city"
            style={styles.singleLine_Input}
            defaultValue=""
          />
          {isCityErrorVisible && (
            <AppText style={styles.errorText}>
              Please fill out required field.
            </AppText>
          )}
          <View
            style={{
              height: 110,
              width: "100%",
              flexDirection: "row",
            }}
          >
            <View style={{ flex: 1, paddingRight: 5 }}>
              <Text style={styles.label}>State *</Text>
              <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                <View
                  style={[
                    styles.singleLine_Input,
                    {
                      alignItems: "center",
                      flexDirection: "row",
                      paddingRight: 0,
                    },
                  ]}
                >
                  <View style={{ flex: 1 }}>
                    <TextInput
                      name="state"
                      style={{ color: colors.white, fontSize: 18 }}
                      value={stateInput}
                      defaultValue=""
                      editable={false}
                    />
                  </View>
                  <View
                    style={{
                      height: "100%",
                      width: 20,
                      paddingHorizontal: 2,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon name="chevron-down" fill={colors.white} size={10} />
                  </View>
                </View>
                {isStateErrorVisible && (
                  <AppText style={styles.errorText}>
                    Please fill out required field.
                  </AppText>
                )}
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, paddingLeft: 5 }}>
              <Text style={styles.label}>Zip Code *</Text>
              <TextInput
                name="zip"
                style={styles.singleLine_Input}
                defaultValue=""
              />
              {isZipErrorVisible && (
                <AppText style={styles.errorText}>
                  Please fill out required field.
                </AppText>
              )}
            </View>
          </View>
          <View style={{ flexDirection: "row", paddingTop: 10 }}>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: isSelected ? colors.blue : "transparent",
                height: 18,
                width: 18,
              }}
            >
              {isSelected ? (
                <Icon
                  name="check"
                  fill={theme.modal.backgroundColor}
                  size={10}
                />
              ) : null}
            </View>
            <AppText style={{ color: colors.white, paddingLeft: 5 }}>
              Save this billing address for future use.{" "}
            </AppText>
          </View>
          <TouchableOpacity
            type="submit"
            onPress={methods.handleSubmit(onSuccess, onError)}
          >
            <View
              style={{
                width: "100%",
                height: 45,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: colors.blue,
                marginTop: 30,
                borderRadius: 5,
              }}
            >
              <AppText
                style={{ color: colors.white, fontSize: 16, fontWeight: "500" }}
              >
                Use This Address
              </AppText>
            </View>
          </TouchableOpacity>
        </View>
      </FormProvider>
      <SinglSelectionModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        list={VenueStateSelection}
        title={"State"}
        onSelectFunction={(element) => {
          setStateInput(element);
          setIsModalVisible(false);
        }}
      />
    </>
  );
}
const styles = StyleSheet.create({
  label: {
    marginTop: 15,
    marginBottom: 10,
    fontSize: theme.label.fontSize,
    color: colors.white,
  },
  singleLine_Input: {
    width: "100%",
    height: 45,
    backgroundColor: colors.darkGrey,
    borderWidth: 2,
    borderColor: colors.lightCharcoal,
    paddingHorizontal: 10,
    color: colors.white,
    fontSize: 16,
  },
  errorText: {
    paddingVertical: 5,
    color: colors.red,
    fontSize: 12,
  },
});

export default AddAddress;
