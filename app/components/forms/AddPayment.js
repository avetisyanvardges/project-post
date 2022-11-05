import React, { useState, useMemo } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Button,
  Text,
  Alert,
  TextInput,
} from "react-native";
import {
  StripeProvider,
  CardField,
  useConfirmPayment,
} from "@stripe/stripe-react-native";
//Configurations
import { colors } from "../../config/theme";
//Components
import Icon from "../svgIcons/Icon";

function AddPayment() {
  const [name, setName] = useState("");
  const [addressCity, setAddressCity] = useState("");
  const [addressCountry, setAddressCountry] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const { confirmPayment, loading } = useConfirmPayment();
  const publishableKey =
    "pk_test_51KK6mRCSA057XPSf0Q0a1easEsB6x8yPPsdMyymmma1ascwWSYAwoRUxaEA79ynWH1VXdtAF2ndz4IE7sdoSiG4N00rd1hi2At";

  const handleSubmit = async () => {
    //Step One: Retrieve Secret Key from the Server
    const clientSecret =
      "sk_test_51KK6mRCSA057XPSf8iVCzESQksGeis0fB99WnOozxsxipFRE7yc4p1Tpgn5GVBJhDeh9Jo3ywTBm4iUQxt0mgl3c00S8rgXKhI";

    //Step Two: Confirm Payment Intent via the client secret and the payment details inputed from the client
    const { error, paymentIntent } = await confirmPayment(clientSecret, {
      type: "Card",
      billingDetails: {
        //addressCity: addressCity,
        //addressCountry: addressCountry,
        name: name,
        //email: email,
        //phone: phone,
      },
    });

    //Step Three: If you were to get an error
    if (error) {
      Alert.alert("Error code: " + error.code, error.message);
      console.log(error.code);
      console.log(error.message);
    } else if (paymentIntent) {
      Alert.alert("Success", "Payment Successful: " + paymentIntent.id);
    }
  };

  return (
    <StripeProvider
      publishableKey={publishableKey}
      merchantIdentifier="merchant.identifier"
    >
      <View
        style={{
          flex: 1,
          marginHorizontal: 5,
        }}
      >
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <TextInput
            autocapitalize="none"
            placeholder="Name on Card"
            placeholderTextColor={colors.grey}
            keyboardType="name-phone-pad"
            onChange={() => setName}
            style={[styles.textField]}
          />
          <TextInput
            autocapitalize="none"
            placeholder="Email"
            placeholderTextColor={colors.grey}
            keyboardType="name-phone-pad"
            onChange={() => setEmail}
            style={styles.textField}
          />
          <TextInput
            autocapitalize="none"
            placeholder="Phone"
            placeholderTextColor={colors.grey}
            keyboardType="name-phone-pad"
            onChange={() => setPhone}
            style={styles.textField}
          />
          <TextInput
            autocapitalize="none"
            placeholder="Address City"
            placeholderTextColor={colors.grey}
            keyboardType="name-phone-pad"
            onChange={() => setAddressCity}
            style={styles.textField}
          />
          <TextInput
            autocapitalize="none"
            placeholder="Address Country"
            placeholderTextColor={colors.grey}
            keyboardType="name-phone-pad"
            onChange={() => setAddressCountry}
            style={styles.textField}
          />
          <CardField
            onCardChange={(cardDetails) => console.log(cardDetails)}
            postalCodeEnabled={true}
            placeholder={{
              number: "4242 4242 4242 4242",
            }}
            cardStyle={{
              backgroundColor: "#FFFFFF",
              textColor: "#000000",
              borderColor: colors.charcoal,
              borderWidth: 1,
              borderRadius: 8,
            }}
            style={styles.cardField}
            onFocus={(focusedField) => {
              console.log("");
            }}
          />
          <Button title="SUBMIT" onPress={handleSubmit} disabled={loading} />
        </ScrollView>
      </View>
    </StripeProvider>
  );
}

const styles = StyleSheet.create({
  cardField: {
    width: "100%",
    height: 50,
    marginVertical: 10,
  },
  textField: {
    width: "100%",
    height: 50,
    fontSize: 18,
    marginBottom: 10,
    paddingLeft: 10,
    borderWidth: 1,
    borderRadius: 5,
    color: colors.black,
    backgroundColor: colors.white,
  },
});

export default AddPayment;
