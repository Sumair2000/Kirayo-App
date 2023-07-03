import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  SafeAreaView,
} from "react-native";
import UploadFirst from "../screens/Upload/UploadFirst";

const EditProduct = ({ route, navigation }) => {
  const { product } = route.params;

  console.log(product);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#E6EEF0",
      }}
    >
      <UploadFirst edit={true} product={product} navigation={navigation} />
    </SafeAreaView>
  );
};

export default EditProduct;
