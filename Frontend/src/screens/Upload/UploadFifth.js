import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import Ion from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import { Button } from "native-base";
import { TextInput } from "react-native";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { color } from "../../assets/Color";

const UploadFifth = ({ navigation, route }) => {
  const {
    userEmail,
    getUserInfo,
    getAllProduct,
    getMyPosts,
    setRender,
    render,
  } = useContext(AuthContext);

  const { product } = route.params;
  const [price, setPrice] = useState(product ? product?.price : "");
  const [isLoading, setIsLoading] = useState(false);

  const onCancel = () => {
    Alert.alert("Cancel", "Are you sure you want to cancel?", [
      {
        onPress: () => navigation.navigate("Home"),
        style: "OK",
      },
    ]);
  };

  const goNextScreen = async () => {
    // check is category
    const { check, images, coordinate, title, description, product } =
      route.params;
    if (!price) {
      return Alert.alert("Sorry", "Please add price.");
    }

    if (userEmail == null) {
      await getUserInfo();
    }
    const uploadProduct = {
      email: userEmail,
      category: check,
      latitude: coordinate[0],
      longitude: coordinate[1],
      title,
      description,
      price,
      timeStamp: new Date(),
    };

    const productData = new FormData();
    productData.append("productUploadDto", JSON.stringify(uploadProduct));
    setIsLoading(true);
    if (product) {
      const { imageids, ...newObj } = product;

      const updatedValues = {};

      for (const key in uploadProduct) {
        if (uploadProduct[key] !== newObj[key]) {
          updatedValues[key] = uploadProduct[key];
        }
      }

      await axios({
        method: "PATCH",
        url: `http://${process.env.PORT}:8080/product/edituserproductdetails?id=${product.productID}`,
        data: updatedValues,
      })
        .then(async (res) => {
          if (res.data.status) {
            // await getAllProduct();
            console.log("Inside Upload");
            setRender(!render);
            await getMyPosts();
            ToastAndroid.showWithGravityAndOffset(
              "Product update successfully.",
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              50,
              100
            );
            navigation.navigate("MyPost");
          } else {
            ToastAndroid.showWithGravityAndOffset(
              "Error, please upload again.",
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
      for (let i = 0; i < images.images.length; i++) {
        productData.append("images", {
          uri: images.images[i],
          name: "photo.jpeg",
          type: "image/jpeg",
        });
      }

      await axios({
        method: "POST",
        url: `http://${process.env.PORT}:8080/product/productupload`,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: productData,
      })
        .then(async (res) => {
          if (res.data.status) {
            // await getAllProduct();
            setRender(!render);
            await getMyPosts();
            ToastAndroid.showWithGravityAndOffset(
              "Product upload successfully.",
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              50,
              100
            );
            navigation.navigate("Home");
          } else {
            ToastAndroid.showWithGravityAndOffset(
              "Error, please upload again.",
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              50,
              100
            );
          }
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
        <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
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
          <View style={{ top: 20, marginBottom: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Finally, set rent for your product
            </Text>
            <Text style={{ fontSize: 16, marginTop: 10 }}>
              You can set rent for a day, we will calculate it automatically for
              longer durations.{" "}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "white",
              marginTop: 30,
              padding: 10,
              width: "100%",
              marginRight: 10,
              borderRadius: 10,
            }}
          >
            <View style={{ alignItems: "center", marginTop: 10 }}>
              <Button.Group
                isAttached
                colorScheme="blue"
                size="lg"
                borderRadius={10}
              >
                <Button disabled>PKR</Button>
                <TextInput
                  placeholder={product ? product?.price.toString() : "400.."}
                  keyboardType="numeric"
                  value={price.toString()}
                  onChangeText={(text) => setPrice(text)}
                  style={{
                    // backgroundColor: "lightgray",
                    width: "30%",
                    padding: 10,
                    fontSize: 20,
                    borderWidth: 0.3,
                    borderTopRightRadius: 10,
                    borderBottomRightRadius: 10,
                  }}
                />
              </Button.Group>
              <Text style={{ fontSize: 16, marginTop: 10 }}>per day</Text>
              <Text
                style={{
                  fontSize: 14,
                  marginTop: 10,
                  alignItems: "center",
                  width: 250,
                }}
              >
                Your rent per week will be{" "}
                <Text style={{ fontWeight: "bold" }}>
                  {Math.floor(price - price * 0.15)}/day
                </Text>{" "}
                and rent per month will be calculated{" "}
                <Text style={{ fontWeight: "bold" }}>
                  {Math.floor(price - price * 0.15 - price * 0.15)}/day
                </Text>
                .
              </Text>
            </View>
          </View>
          <View style={{ marginTop: 20 }}>
            <TouchableOpacity
              onPress={goNextScreen}
              style={{
                backgroundColor: "#475FCB",
                padding: 20,
                borderRadius: 10,
                marginBottom: 30,
              }}
            >
              {!isLoading ? (
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "700",
                    fontSize: 20,
                    color: "#fff",
                  }}
                >
                  Upload
                </Text>
              ) : (
                <ActivityIndicator size={"small"} color={color.background} />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default UploadFifth;
