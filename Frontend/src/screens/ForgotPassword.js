import React, { useRef, useState } from "react";

import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  AsyncStorage,
  Alert,
} from "react-native";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { firebaseConfig } from "../../config";
import firebase from "firebase/compat/app";
import { sendGridEmail } from "react-native-sendgrid";
import LoginSVG from "../assets/images/logo2flat.svg";

import CustomButton from "../components/CustomButton";
import axios from "axios";

const API_KEY = process.env.REACT_SENDGRID_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL;

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationId, setverificationId] = useState(null);
  const recaptchaVerifier = useRef(null);

  const sendVerification = () => {
    let replacedPhone = "+92" + email.toString().slice(1);
    console.log(replacedPhone);
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
      .verifyPhoneNumber(replacedPhone, recaptchaVerifier.current)
      .then(setverificationId);
    setPhoneNumber("");
  };

  const checkInput = (input) => {
    let regEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(input);
    if (regEmail) {
      return "Email";
    }
  };

  const login = async () => {
    if (!email) return alert("Please enter email address");
    const result = checkInput(email);
    if (result === "Email") {
      await axios({
        method: "GET",
        url: `http://${
          process.env.PORT
        }:8080/user/verification?email=${email}&phonenumber=${null}`,
      }).then((res) => {
        if (res.data.status) {
          let pinCode = Math.floor(100000 + Math.random() * 900000);
          let html = `Your 6 digit PIN Code is ${pinCode}. Please do not share it with anyone.`;
          const sendEmail = sendGridEmail(
            API_KEY,
            email,
            FROM_EMAIL,
            "Reset Password PIN Code",
            html
          );
          sendEmail
            .then((res) => {
              navigation.navigate("Verification", {
                codePin: pinCode ? pinCode : null,
                isPhoneNumber: false,
                phoneNumber: email,
                id: "newPassword",
              });
            })
            .catch((err) => console.log(err));
        } else {
          setEmail("");
          Alert.alert("Error", "Account does not exist");
        }
      });
    } else {
      Alert.alert("Error", "Invalid email address");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView
        style={{
          justifyContent: "center",
          backgroundColor: "#E6EEF0",
          height: "110%",
          marginTop: -70,
        }}
      >
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={firebaseConfig}
        />
        <View style={{ paddingHorizontal: 25 }}>
          <View style={{ alignItems: "center" }}>
            <LoginSVG marginBottom={30} height={90} width={90} />
          </View>

          <Text
            style={{
              alignSelf: "center",
              fontSize: 28,
              fontWeight: "500",
              color: "#333",
              marginBottom: 30,
            }}
          >
            Reset Password
          </Text>
          <Text
            style={{
              alignSelf: "center",
              fontSize: 16,
              fontWeight: "500",
              color: "#333",
              marginBottom: 30,
            }}
          >
            Enter your email address
          </Text>
          <View
            style={{
              flexDirection: "row",
              borderBottomColor: "#ccc",
              borderBottomWidth: 1,
              paddingBottom: 8,
              marginBottom: 25,
            }}
          >
            {
              <MaterialIcons
                name="input"
                size={20}
                color="#475FCB"
                style={{ marginRight: 5 }}
              />
            }
            <TextInput
              onChange={(event) => {
                const { eventCount, target, text } = event.nativeEvent;
                setEmail(text);
              }}
              value={email}
              placeholder="Email address"
              autoCapitalize={false}
              keyboardType="email-address"
              autoCorrect={false}
              style={{ flex: 1, paddingVertical: 0 }}
            />
          </View>

          <CustomButton label={"Send OTP"} onPress={login} />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 30,
          }}
        >
          <Text>Wanna back to login?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{ color: "#475FCB", fontWeight: "700" }}> Login</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default ForgotPassword;
