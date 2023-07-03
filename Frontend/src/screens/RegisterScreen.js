import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  ToastAndroid,
} from "react-native";

import Checkbox from "expo-checkbox";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { firebaseConfig } from "../../config";
import firebase from "firebase/compat/app";
import { sendGridEmail } from "react-native-sendgrid";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/FontAwesome5";

import LoginSVG from "../assets/images/logo2flat.svg";
import GoogleSVG from "../assets/images/google.svg";
import FacebookSVG from "../assets/images/facebook.svg";
import RegistrationSVG from "../assets/images/Registration";

import CustomButton from "../components/CustomButton";
import axios from "axios";

const RegisterScreen = ({ navigation }) => {
  const [showBackData, setShowBackData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [completeModal, setCompleteModal] = useState(true);
  const [checkBoxToggle, setCheckBoxToggle] = useState(false);

  const API_KEY = process.env.REACT_SENDGRID_API_KEY;
  const FROM_EMAIL = process.env.FROM_EMAIL;

  const [email, setEmail] = useState("");
  const [hidePass, setHidePass] = useState(true);
  const [loginWithPhone, setLoginWithPhone] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [verificationId, setverificationId] = useState(null);
  const recaptchaVerifier = useRef(null);
  const [password, setPassword] = useState("");

  const sendVerification = () => {
    let replacedPhone = "+92" + phoneNumber.toString().slice(1);
    console.log(replacedPhone);
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
      .verifyPhoneNumber(replacedPhone, recaptchaVerifier.current)
      .then((res) => {
        setverificationId(res);
        console.log("ver", res);
        navigation.navigate("Verification", {
          codePin: null,
          isPhoneNumber: true,
          phoneNumber: phoneNumber,
          id: res,
          password: password,
        });
        setPhoneNumber("");
        setPassword("");
      })
      .catch((err) => console.log(err.message));
  };

  const registration = async () => {
    sendVerification();
    if (loginWithPhone) {
      if (!phoneNumber || !password) {
        return alert("Please fill all fields.");
      }
      let reg = RegExp(/^03\d{9}$/).test(phoneNumber.toString());
      if (!reg) {
        return alert("Invalid phone number format.");
      }
      if (password.length < 5) {
        return alert("Password must have atleast 5 characters.");
      }
      setIsLoading(true);
      await axios({
        method: "GET",
        url: `http://${
          process.env.PORT
        }:8080/user/verification?email=null&phonenumber=${phoneNumber.toString()}`,
      })
        .then(async (res) => {
          console.log(res.data.status);
          if (!res.data.status) {
            sendVerification();
          } else {
            Alert.alert("Error", "Account already exist");
          }
        })
        .catch((err) => console.log(err.message));

      setIsLoading(false);
    } else {
      let reg = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email);
      if (!reg) {
        return alert("Invalid email address.");
      }
      if (!email || !password) {
        return alert("Please fill all fields.");
      }
      if (password.length < 5) {
        return alert("Password must have atleast 5 characters.");
      }
      setIsLoading(true);
      console.log(email);
      await axios({
        method: "GET",
        url: `http://${process.env.PORT}:8080/user/verification?email=${email}&phonenumber=null`,
      })
        .then((res) => {
          console.log("status : " + res.data.status);
          if (res.data.status === false) {
            let pinCode = Math.floor(100000 + Math.random() * 900000);
            let html = `<p>Your $ digit PIN Code is ${pinCode}. Please do not share it with anyone.</p>`;
            const sendEmail = sendGridEmail(
              API_KEY,
              email,
              FROM_EMAIL,
              "Authentication PIN Code",
              html
            );
            sendEmail
              .then((res) => {
                navigation.navigate("Verification", {
                  codePin: pinCode ? pinCode : null,
                  isPhoneNumber: false,
                  phoneNumber: email,
                  id: null,
                  password: password,
                });
                setIsLoading(false);
              })
              .catch((err) => console.log(err));
            setEmail("");
            setPassword("");
          } else {
            ToastAndroid.showWithGravityAndOffset(
              "Email already registered. Please login",
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              50,
              100
            );
          }
        })
        .catch((err) => console.log(err.message));
      setEmail("");
      setPassword("");
    }
    setIsLoading(false);
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
        {showBackData && (
          <>
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
                Registration
              </Text>
              <View style={{ alignItems: "center" }}>
                <RegistrationSVG marginBottom={30} height={150} width={150} />
              </View>

              {!loginWithPhone ? (
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
                      name="alternate-email"
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
                    placeholder="Email ID"
                    autoCapitalize={false}
                    keyboardType="email-address"
                    autoCorrect={false}
                    style={{ flex: 1, paddingVertical: 0 }}
                  />
                </View>
              ) : (
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
                    <Icon
                      name="mobile-alt"
                      size={20}
                      color="#475FCB"
                      style={{ marginRight: 9, marginLeft: 4 }}
                    />
                  }
                  <TextInput
                    onChange={(event) => {
                      const { eventCount, target, text } = event.nativeEvent;
                      setPhoneNumber(text);
                    }}
                    value={phoneNumber}
                    placeholder="Phone Number (e.g. 030012345667)"
                    autoCapitalize={false}
                    keyboardType="number-pad"
                    autoCorrect={false}
                    style={{ flex: 1, paddingVertical: 0 }}
                  />
                </View>
              )}

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
                  <Ionicons
                    name="ios-lock-closed-outline"
                    size={20}
                    color="#475FCB"
                    style={{ marginRight: 5 }}
                  />
                }
                <TextInput
                  onChange={(event) => {
                    const { eventCount, target, text } = event.nativeEvent;
                    setPassword(text);
                  }}
                  value={password}
                  placeholder={"Password"}
                  keyboardType={"Password"}
                  style={{ flex: 1, paddingVertical: 0 }}
                  secureTextEntry={hidePass ? true : false}
                  autoCapitalize={false}
                  autoCorrect={false}
                />
                <TouchableOpacity onPress={() => setHidePass(!hidePass)}>
                  <Icon
                    name={hidePass ? "eye-slash" : "eye"}
                    size={17}
                    style={{ marginRight: 10 }}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={registration}
                style={{
                  backgroundColor: "#475FCB",
                  padding: 20,
                  borderRadius: 10,
                  marginBottom: 30,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {!isLoading ? (
                    <Text
                      style={{
                        textAlign: "center",
                        fontWeight: "700",
                        fontSize: 16,
                        color: "#fff",
                      }}
                    >
                      Register
                    </Text>
                  ) : (
                    <ActivityIndicator size="small" color="white" />
                  )}
                </View>
              </TouchableOpacity>

              <Text
                style={{ textAlign: "center", color: "#666", marginBottom: 30 }}
              >
                Or, Continue with
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  marginBottom: 30,
                }}
              >
                {/* <TouchableOpacity
              onPress={() => {}}
              style={{
                borderColor: "#ddd",
                borderWidth: 2,
                borderRadius: 10,
                paddingHorizontal: 30,
                paddingVertical: 10,
              }}
            >
              <GoogleSVG height={24} width={24} />
            </TouchableOpacity> */}
                {!loginWithPhone ? (
                  <TouchableOpacity
                    onPress={() => {
                      setLoginWithPhone(true);
                      setPassword("");
                      setEmail("");
                    }}
                    style={{
                      borderColor: "#ddd",
                      borderWidth: 2,
                      borderRadius: 10,
                      paddingHorizontal: 30,
                      paddingVertical: 10,
                    }}
                  >
                    <Icon
                      name="mobile-alt"
                      height={24}
                      width={24}
                      size={25}
                      color="#4D5060"
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      setLoginWithPhone(false);
                      setPassword("");
                      setEmail("");
                    }}
                    style={{
                      borderColor: "#ddd",
                      borderWidth: 2,
                      borderRadius: 10,
                      paddingHorizontal: 30,
                      paddingVertical: 10,
                    }}
                  >
                    <MaterialIcons
                      name="email"
                      height={24}
                      width={24}
                      size={25}
                      color="#4D5060"
                    />
                  </TouchableOpacity>
                )}
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginBottom: 30,
                }}
              >
                <Text>Already have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text style={{ color: "#475FCB", fontWeight: "700" }}>
                    {" "}
                    Login
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={completeModal}
          >
            <SafeAreaView>
              <ScrollView>
                <View style={styles.modalContainer}>
                  <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>Terms and Conditions</Text>
                    <Text style={styles.modalText}>
                      Kirayo is a rental platform that allows users to exchange
                      items on a temporary basis. By using our app, renters and
                      rentees agree to follow our terms and conditions, which
                      include proper communication and payment, timely return of
                      items, and respectful treatment of others. You are also
                      responsible for the condition and maintenance of the items
                      they rent or lend out. Failure to follow these guidelines
                      may result in suspension or termination of account. We
                      encourage all users to report any issues or concerns to
                      our customer support team. By using Kirayo, you
                      acknowledge and accept these terms and conditions.
                    </Text>
                    <View style={styles.checkBox}>
                      <Checkbox
                        style={[styles.checkbox, { height: 20, width: 20 }]}
                        disabled={false}
                        value={checkBoxToggle}
                        onValueChange={(newValue) =>
                          setCheckBoxToggle(newValue)
                        }
                      />
                      <Text style={{ color: "black", fontSize: 20 }}>
                        I agree
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={[
                        styles.containerBotton,
                        {
                          backgroundColor: checkBoxToggle
                            ? "#475FCB"
                            : "#E6EEF0",
                        },
                      ]}
                      disabled={!checkBoxToggle}
                      onPress={() => {
                        setCompleteModal(false);
                        setShowBackData(true);
                      }}
                    >
                      <Text
                        style={{
                          color: checkBoxToggle ? "#E6EEF0" : "#475FCB",
                          fontSize: 17,
                          fontWeight: "bold",
                        }}
                      >
                        Continue
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            </SafeAreaView>
          </Modal>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E6EEF0",
    marginTop: 20,
  },
  modalView: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 20,
    margin: 20,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    marginBottom: 20,
    color: "#475FCB",
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
  },
  modalText: {
    fontSize: 16,
    color: "black",
    textAlign: "justify",
    lineHeight: 25,
  },
  checkBox: {
    flexDirection: "row",
    marginVertical: 30,
    alignItems: "center",
  },
  checkbox: {
    width: 30,
    height: 30,
    marginRight: 20,
  },
  containerBotton: {
    padding: 15,
    borderRadius: 10,
  },
});
export default RegisterScreen;
