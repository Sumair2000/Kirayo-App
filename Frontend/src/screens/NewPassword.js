import React, { useRef, useState } from "react";

import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/FontAwesome5";
import LoginSVG from "../assets/images/logo2flat.svg";

import CustomButton from "../components/CustomButton";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NewPassword = ({ navigation, route }) => {
  const { email } = route.params;
  const [password, setPassword] = useState("");
  const [hidePass, setHidePass] = useState(true);
  const [hideNewPass, setHideNewPass] = useState(true);
  const [newPassword, setNewPassword] = useState("");

  const resetPassword = () => {
    if (password.length < 5 || newPassword.length < 5)
      return alert("Password must have atleast 5 characters.");

    if (password !== newPassword) return alert("Password does not match.");
    const data = {
      email: email,
      password: password,
    };
    console.log(data);
    axios({
      method: "POST",
      url: `http://${process.env.PORT}:8080/user/forgetpassword`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    })
      .then((res) => {
        if (res.data.status) {
          Alert.alert(
            "Password Changed",
            "Your password has been reset. Please login",
            [
              {
                text: "OK",
                onPress: () => {
                  navigation.navigate("Login");
                },
              },
            ]
          );
        } else {
          Alert.alert("Error", "Error while updating your password");
        }
      })
      .catch((err) => console.log(err.message));
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
              marginBottom: 25,
            }}
          >
            Create a new password
          </Text>
          <Text
            style={{
              alignSelf: "center",
              fontSize: 14,
              fontWeight: "500",
              color: "#333",
              marginBottom: 30,
            }}
          >
            You are going to reset password of your{" "}
            <Text
              style={{
                alignSelf: "right",
                fontSize: 14,
                fontWeight: "bold",
                color: "#475FCB",
                marginBottom: 30,
              }}
            >
              {email}
            </Text>{" "}
            account
          </Text>
          <View
            style={{
              flexDirection: "row",
              borderBottomColor: "#ccc",
              borderBottomWidth: 1,
              paddingBottom: 8,
              marginBottom: 20,
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
                setNewPassword(text);
              }}
              value={newPassword}
              placeholder={"Confirm password"}
              keyboardType={"Password"}
              style={{ flex: 1, paddingVertical: 0 }}
              secureTextEntry={hideNewPass ? true : false}
              autoCapitalize={false}
              autoCorrect={false}
            />
            <TouchableOpacity onPress={() => setHideNewPass(!hideNewPass)}>
              <Icon
                name={hideNewPass ? "eye-slash" : "eye"}
                size={17}
                style={{ marginRight: 10 }}
              />
            </TouchableOpacity>
          </View>
          <CustomButton label={"Reset Password"} onPress={resetPassword} />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default NewPassword;
