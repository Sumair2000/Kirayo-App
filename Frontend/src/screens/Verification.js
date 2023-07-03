import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import CustomButton from "../components/CustomButton";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { firebaseConfig } from "../../config";
import firebase from "firebase/compat/app";
import VerifyIcon from "../assets/images/verifyLogo.svg";
import { sendGridEmail } from "react-native-sendgrid";

const Verification = ({ route, navigation }) => {
  const { codePin, isPhoneNumber, phoneNumber, id, password } = route.params;
  const API_KEY = process.env.REACT_SENDGRID_API_KEY;
  const FROM_EMAIL = process.env.FROM_EMAIL;

  const [email, setEmail] = useState(null);
  const [pinCode, setPinCode] = useState({
    pin1: "",
    pin2: "",
    pin3: "",
    pin4: "",
    pin5: "",
    pin6: "",
  });
  const [resend, setResend] = useState(false);
  const [emailCode, setEmailCode] = useState(null);
  const pin1Ref = useRef(null);
  const pin2Ref = useRef(null);
  const pin3Ref = useRef(null);
  const pin4Ref = useRef(null);
  const pin5Ref = useRef(null);
  const pin6Ref = useRef(null);

  useEffect(() => {
    pin1Ref.current.focus();
  }, []);
  const recaptchaVerifier = useRef(null);
  const confirmCode = (verificationId, code) => {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      code
    );
    firebase
      .auth()
      .signInWithCredential(credential)
      .then((res) => {
        console.log(res);
        if (codePin === "newPassword") {
          navigation.navigate("NewPassword", { email: phoneNumber });
        } else {
          navigation.navigate("profileSetup", {
            email: phoneNumber,
            password: password,
            isPhoneNumber: isPhoneNumber,
          });
        }

        setPinCode({
          pin1: "",
          pin2: "",
          pin3: "",
          pin4: "",
          pin5: "",
          pin6: "",
        });
      })
      .catch((err) => console.log(err));
  };

  const submitCode = () => {
    // const { codePin, isPhoneNumber, phoneNumber, id } = route.params;
    if (isPhoneNumber) {
      let temp =
        pinCode.pin1.toString() +
        pinCode.pin2.toString() +
        pinCode.pin3.toString() +
        pinCode.pin4.toString() +
        pinCode.pin5.toString() +
        pinCode.pin6.toString();
      console.log(id);
      // if (id == null) {
      //   return Alert.alert("Warning", "Please resend the code.");
      // }
      confirmCode(id, temp);
    } else {
      let temp =
        pinCode.pin1.toString() +
        pinCode.pin2.toString() +
        pinCode.pin3.toString() +
        pinCode.pin4.toString() +
        pinCode.pin5.toString() +
        pinCode.pin6.toString();
      let newpin = codePin;
      if (resend) {
        newpin = emailCode;
      }
      if (newpin.toString() === temp) {
        if (id === "newPassword") {
          navigation.navigate("NewPassword", { email: phoneNumber });
        } else {
          navigation.navigate("profileSetup", {
            email: phoneNumber,
            password: password,
            isPhoneNumber: isPhoneNumber,
          });
        }

        setPinCode({
          pin1: "",
          pin2: "",
          pin3: "",
          pin4: "",
          pin5: "",
          pin6: "",
        });
        setEmailCode(null);
      } else {
        alert("Pin code is not correct.");
      }
    }
  };

  const resendCode = () => {
    // const { codePin, isPhoneNumber, phoneNumber, id } = route.params;
    console.log(isPhoneNumber);
    if (isPhoneNumber) {
      let replacedPhone = "+92" + phoneNumber.toString().slice(1);
      const phoneProvider = new firebase.auth.PhoneAuthProvider();
      phoneProvider
        .verifyPhoneNumber(replacedPhone, recaptchaVerifier.current)
        .then(id);
      setPinCode({
        pin1: "",
        pin2: "",
        pin3: "",
        pin4: "",
        pin5: "",
        pin6: "",
      });
    } else {
      setResend(true);
      let pinCode = Math.floor(100000 + Math.random() * 900000);
      setEmailCode(pinCode);
      let html = `<p>Your $ digit PIN Code is ${pinCode}. Please do not share it with anyone.</p>`;
      const sendEmail = sendGridEmail(
        API_KEY,
        phoneNumber,
        FROM_EMAIL,
        "Authentication PIN Code",
        html
      );
      sendEmail
        .then((res) => {
          alert("Email has been sent.");
          setPinCode({
            pin1: "",
            pin2: "",
            pin3: "",
            pin4: "",
            pin5: "",
            pin6: "",
          });
          setResend(false);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView
        style={{
          height: "100%",
          justifyContent: "center",
          backgroundColor: "#E6EEF0",
        }}
      >
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={firebaseConfig}
        />
        <View style={{ paddingHorizontal: 25 }}>
          <Text
            style={{
              alignSelf: "center",
              fontSize: 24,
              fontWeight: "500",
              color: "#333",
              marginBottom: 30,
            }}
          >
            Verification
          </Text>
          <View style={{ alignItems: "center" }}>
            <VerifyIcon marginBottom={30} height={150} width={150} />
          </View>
          <Text
            style={{
              alignSelf: "center",
              fontSize: 14,
              fontWeight: "500",
              color: "#333",
              marginBottom: 10,
            }}
          >
            We have send the verification code to your{" "}
            {isPhoneNumber ? "phone number" : "email"}
          </Text>
          <Text
            style={{
              alignSelf: "center",
              fontSize: 14,
              fontWeight: "500",
              color: "blue",
              marginBottom: 50,
            }}
            onPress={() => navigation.goBack()}
          >
            {phoneNumber}
          </Text>
          <View
            style={{
              flex: 0.6,
              justifyContent: "space-evenly",
              flexDirection: "row",
            }}
          >
            <TextInput
              autoComplete="off"
              ref={pin1Ref}
              value={pinCode.pin1}
              onChangeText={(text) => {
                setPinCode((pre) => {
                  return { ...pre, pin1: text };
                });
                if (text != "") pin2Ref.current.focus();
              }}
              maxLength={1}
              keyboardType={"numeric"}
              style={{
                backgroundColor: "#E6EEF0",
                color: "#475FCB",
                fontWeight: "600",
                alignSelf: "center",
                textAlign: "center",
                justifyContent: "center",
                fontSize: 20,
                height: 50,
                width: 50,
                borderRadius: 15,
                borderWidth: 0.5,
                borderColor: "#475FCB",
                marginBottom: 10,
              }}
            />
            <TextInput
              autoComplete="off"
              ref={pin2Ref}
              value={pinCode.pin2}
              onChangeText={(text) => {
                setPinCode((pre) => {
                  return { ...pre, pin2: text };
                });
                if (text != "") pin3Ref.current.focus();
              }}
              maxLength={1}
              keyboardType={"numeric"}
              style={{
                backgroundColor: "#E6EEF0",
                color: "#475FCB",
                fontWeight: "600",
                alignSelf: "center",
                textAlign: "center",
                justifyContent: "center",
                fontSize: 20,
                height: 50,
                width: 50,
                borderRadius: 15,
                borderWidth: 0.5,
                borderColor: "#475FCB",
                marginBottom: 10,
              }}
            />
            <TextInput
              autoComplete="off"
              ref={pin3Ref}
              value={pinCode.pin3}
              onChangeText={(text) => {
                setPinCode((pre) => {
                  return { ...pre, pin3: text };
                });
                if (text != "") pin4Ref.current.focus();
              }}
              maxLength={1}
              keyboardType={"numeric"}
              style={{
                backgroundColor: "#E6EEF0",
                color: "#475FCB",
                fontWeight: "600",
                alignSelf: "center",
                textAlign: "center",
                justifyContent: "center",
                fontSize: 20,
                height: 50,
                width: 50,
                borderRadius: 15,
                borderWidth: 0.5,
                borderColor: "#475FCB",
                marginBottom: 10,
              }}
            />
            <TextInput
              autoComplete="off"
              ref={pin4Ref}
              value={pinCode.pin4}
              onChangeText={(text) => {
                setPinCode((pre) => {
                  return { ...pre, pin4: text };
                });
                if (text != "") pin5Ref.current.focus();
              }}
              maxLength={1}
              keyboardType={"numeric"}
              style={{
                backgroundColor: "#E6EEF0",
                color: "#475FCB",
                fontWeight: "600",
                alignSelf: "center",
                textAlign: "center",
                justifyContent: "center",
                fontSize: 20,
                height: 50,
                width: 50,
                borderRadius: 15,
                borderWidth: 0.5,
                borderColor: "#475FCB",
                marginBottom: 10,
              }}
            />
            <TextInput
              ref={pin5Ref}
              value={pinCode.pin5}
              onChangeText={(text) => {
                setPinCode((pre) => {
                  return { ...pre, pin5: text };
                });
                if (text != "") pin6Ref.current.focus();
              }}
              maxLength={1}
              keyboardType={"numeric"}
              style={{
                backgroundColor: "#E6EEF0",
                color: "#475FCB",
                fontWeight: "600",
                alignSelf: "center",
                textAlign: "center",
                justifyContent: "center",
                fontSize: 20,
                height: 50,
                width: 50,
                borderRadius: 15,
                borderWidth: 0.5,
                borderColor: "#475FCB",
                marginBottom: 10,
              }}
            />
            <TextInput
              autoComplete="off"
              ref={pin6Ref}
              value={pinCode.pin6}
              onChangeText={(text) => {
                setPinCode((pre) => {
                  return { ...pre, pin6: text };
                });
              }}
              maxLength={1}
              keyboardType={"numeric"}
              style={{
                backgroundColor: "#E6EEF0",
                color: "#475FCB",
                fontWeight: "600",
                alignSelf: "center",
                textAlign: "center",
                justifyContent: "center",
                fontSize: 20,
                height: 50,
                width: 50,
                borderRadius: 15,
                borderWidth: 0.5,
                borderColor: "#475FCB",
                marginBottom: 10,
              }}
            />
          </View>
          <View style={{ marginTop: 50 }}></View>
          <CustomButton label={"Submit"} onPress={submitCode} />

          <Text
            style={{
              textAlign: "center",
              color: "#666",
              marginBottom: 30,
              textDecorationLine: "underline",
            }}
            onPress={resendCode}
          >
            Resend Code
          </Text>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Verification;
