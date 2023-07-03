import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import ProductList from "../ProductList";
import { Title } from "react-native-paper";
import MyProducts from "../../components/MyProducts";
import { ActivityIndicator } from "react-native-paper";
import axios from "axios";

const MyPost = ({ navigation }) => {
  const { userToken, userEmail, getUserInfo, getMyPosts, myProductsData } =
    useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  const getMyProduct = async () => {
    setIsLoading(true);
    if (!userEmail) {
      await getUserInfo();
    }
    await getMyPosts();

    setIsLoading(false);
  };

  useEffect(() => {
    getMyProduct();
  }, []);

  console.log(myProductsData);
  return userToken ? (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#E6EEF0" }}>
      <Title
        style={{ textAlign: "center", fontWeight: "bold", marginBottom: 5 }}
      >
        My Products
      </Title>
      {!isLoading ? (
        <View marginBottom="25%">
          {myProductsData ? (
            <MyProducts
              navigation={navigation}
              products={myProductsData}
              saved={false}
            />
          ) : (
            <Text style={{ alignSelf: "center", fontSize: 16 }}>
              No products
            </Text>
          )}
        </View>
      ) : (
        <SafeAreaView
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View>
            <ActivityIndicator size={"large"} color={"#41416E"} />
          </View>
          <Title>Loading, Please wait...</Title>
        </SafeAreaView>
      )}
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
        Please Login to see your posts
      </Text>
    </SafeAreaView>
  );
};

export default MyPost;
