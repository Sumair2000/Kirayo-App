import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Platform,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  TextInput,
  Alert,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Keyboard,
  ToastAndroid,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import LoginSVG from "../assets/images/logo2flat.svg";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { SelectList } from "react-native-dropdown-select-list";
import CustomButton from "../components/CustomButton";

import axios from "axios";

import BottomSheet from "reanimated-bottom-sheet";
import Animated, { proc } from "react-native-reanimated";
import { color } from "../assets/Color";

const ProfileSetup = ({ route, navigation }) => {
  let bs = React.createRef();
  let fall = new Animated.Value(1);

  const { email, password, isPhoneNumber } = route.params;
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const takePhotoFromCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === true) {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        setImage(result.assets[0]["uri"]);
      }
    } else {
      Alert.alert(
        "Permission Denied",
        "You've refused to allow this appp to access your photos!"
      );
      return;
    }
  };

  const chooseFromLibrary = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === true) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        selectionLimit: 1,
      });
      if (!result.canceled) {
        console.log(result.assets[0].uri);
        setImage(result.assets[0]);
        bs.current.snapTo(1);
      }
    } else {
      Alert.alert(
        "Permission Denied",
        "You've refused to allow this appp to access your photos!"
      );
      return;
    }
  };

  const renderInner = () => (
    <View style={imageUploaderStyles.panel}>
      <View style={{ alignItems: "center" }}>
        <Text style={imageUploaderStyles.panelTitle}>Upload Photo</Text>
        <Text style={imageUploaderStyles.panelSubtitle}>
          Choose Your Profile Picture
        </Text>
      </View>
      <TouchableOpacity
        style={imageUploaderStyles.panelButton}
        onPress={takePhotoFromCamera}
      >
        <Text style={imageUploaderStyles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={imageUploaderStyles.panelButton}
        onPress={chooseFromLibrary}
      >
        <Text style={imageUploaderStyles.panelButtonTitle}>
          Choose From Library
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          padding: 13,
          borderRadius: 10,
          backgroundColor: "grey",
          color: "white",
          alignItems: "center",
          marginVertical: 7,
        }}
        onPress={() => bs.current.snapTo(1)}
      >
        <Text style={imageUploaderStyles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View style={imageUploaderStyles.header}>
      <View style={imageUploaderStyles.panelHeader}>
        <View style={imageUploaderStyles.panelHandle}></View>
      </View>
    </View>
  );

  const data = [
    { key: "Karachi", value: "Karachi" },
    { key: "Lahore", value: "Lahore" },
    { key: "Islamabad", value: "Islamabad" },
  ];

  const createAnAccount = async () => {
    if ((!name || !date || !phone || !city, !phone || !image))
      return Alert.alert("Error", "Please fill the required fields correctly.");

    setIsLoading(true);
    if (isPhoneNumber) {
      console.log(phone);
      let reg = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(phone);
      if (!reg) {
        setIsLoading(false);
        return alert("Invalid email address.");
      }
      console.log(email, phone, password, name, city, date);
      const data = new FormData();
      const d = {
        userCredentialsDto: {
          email: phone,
          phoneNumber: email,
          password: password,
        },
        userDetailsDto: {
          fullName: name,
          city: city,
          dob: date,
          image: null,
        },
      };

      console.log(d);

      data.append("signupDto", JSON.stringify(d));
      data.append("image", {
        uri: image.uri,
        name: "photo.jpeg",
        type: "image/jpeg",
      });
      await axios({
        method: "POST",
        url: `http://${process.env.PORT}:8080/user/signup`,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: data,
      })
        .then((res) => {
          console.log(res.data);
          if (res.data.status) {
            navigation.navigate("Login");
            ToastAndroid.showWithGravityAndOffset(
              "Account registered. Please login now",
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              50,
              100
            );
          } else {
            // ToastAndroid.show(res.data.message);
            ToastAndroid.showWithGravityAndOffset(
              "Account already exist.",
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              50,
              100
            );
          }
        })
        .catch((err) => console.log(err.message));
      setIsLoading(false);
    } else {
      console.log(email, phone, password, name, city, date);
      let reg = RegExp(/^03\d{9}$/).test(phone.toString());
      if (!reg) {
        return alert("Invalid format.");
      }
      const data = new FormData();
      const d = {
        userCredentialsDto: {
          email: email,
          phoneNumber: phone,
          password: password,
        },
        userDetailsDto: {
          fullName: name,
          city: city,
          dob: date,
          image: null,
        },
      };

      data.append("signupDto", JSON.stringify(d));
      data.append("image", {
        uri: image.uri,
        name: "photo.jpeg",
        type: "image/jpeg",
      });
      await axios({
        method: "POST",
        url: `http://${process.env.PORT}:8080/user/signup`,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: data,
      })
        .then((res) => {
          console.log("Inside register");
          if (res.data.status) {
            navigation.navigate("Login");
            ToastAndroid.showWithGravityAndOffset(
              "Account registered. Please login now",
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              50,
              100
            );
          } else {
            // ToastAndroid.show(res.data.message);
            ToastAndroid.showWithGravityAndOffset(
              "Account already exist.",
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              50,
              100
            );
          }
          setIsLoading(false);
        })
        .catch((err) => console.log(err.message));
      setIsLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#E6EEF0",
        }}
      >
        <BottomSheet
          ref={bs}
          snapPoints={[340, 0]}
          renderContent={renderInner}
          renderHeader={renderHeader}
          initialSnap={1}
          callbackNode={fall}
          enabledGestureInteraction={true}
        />
        <Animated.View
          style={{
            margin: 20,
            opacity: Animated.add(0.3, Animated.multiply(fall, 1)),
          }}
        >
          <View style={{ paddingHorizontal: 30, marginTop: 20 }}>
            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 26,
                  fontWeight: "500",
                  color: "black",
                  marginBottom: 20,
                }}
              >
                Profile Setup
              </Text>
              <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
                <View
                  style={{
                    height: 100,
                    width: 100,
                    borderRadius: 15,
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 30,
                  }}
                >
                  <ImageBackground
                    source={{
                      uri: image
                        ? image?.uri
                        : "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png",
                    }}
                    style={{ height: 100, width: 100 }}
                    imageStyle={{ borderRadius: 15 }}
                  >
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Icon
                        name="camera"
                        size={35}
                        color="#fff"
                        style={{
                          opacity: 0.7,
                          alignItems: "center",
                          justifyContent: "center",
                          borderColor: "#fff",
                          borderRadius: 10,
                          borderWidth: 1,
                        }}
                      />
                    </View>
                  </ImageBackground>
                </View>
              </TouchableOpacity>
            </View>
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
                <FontAwesome
                  name="user-o"
                  size={20}
                  color="#475FCB"
                  style={{ marginRight: 5 }}
                />
              }
              <TextInput
                onChange={(event) => {
                  const { eventCount, target, text } = event.nativeEvent;
                  setName(text);
                }}
                value={name}
                placeholder="Full Name"
                autoCapitalize={false}
                keyboardType="ascii-capable"
                autoCorrect={false}
                style={{ flex: 1, paddingVertical: 0 }}
              />
            </View>
            {!isPhoneNumber ? (
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
                    name="local-phone"
                    size={20}
                    color="#475FCB"
                    style={{ marginRight: 5 }}
                  />
                }
                <TextInput
                  onChange={(event) => {
                    const { eventCount, target, text } = event.nativeEvent;
                    setPhone(text);
                  }}
                  value={phone}
                  placeholder="Phone Number"
                  autoCapitalize={false}
                  keyboardType="phone-pad"
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
                    setPhone(text);
                  }}
                  value={phone}
                  placeholder="Email Address"
                  autoCapitalize={false}
                  keyboardType="ascii-capable"
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
                <MaterialIcons
                  name="date-range"
                  size={20}
                  color="#475FCB"
                  style={{ marginRight: 5 }}
                />
              }
              <TextInput
                onChange={(event) => {
                  const { eventCount, target, text } = event.nativeEvent;
                  setDate(text);
                }}
                value={date}
                placeholder="Date of birth (YYYY-MM-DD)"
                autoCapitalize={false}
                keyboardType="ascii-capable"
                autoCorrect={false}
                style={{ flex: 1, paddingVertical: 0 }}
              />
            </View>
            <View style={{ marginBottom: 25 }}>
              <SelectList
                setSelected={(val) => setCity(val)}
                data={data}
                search={false}
                maxHeight={150}
                placeholder="City"
                boxStyles={{ borderColor: "#475FCB" }}
                dropdownStyles={{ borderColor: "#475FCB" }}
              />
            </View>
            {!isLoading ? (
              <CustomButton
                label={"Create account"}
                onPress={createAnAccount}
              />
            ) : (
              <TouchableOpacity
                style={{
                  backgroundColor: color.primary,
                  padding: 20,
                  borderRadius: 10,
                  marginBottom: 30,
                }}
              >
                <ActivityIndicator size={20} color={color.background} />
              </TouchableOpacity>
            )}
          </View>
        </Animated.View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const imageUploaderStyles = StyleSheet.create({
  uploadBtnContainer: {
    opacity: 0.7,
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "lightgrey",
    width: "100%",
    height: "25%",
  },
  uploadBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#FF6347",
    alignItems: "center",
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    paddingTop: 20,
  },
  header: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: "#475FCB",
    color: "white",
    alignItems: "center",
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "black",
    paddingBottom: 7,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
});

export default ProfileSetup;
