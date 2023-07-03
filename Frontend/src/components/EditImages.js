import React, { useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  SafeAreaView,
  ImageBackground,
  Alert,
} from "react-native";
import { useToast } from "native-base";
import UploadFirst from "../screens/Upload/UploadFirst";
import { color } from "../assets/Color";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import * as ImagePicker from "expo-image-picker";

const EditImages = ({ route, navigation }) => {
  const { product } = route.params;
  const { getMyPosts, setRender, render } = useContext(AuthContext);
  const toast = useToast();

  const [EditCheck, setEditCheck] = useState("");

  // console.log(product);

  const handleEditImage = async (id) => {
    console.log(product.productID, id);

    if (!image) {
      return Alert.alert("Empty", "Please select image");
    }
    const data = new FormData();
    data.append("id", product.productID);
    data.append("imageId", id);
    data.append("images", image);
    await axios({
      method: "PUT",
      url: `http://${process.env.PORT}:8080/product/image/editproductimages`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: data,
    })
      .then((res) => {
        console.log(res.data);
        toast.show({
          description: "Product Updated!",
          type: "assertive",
          tintColor: "black",
          backgroundColor: "green.500",
        });
      })
      .catch((err) => {
        console.log(err.message);
        toast.show({
          description: "Error, Please try again.",
          type: "assertive",
          tintColor: "black",
          backgroundColor: "red.500",
        });
      });
  };

  const handleDeleteImage = (id) => {
    console.log(id);
    Alert.alert(
      "Confirmation",
      "Are you sure you want to delete?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await axios({
              method: "DELETE",
              url: `http://${process.env.PORT}:8080/product/image/deleteproductimage?id=${id}`,
            })
              .then(async (res) => {
                console.log(res.data);
                setRender(!render);
                await getMyPosts();

                toast.show({
                  description: "Product Deleted!",
                  type: "assertive",
                  tintColor: "black",
                  backgroundColor: "green.500",
                });
              })
              .catch((err) => {
                console.log(err.message);
                toast.show({
                  description: "Error, Please try again.",
                  type: "assertive",
                  tintColor: "black",
                  backgroundColor: "red.500",
                });
              });
          },
        },
      ],
      { cancelable: true }
    );
  };

  const [image, setImage] = useState(null);
  let bs = React.createRef();
  let fall = new Animated.Value(1);

  const takePhotoFromCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === true) {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        selectionLimit: 1,
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
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        selectionLimit: 1,
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

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle}></View>
      </View>
    </View>
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: color.background,
      }}
    >
      <BottomSheet
        ref={bs}
        snapPoints={[440, 0]}
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
        {EditCheck === "" && (
          <View style={styles.container}>
            <Text
              style={{ fontSize: 18, fontWeight: "bold", marginBottom: 20 }}
            >
              Select an option:
            </Text>
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#2196F3",
                  borderRadius: 8,
                  paddingVertical: 12,
                  paddingHorizontal: 24,
                  marginBottom: 16,
                }}
                onPress={() => setEditCheck("editImage")}
              >
                <Text
                  style={{
                    color: "#FFFFFF",
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  Edit Images
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "#2196F3",
                  borderRadius: 8,
                  paddingVertical: 12,
                  paddingHorizontal: 24,
                  marginBottom: 16,
                }}
                onPress={() => setEditCheck("editProduct")}
              >
                <Text
                  style={{
                    color: "#FFFFFF",
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  Edit Product
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {EditCheck === "editImage" && (
          <>
            <View style={{ marginTop: 40, alignItems: "center" }}>
              <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
                <View
                  style={{
                    height: 100,
                    width: 100,
                    borderRadius: 15,
                    marginBottom: 30,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ImageBackground
                    source={{
                      uri: image
                        ? image
                        : "https://dummyimage.com/640x360/fff/aaa",
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
            {product?.imageids?.map((image) => (
              <View key={image.id} style={styles.imageContainer}>
                <Image
                  source={{
                    uri: `http://${process.env.PORT}:8080/product/image?id=${image}`,
                  }}
                  style={styles.image}
                />
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[styles.button, { backgroundColor: "#4CAF50" }]}
                    onPress={() => handleEditImage(image)}
                  >
                    <Text style={styles.buttonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      { backgroundColor: color.secondary },
                    ]}
                    onPress={() => handleDeleteImage(image)}
                  >
                    <Text style={styles.buttonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </>
        )}
        {EditCheck === "editProduct" && (
          <UploadFirst edit={true} product={product} navigation={navigation} />
        )}
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    marginBottom: 10,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: "cover",
    borderRadius: 20,
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    top: 5,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
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

export default EditImages;
