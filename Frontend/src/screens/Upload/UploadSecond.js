import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ImageBackground,
} from "react-native";
import React, { useState, useEffect } from "react";
import Ion from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";

import * as ImagePicker from "expo-image-picker";

const UploadSecond = ({ navigation, route }) => {
  const [image, setImage] = useState(null);
  const [pickedImages, setPickedImages] = useState({
    images: [],
  });
  let bs = React.createRef();
  let fall = new Animated.Value(1);

  const onCancel = () => {
    setPickedImages({ images: [] });
    Alert.alert("Cancel", "Are you sure you want to cancel?", [
      {
        onPress: () => navigation.navigate("Home"),
        style: "Ok",
      },
    ]);
  };

  const takePhotoFromCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === true) {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        selectionLimit: 5,
        quality: 1,
      });
      if (!result.canceled) {
        result.assets.map((name) => {
          setPickedImages((prevState) => ({
            images: [...prevState.images, name["uri"]],
          }));
        });
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
    setPickedImages({ images: [] });
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === true) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        selectionLimit: 5,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        result.assets.map((name) => {
          setPickedImages((prevState) => ({
            images: [...prevState.images, name["uri"]],
          }));
        });
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
    <View style={styles.panel}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={takePhotoFromCamera}
      >
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton} onPress={chooseFromLibrary}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
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
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  const goNextScreen = () => {
    const { check } = route.params;
    if (!pickedImages.images) {
      return Alert.alert("Sorry", "Please select images first");
    }
    navigation.navigate("uploadThird", { check: check, images: pickedImages });
    setPickedImages({ images: [] });
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle}></View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#E6EEF0" }}>
      <View>
        <BottomSheet
          ref={bs}
          snapPoints={[330, 0]}
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
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ion name="arrow-back" size={25} />
            </TouchableOpacity>
            <Text style={{ fontSize: 22, fontWeight: "bold" }}>
              Upload Product
            </Text>
            <TouchableOpacity onPress={onCancel}>
              <Entypo name="cross" size={25} />
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 15 }}>
            <Text style={{ fontSize: 18 }}>
              Add or take some photos of your product...
            </Text>
          </View>
          <View style={{ marginTop: 40, alignItems: "center" }}>
            <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
              <View
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 15,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ImageBackground
                  source={{
                    uri: pickedImages && pickedImages?.images[0],
                  }}
                  style={{ height: 150, width: 300 }}
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
                      color="black"
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
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 40,
              paddingHorizontal: 25,
            }}
          >
            <ImageBackground
              source={{
                uri: pickedImages && pickedImages?.images[1],
              }}
              style={{ height: 100, width: 125 }}
              imageStyle={{ borderRadius: 15 }}
            />
            <ImageBackground
              source={{
                uri: pickedImages && pickedImages?.images[2],
              }}
              style={{ height: 100, width: 125 }}
              imageStyle={{ borderRadius: 15 }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 40,
              paddingHorizontal: 25,
            }}
          >
            <ImageBackground
              source={{
                uri: pickedImages && pickedImages?.images[3],
              }}
              style={{ height: 100, width: 125 }}
              imageStyle={{ borderRadius: 15 }}
            />
            <ImageBackground
              source={{
                uri: pickedImages && pickedImages?.images[4],
              }}
              style={{ height: 100, width: 125 }}
              imageStyle={{ borderRadius: 15 }}
            />
          </View>
          <View style={{ marginTop: 90 }}>
            <TouchableOpacity
              onPress={goNextScreen}
              style={{
                backgroundColor: "#475FCB",
                padding: 20,
                borderRadius: 10,
                marginBottom: 30,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "700",
                  fontSize: 20,
                  color: "#fff",
                }}
              >
                Next
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    // elevation: 5,
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

export default UploadSecond;
