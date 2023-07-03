import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Keyboard,
  TextInput,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import Entypo from "react-native-vector-icons/Entypo";
import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";
import { SelectList } from "react-native-dropdown-select-list";

import * as ImagePicker from "expo-image-picker";
import { AuthContext } from "../context/AuthContext";
import moment from "moment";
// import * as Permissions from 'expo-permissions';

const EditProfile = () => {
  const { userEmail, userInfo, dateOfBirth } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState(null);

  const data = [
    { key: "Karachi", value: "Karachi" },
    { key: "Lahore", value: "Lahore" },
    { key: "Islamabad", value: "Islamabad" },
  ];

  let bs = React.createRef();
  let fall = new Animated.Value(1);
  // const takePhotoFromCamera = async () => {
  //   const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

  //   if (permissionResult.granted === true) {
  //     let result = await ImagePicker.launchCameraAsync({
  //       mediaTypes: ImagePicker.MediaTypeOptions.All,
  //       allowsEditing: true,
  //       aspect: [4, 3],
  //       quality: 1,
  //     });
  //     if (!result.canceled) {
  //       setImage(result.assets[0]["uri"]);
  //     }
  //   } else {
  //     Alert.alert(
  //       "Permission Denied",
  //       "You've refused to allow this appp to access your photos!"
  //     );
  //     return;
  //   }
  // };

  // const chooseFromLibrary = async () => {
  //   const permissionResult =
  //     await ImagePicker.requestMediaLibraryPermissionsAsync();

  //   if (permissionResult.granted === true) {
  //     let result = await ImagePicker.launchImageLibraryAsync({
  //       mediaTypes: ImagePicker.MediaTypeOptions.All,
  //       allowsEditing: true,
  //       aspect: [4, 3],
  //       quality: 1,
  //       selectionLimit: 1,
  //     });
  //     if (!result.canceled) {
  //       console.log(result.assets[0].uri);
  //       setImage(result.assets[0]);
  //       bs.current.snapTo(1);
  //     }
  //   } else {
  //     Alert.alert(
  //       "Permission Denied",
  //       "You've refused to allow this appp to access your photos!"
  //     );
  //     return;
  //   }
  // };

  // const renderInner = () => (
  //   <View style={imageUploaderStyles.panel}>
  //     <View style={{ alignItems: "center" }}>
  //       <Text style={imageUploaderStyles.panelTitle}>Upload Photo</Text>
  //       <Text style={imageUploaderStyles.panelSubtitle}>
  //         Choose Your Profile Picture
  //       </Text>
  //     </View>
  //     <TouchableOpacity
  //       style={imageUploaderStyles.panelButton}
  //       onPress={takePhotoFromCamera}
  //     >
  //       <Text style={imageUploaderStyles.panelButtonTitle}>Take Photo</Text>
  //     </TouchableOpacity>
  //     <TouchableOpacity
  //       style={imageUploaderStyles.panelButton}
  //       onPress={chooseFromLibrary}
  //     >
  //       <Text style={imageUploaderStyles.panelButtonTitle}>
  //         Choose From Library
  //       </Text>
  //     </TouchableOpacity>
  //     <TouchableOpacity
  //       style={{
  //         padding: 13,
  //         borderRadius: 10,
  //         backgroundColor: "grey",
  //         color: "white",
  //         alignItems: "center",
  //         marginVertical: 7,
  //       }}
  //       onPress={() => bs.current.snapTo(1)}
  //     >
  //       <Text style={imageUploaderStyles.panelButtonTitle}>Cancel</Text>
  //     </TouchableOpacity>
  //   </View>
  // );

  // const renderHeader = () => (
  //   <View style={imageUploaderStyles.header}>
  //     <View style={imageUploaderStyles.panelHeader}>
  //       <View style={imageUploaderStyles.panelHandle}></View>
  //     </View>
  //   </View>
  // );

  console.log(dateOfBirth);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView
        style={{ backgroundColor: "#E6EEF0", paddingHorizontal: 30, flex: 1 }}
      >
        {/* <BottomSheet
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
        > */}
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity activeOpacity={1}>
            <View
              style={{
                height: 150,
                width: 100,
                borderRadius: 15,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ImageBackground
                source={{
                  uri: userInfo?.image
                    ? `http://${process.env.PORT}:8080/user/image?id=${userInfo?.image}`
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
                ></View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
          <Text style={{ marginTop: 10, fontSize: 20, fontWeight: "bold" }}>
            {userEmail}
          </Text>
        </View>
        <View
          style={{
            marginTop: 30,
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
            placeholder={userInfo?.fullname ? userInfo?.fullname : "Full Name"}
            autoCapitalize={false}
            keyboardType="ascii-capable"
            autoCorrect={false}
            style={{ flex: 1, paddingVertical: 0 }}
          />
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
            placeholder={
              dateOfBirth
                ? moment(dateOfBirth).format("DD-MM-YYYY")
                : "Date of Birth"
            }
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
            placeholder={userInfo?.city ? userInfo?.city : "City"}
            boxStyles={{ borderColor: "#475FCB" }}
            dropdownStyles={{ borderColor: "#475FCB" }}
          />
        </View>
        <View style={{ marginHorizontal: 30, marginTop: 20 }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#475FCB",
              padding: 15,
              borderRadius: 10,
              marginBottom: 30,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontWeight: "700",
                fontSize: 18,
                color: "white",
              }}
            >
              Update
            </Text>
          </TouchableOpacity>
        </View>
        {/* </Animated.View> */}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const imageUploaderStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
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

export default EditProfile;
