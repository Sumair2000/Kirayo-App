import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import Ion from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const UploadFourth = ({ navigation, route }) => {
  const { product } = route.params;
  const [title, setTitle] = useState(product ? product?.title : "");
  const [description, setDescription] = useState(
    product ? product?.description.replace(/\\n/g, "\n") : ""
  );

  const onCancel = () => {
    Alert.alert("Cancel", "Are you sure you want to cancel?", [
      {
        onPress: () => navigation.navigate("Home"),
        style: "OK",
      },
    ]);
  };

  const goNextScreen = async () => {
    const { check, images, coordinate } = route.params;
    if (!title || !description) {
      return Alert.alert("Sorry", "Please add title and description");
    }
    const desc = description.replace(/\n/g, "\\n");

    if (product) {
      navigation.navigate("uploadFifth", {
        check,
        images,
        coordinate,
        title: title,
        description: desc,
        product: product,
      });
    } else {
      navigation.navigate("uploadFifth", {
        check,
        images,
        coordinate,
        title: title,
        description: desc,
      });
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
        <View style={{ paddingHorizontal: 25, top: 10 }}>
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
            <Text style={{ fontSize: 20 }}>
              Now, add a catchy title and appropriately detailed description for
              your product...
            </Text>
          </View>
          <Text style={{ marginTop: 20, fontSize: 18 }}>Title</Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: 15,
              borderBottomWidth: 0.5,
              paddingBottom: 8,
              marginBottom: 25,
            }}
          >
            <TextInput
              onChange={(event) => {
                const { eventCount, target, text } = event.nativeEvent;
                setTitle(text);
              }}
              value={title}
              maxLength={40}
              placeholder="For e.g. Black formal shoes..."
              autoCapitalize={false}
              keyboardType="ascii-capable"
              autoCorrect={false}
              style={{ flex: 1, paddingVertical: 0, fontSize: 16 }}
            />
          </View>
          <Text style={{ marginTop: 20, fontSize: 18 }}>Description</Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: 15,
              borderBottomWidth: 0.5,
              paddingBottom: 8,
              marginBottom: 25,
            }}
          >
            <TextInput
              onChange={(event) => {
                const { eventCount, target, text } = event.nativeEvent;
                setDescription(text);
              }}
              value={description}
              placeholder="For e.g. Slightly used Cow Leather Size 43/10"
              autoCapitalize={false}
              multiline={true}
              keyboardType="ascii-capable"
              autoCorrect={false}
              style={{ flex: 1, paddingVertical: 0, fontSize: 16 }}
            />
          </View>
          <View style={{ marginTop: 100 }}>
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
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default UploadFourth;
