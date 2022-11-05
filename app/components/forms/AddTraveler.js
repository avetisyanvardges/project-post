import React, { useRef, useState, useMemo } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
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
import VenueDaySelection from "../../assets/VenueData/VenueObjects/VenueDaySelection";
import VenueMonthSelection from "../../assets/VenueData/VenueObjects/VenueMonthSelection";

function Addtraveler({ onSuccess }) {
  const [monthInput, setMonthInput] = useState();
  const [dayInput, setDayInput] = useState();
  //Modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  //Error Text
  const [isFirstErrorVisible, setIsFirstErrorVisible] = useState(false);
  const [isLastErrorVisible, setIsLastErrorVisible] = useState(false);
  const [isPhoneErrorVisible, setIsPhoneErrorVisible] = useState(false);
  const [isEmailErrorVisible, setIsEmailErrorVisible] = useState(false);

  const selectionRef = useRef();
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required(),
    middleName: Yup.string(),
    lastName: Yup.string().required(),
    email: Yup.string().required(),
    phone: Yup.string()
      .required()
      .matches(phoneRegExp, "Phone number is not valid")
      .min(10, "Phone number is too short")
      .max(10, "Phone number is too long"),
    dob_month: Yup.string(),
    dob_day: Yup.number(),
    dob_year: Yup.number(),
  });

  const { ...methods } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onError = (errors, e) => {
    if (errors.email) {
      setIsEmailErrorVisible(true);
    }
    if (errors.phone) {
      setIsPhoneErrorVisible(true);
    }
    if (errors.firstName) {
      setIsFirstErrorVisible(true);
    }
    if (errors.lastName) {
      setIsLastErrorVisible(true);
    }
    //console.log(errors);
  };

  return (
    <>
      <FormProvider {...methods}>
        <View style={{ marginHorizontal: 20 }}>
          <AppText style={{ fontSize: 26, color: colors.white, marginTop: 10 }}>
            Who is Traveling?{" "}
          </AppText>
          <AppText style={{ fontSize: 16, color: colors.white, marginTop: 10 }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.{" "}
          </AppText>
          <AppText style={styles.label}>First Name *</AppText>
          <TextInput
            name="firstName"
            style={styles.singleLine_Input}
            //rules={{ required: true }}
            defaultValue=""
          />
          {isFirstErrorVisible && (
            <AppText style={styles.errorText}>
              Please fill out required field.
            </AppText>
          )}
          <AppText style={styles.label}>Middle Name</AppText>
          <TextInput
            name="middleName"
            style={styles.singleLine_Input}
            defaultValue=""
          />
          <AppText style={styles.label}>Last Name *</AppText>
          <TextInput
            name="lastName"
            style={styles.singleLine_Input}
            defaultValue=""
          />
          {isLastErrorVisible && (
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
          <AppText style={styles.label}>Email *</AppText>
          <TextInput
            name="email"
            style={styles.singleLine_Input}
            defaultValue=""
          />
          {isEmailErrorVisible && (
            <AppText style={styles.errorText}>
              Please fill out required field.
            </AppText>
          )}
          <AppText style={styles.label}>Date of Birth</AppText>
          <View
            style={{
              height: 90,
              width: "100%",
              flexDirection: "row",
            }}
          >
            <View style={{ flex: 1, paddingRight: 5 }}>
              <TouchableOpacity
                onPress={() => {
                  setIsModalVisible(true);
                  selectionRef.current = "Month";
                }}
              >
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
                      name="dob_month"
                      style={{ color: colors.white, fontSize: 18 }}
                      value={monthInput}
                      defaultValue="Jan"
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
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, paddingHorizontal: 5 }}>
              <TouchableOpacity
                onPress={() => {
                  setIsModalVisible(true);
                  selectionRef.current = "Day";
                }}
              >
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
                      name="dob_day"
                      style={{ color: colors.white, fontSize: 18 }}
                      value={dayInput}
                      defaultValue="01"
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
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, paddingLeft: 5 }}>
              <TextInput
                name="dob_year"
                style={styles.singleLine_Input}
                defaultValue="1990"
              />
            </View>
            <View style={{ flex: 1 }}></View>
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
                borderRadius: 5,
              }}
            >
              <AppText
                style={{ color: colors.white, fontSize: 16, fontWeight: "500" }}
              >
                Select Traveler
              </AppText>
            </View>
          </TouchableOpacity>
        </View>
      </FormProvider>
      <SinglSelectionModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        title={selectionRef.current}
        onSelectFunction={
          selectionRef.current == "Month"
            ? (element) => {
                setMonthInput(element);
                setIsModalVisible(false);
              }
            : (element) => {
                setDayInput(element);
                setIsModalVisible(false);
              }
        }
        list={
          selectionRef.current == "Month"
            ? VenueMonthSelection
            : VenueDaySelection
        }
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
    fontSize: 18,
  },
  errorText: {
    color: colors.red,
    paddingTop: 5,
  },
});

export default Addtraveler;
