import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useContext } from "react";
import Ion from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import Categories from "../../components/Categories";
import { AuthContext } from "../../context/AuthContext";

const UploadFirst = ({ navigation, edit, product }) => {
  const { userToken } = useContext(AuthContext);

  const [check, setCheck] = useState(edit ? product?.category : null);

  const goNextScreen = () => {
    if (!check) {
      return Alert.alert("Sorry", "Please select category first");
    }
    if (edit) {
      navigation.navigate("uploadThird", {
        check: check,
        images: null,
        product: product,
      });
    } else {
      navigation.navigate("uploadSecond", { check: check });
    }
  };

  const onCancel = () => {
    Alert.alert("Cancel", "Are you sure you want to cancel?", [
      {
        onPress: () => navigation.navigate("Home"),
        style: "Ok",
      },
    ]);
  };
  return userToken ? (
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
          <TouchableOpacity>
            <Ion name="arrow-back" size={25} style={{ color: "lightgrey" }} />
          </TouchableOpacity>
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>
            Upload Product
          </Text>
          <TouchableOpacity onPress={onCancel}>
            <Entypo name="cross" size={25} />
          </TouchableOpacity>
        </View>
        <View style={{ top: 20, marginBottom: 20 }}>
          <Text style={{ fontSize: 18 }}>
            In which category your product lies best?
          </Text>
        </View>
        <View style={{ top: 20 }}>
          <Categories setCheck={setCheck} check={check} />
        </View>
        <View style={{ marginTop: 60 }}>
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
  ) : (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#E6EEF0",
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
        Please Login to upload products
      </Text>
      <TouchableOpacity
        style={{ marginTop: 10 }}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={{ fontSize: 16, color: "blue" }}>
          Click to go home screen
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default UploadFirst;
