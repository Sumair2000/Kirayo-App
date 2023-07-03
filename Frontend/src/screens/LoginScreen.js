import React, { useRef, useState, useContext } from "react";

import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  AsyncStorage,
  ToastAndroid,
  ActivityIndicator,
  Alert,
} from "react-native";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/FontAwesome5";
import LoginSVG from "../assets/images/logo2flat.svg";
import GoogleSVG from "../assets/images/google.svg";
import FacebookSVG from "../assets/images/facebook.svg";

import CustomButton from "../components/CustomButton";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const LoginScreen = ({ navigation }) => {
  const { loginFunction } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [loginWithPhone, setLoginWithPhone] = useState(false);
  const [password, setPassword] = useState("");
  const [hidePass, setHidePass] = useState(true);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [verificationId, setverificationId] = useState(null);
  const recaptchaVerifier = useRef(null);

  const login = async () => {
    console.log("I am in login");
    if (loginWithPhone) {
      if (!phoneNumber || !password) {
        return alert("Please fill all fields.");
      }
      let reg = RegExp(/^03\d{9}$/).test(phoneNumber.toString());
      if (!reg) {
        return alert("Invalid format.");
      }
      setIsLoading(true);
      await axios({
        method: "POST",
        url: `http://${process.env.PORT}:8080/user/login`,
        headers: {
          "content-type": "application/json",
        },
        data: {
          email: null,
          phoneNumber: phoneNumber,
          password: password,
        },
      })
        .then(async (res) => {
          console.log(res.data);
          if (res.data.jwt) {
            console.log("Login Check");
            await loginFunction(res.data);
            navigation.navigate("Home");
            ToastAndroid.showWithGravityAndOffset(
              "Login Successful.",
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              50,
              100
            );
          } else {
            Alert.alert("Error", "Invalid Credentials");
          }
          // setEmail("");
          // setPassword("");
        })
        .catch((err) => {
          console.log(err.message);
          setIsLoading(false);
        });
      setIsLoading(false);
    } else {
      let reg = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email);
      if (!reg) return alert("Invalid email address.");
      if (!email || !password) return alert("Please fill all fields.");
      if (password.length < 5)
        return alert("Password must atleast 5 character");
      setIsLoading(true);
      await axios({
        method: "POST",
        url: `http://${process.env.PORT}:8080/user/login`,
        headers: {
          "content-type": "application/json",
        },
        data: {
          email: email,
          phoneNumber: null,
          password: password,
        },
      })
        .then(async (res) => {
          console.log(res.data);
          if (res.data.jwt) {
            console.log("Login Check.");
            await loginFunction(res.data);
            navigation.navigate("Home");
            ToastAndroid.showWithGravityAndOffset(
              "Login Successful.",
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              50,
              100
            );
          } else {
            Alert.alert("Error", "Invalid Credentials");
          }
          setEmail("");
          setPassword("");
        })
        .catch((err) => {
          console.log(err.message);
          setIsLoading(false);
          setEmail("");
          setPassword("");
        });
      setIsLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView
        style={{
          justifyContent: "center",
          backgroundColor: "#E6EEF0",
          height: "100%",
        }}
      >
        <View style={{ paddingHorizontal: 25 }}>
          <View style={{ alignItems: "center" }}>
            <LoginSVG marginBottom={30} height={90} width={90} />
          </View>

          <Text
            style={{
              alignSelf: "center",
              fontSize: 24,
              fontWeight: "500",
              color: "#333",
              marginBottom: 30,
            }}
          >
            Login
          </Text>
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
              marginBottom: 10,
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
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text
              style={{
                color: "#475FCB",
                fontWeight: "700",
                margin: 10,
                marginBottom: 15,
                alignSelf: "flex-end",
                fontSize: 16,
              }}
            >
              {" "}
              Forgot Password?
            </Text>
          </TouchableOpacity>
          {!isLoading ? (
            <CustomButton label={"Login"} onPress={login} />
          ) : (
            <TouchableOpacity
              style={{
                backgroundColor: "#475FCB",
                padding: 20,
                borderRadius: 10,
                marginBottom: 30,
              }}
            >
              <ActivityIndicator size={20} color="white" />
            </TouchableOpacity>
          )}

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
            <Text>New here?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={{ color: "#475FCB", fontWeight: "700" }}>
                {" "}
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;
