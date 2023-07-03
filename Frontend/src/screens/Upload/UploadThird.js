import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import Ion from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const UploadThird = ({ navigation, route }) => {
  const [mapRegion, setMapRegion] = useState({
    latitude: 24.8698,
    longitude: 67.0483,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [isLoading, setIsLoading] = useState(true);

  const userLocation = async () => {
    setIsLoading(true);
    let { status } = await Location.requestBackgroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission denied");
      return;
    }
    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    });
    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
    setIsLoading(false);
  };

  const goNextScreen = () => {
    if (!mapRegion) {
      return Alert.alert("Sorry", "Please select location first");
    }
    const { check, images, product } = route.params;
    if (product) {
      navigation.navigate("uploadFourth", {
        check,
        images,
        coordinate: [product?.latitude, product?.longitude],
        product: product,
      });
    } else {
      navigation.navigate("uploadFourth", {
        check,
        images,
        coordinate: [mapRegion.latitude, mapRegion.longitude],
      });
    }
  };
  const onCancel = () => {
    Alert.alert("Cancel", "Are you sure you want to cancel?", [
      {
        onPress: () => navigation.navigate("Home"),
        style: "OK",
      },
    ]);
  };

  // useEffect(() => {
  //   userLocation();
  // }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#E6EEF0",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 20,
          margin: 10,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ion name="arrow-back" size={25} />
        </TouchableOpacity>
        <Text style={{ fontSize: 22, fontWeight: "bold" }}>Upload Product</Text>
        <TouchableOpacity onPress={onCancel}>
          <Entypo name="cross" size={25} />
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 15, paddingHorizontal: 20, marginBottom: 15 }}>
        <Text style={{ fontSize: 18 }}>Where your product is located?</Text>
      </View>
      <View style={{ paddingHorizontal: 20 }}>
        <MapView
          style={{
            height: 400,
            borderRadius: 0.4,
            borderWidth: 0.3,
            borderColor: "black",
          }}
          region={mapRegion}
          provider="google"
        >
          <Marker
            coordinate={mapRegion}
            title="you location"
            draggable={true}
            onDragStart={(e) =>
              console.log("Drag Start", e.nativeEvent.coordinate)
            }
            onDragEnd={(e) => {
              setMapRegion({
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              });
            }}
          />
        </MapView>
      </View>
      <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
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
    </SafeAreaView>
  );
};

export default UploadThird;
