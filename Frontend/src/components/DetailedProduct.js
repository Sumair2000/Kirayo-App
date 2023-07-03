import {
  View,
  SafeAreaView,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Text, Heading, Divider, Button, useToast } from "native-base";

import React, { useState, useEffect } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ratings from "./Ratings";
import Entypo from "react-native-vector-icons/Entypo";
import Fontisto from "react-native-vector-icons/Fontisto";
import products from "../assets/Products";
import Reviews from "./Reviews";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import RenterProfile from "./RenterProfile";
import moment from "moment";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { height, width } = Dimensions.get("window");

const DetailedProduct = ({ route, navigation }) => {
  const toast = useToast();
  const { userEmail, getUserInfo, render } = useContext(AuthContext);

  const { product, saved } = route.params;
  console.log("Detailed Product", userEmail, product.imageids[0]);
  const [displayPrice, setDisplayPrice] = useState(product.price);

  const [isSaved, setIsSaved] = useState(product?.is_Saved);
  // const [currentLocation, setCurrentLocation] = useState();
  const [mapRegion, setMapRegion] = useState({
    latitude: product?.latitude ? parseFloat(product?.latitude) : 25.053109,
    longitude: product?.longitude ? parseFloat(product?.longitude) : 67.121006,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.00421,
  });
  // const userLocation = async () => {
  //   let { status } = await Location.requestBackgroundPermissionsAsync();
  //   if (status !== "granted") {
  //     alert("Permission denied");
  //     return;
  //   }
  //   let location = await Location.getCurrentPositionAsync({
  //     enableHighAccuracy: true,
  //   });
  //   setCurrentLocation({
  //     latitude: location.coords.latitude,
  //     longitude: location.coords.longitude,
  //     latitudeDelta: 0.0922,
  //     longitudeDelta: 0.0421,
  //   });
  // };

  const [buttonGroup, setButtonGroup] = useState("");

  const handleSaveProduct = async () => {
    console.log(product.productID, product.is_Saved);
    if (!product.is_Saved) {
      await axios({
        method: "POST",
        url: `http://${process.env.PORT}:8080/product/savedproduct`,
        data: {
          email: userEmail,
          productId: product.productID,
          localDateTime: new Date(),
        },
      })
        .then((res) => {
          console.log("Inside save product");
          if (res.data.status) {
            setIsSaved(!isSaved);
            toast.show({
              description: "Product saved!",
              type: "assertive",
              tintColor: "black",
              backgroundColor: "green.500",
            });
          }
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
    }
  };

  useEffect(() => {
    const checkUserEmail = async () => {
      if (userEmail == null) {
        console.log("in effect");
        await getUserInfo();
      }
    };
    // userLocation();
    checkUserEmail();
  }, [render]);

  const [data, SetData] = useState(
    product?.imageids.map((val) => {
      return `http://${process.env.PORT}:8080/product/image?id=${val}`;
    })
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const renderItem = ({ item, index }) => {
    return (
      <View
        key={index}
        style={{
          width: width,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "90%",
            height: "90%",
            borderRadius: 10,
          }}
        >
          <Image
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "white",
              borderRadius: 10,
            }}
            source={{
              uri: item ? item : "https://dummyimage.com/640x360/fff/aaa",
            }}
            resizeMode={"contain"} // cover or contain its upto you view look
          />
        </View>
      </View>
    );
  };

  const handleReserveProduct = async () => {
    if ((await AsyncStorage.getItem("userToken")) == null) {
      Alert.alert("Login Required", "Please login to continue");
    } else {
      navigation.navigate("Reserve", {
        product: { ...product, displayPrice },
      });
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        top: -10,
        backgroundColor: "#E6EEF0",
      }}
    >
      <ScrollView
        automaticallyAdjustKeyboardInsets={true}
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: 10 }}
      >
        <View
          style={{
            height: "15%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FlatList
            data={data}
            key={data}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            onScroll={(e) => {
              const x = e.nativeEvent.contentOffset.x;
              setCurrentIndex((x / width).toFixed(0));
            }}
            horizontal
            renderItem={renderItem}
          />
        </View>

        <View
          style={{
            top: -5,
            flexDirection: "row",
            width: width,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {data.map((item, index) => {
            return (
              <View
                style={{
                  width: currentIndex == index ? 10 : 5,
                  height: currentIndex == index ? 5 : 5,
                  borderRadius: currentIndex == index ? 5 : 4,
                  backgroundColor: currentIndex == index ? "#475FCB" : "gray",
                  marginLeft: 5,
                }}
              ></View>
            );
          })}
        </View>

        <View
          style={{
            paddingHorizontal: 20,
          }}
        >
          <View
            style={{
              marginTop: 10,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Heading size={"md"} color="#4D5060" bold isTruncated>
              {product?.title.length > 30
                ? product?.title.slice(0, 30) + "..."
                : product?.title}
            </Heading>
            {userEmail !== product?.email && !isSaved && !saved && (
              <TouchableOpacity onPress={handleSaveProduct}>
                <FontAwesome
                  name={isSaved ? "heart" : "heart-o"}
                  size={24}
                  color="gray"
                />
              </TouchableOpacity>
            )}
          </View>
          <Ratings
            value={product.rating}
            text={product?.rating.toString()}
            total={product?.totalreviews}
          />
          {/* <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 10,
              marginTop: 20,
            }}
          >
            <Entypo name="address" size={16} color="#777777" />
            <Text fontSize={14} mt={0} w="full" isTruncated>
              {" "}
              XYZ
            </Text>
          </View> */}
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 10,
              margin: 3,
            }}
          >
            <Fontisto name="date" size={14} color="#777777" />
            <Text fontSize={14} mt={0} w="full" isTruncated>
              {" "}
              {moment(product?.timeStamp).fromNow()}
            </Text>
          </View>
          <Divider my={4} thickness={1.5} bg="#EC8932" />
          <Heading size={"md"} color="#4D5060">
            Description
          </Heading>
          <Text fontSize={14} mt={1} w="full">
            {product.description.replace(/\\n/g, "\n")}.
          </Text>
          <Divider my={4} thickness={1.5} bg="#EC8932" />
          <Heading size={"md"} color="#4D5060" mb={3}>
            Location
          </Heading>
          <View style={{ marginBottom: 5 }}>
            <MapView
              style={{
                height: 200,
                borderRadius: 10,
                borderColor: "black",
                borderWidth: 0.2,
              }}
              region={mapRegion}
              userInterfaceStyle="light"
              provider="google"
              loadingEnabled={true}
              // maxZoomLevel={12}
            >
              <Marker coordinate={mapRegion} title="Marker" />
              {/* <Marker coordinate={currentLocation} title="Marker" /> */}
            </MapView>
          </View>
          <Divider my={4} thickness={1.5} bg="#EC8932" />
          <Heading size={"md"} color="#4D5060" mb={3}>
            Rating and Reviews
          </Heading>
          <Reviews id={product?.productID} />
          {product.email !== userEmail && (
            <>
              <Divider my={4} thickness={1.5} bg="#EC8932" />
              <RenterProfile
                navigation={navigation}
                email={product.email}
                currentUser={product.email == userEmail}
              />
            </>
          )}
          <View style={{ marginTop: 250 }}>
            {/* <Text fontSize={22} mt={0} isTruncated w="full" color={"#475FCB"}>
              PKR 300{" "}
              <Text fontSize={18} mt={0} isTruncated w="full" color={"black"}>
                for a {buttonGroup}
              </Text>
            </Text> */}
          </View>
        </View>
      </ScrollView>
      {userEmail != product.email && (
        <View
          style={{
            paddingHorizontal: 0,
            backgroundColor: "white",
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            marginBottom: -10,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.27,

            elevation: 10,
          }}
        >
          <Text
            fontSize={22}
            mt={1}
            mb={-4}
            ml={5}
            isTruncated
            w="full"
            color={"#475FCB"}
          >
            PKR {displayPrice ? displayPrice : product.price}
            <Text style={{ fontSize: 15 }} color={"black"}>
              /day
            </Text>
          </Text>
          <View
            style={{
              display: "flex",
              marginTop: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 15,
            }}
          >
            <Button.Group
              isAttached
              colorScheme="gray"
              size="lg"
              borderRadius={10}
              borderWidth={0.5}
            >
              <Button
                variant={buttonGroup === "" ? "solid" : "outline"}
                onPress={() => {
                  setButtonGroup("");
                  setDisplayPrice(product.price);
                }}
              >
                Day
              </Button>
              <Button
                variant={buttonGroup === "Week" ? "solid" : "outline"}
                onPress={() => {
                  setButtonGroup("Week");
                  setDisplayPrice(
                    Math.floor(product.price - product.price * 0.15)
                  );
                }}
              >
                Week
              </Button>
              <Button
                variant={buttonGroup === "Month" ? "solid" : "outline"}
                onPress={() => {
                  setButtonGroup("Month");
                  setDisplayPrice(
                    Math.floor(
                      product.price -
                        product.price * 0.15 -
                        product.price * 0.15
                    )
                  );
                }}
              >
                Month
              </Button>
            </Button.Group>
            <Button
              borderRadius={10}
              backgroundColor="#475FCB"
              size={"lg"}
              width={100}
              onPress={handleReserveProduct}
            >
              Reserve
            </Button>
          </View>
        </View>
      )}
      {/* <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
          <TouchableOpacity
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
                fontSize: 16,
                color: "#fff",
              }}
            >
              Reserve
            </Text>
          </TouchableOpacity>
        </View> */}
    </SafeAreaView>
  );
};

export default DetailedProduct;
