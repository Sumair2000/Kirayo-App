import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ScrollView,
  TextInput,
  Platform,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useContext } from "react";
import Tools from "../../assets/categories/Vector.svg";
import Equipment from "../../assets/categories/Vector1.svg";
import Appliances from "../../assets/categories/Vector4.svg";
import Apparel from "../../assets/categories/Vector3.svg";
import Footwear from "../../assets/categories/Vector2.svg";
import Kitchenware from "../../assets/categories/Vector5.svg";
import Furniture from "../../assets/categories/Vector6.svg";
import Others from "../../assets/categories/Vector7.svg";
import Computing from "../../assets/categories/Group.svg";
import CategoryButton from "../../components/CategoryButton";
import ProductCard from "../../components/ProductCard";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { color } from "../../assets/Color.js";
import { AuthContext } from "../../context/AuthContext";
import moment from "moment";
import { Title } from "react-native-paper";
import { RefreshControl } from "react-native";
import { useState } from "react";
import axios from "axios";

const Home = ({ navigation }) => {
  const { allProducts, getAllProduct, isLoading, userEmail } =
    useContext(AuthContext);

  const [searchText, setSearchText] = useState("");
  const icons = {
    Tools: Tools,
    Equipment: Equipment,
    Appliances: Appliances,
    Apparel: Apparel,
    Footwear: Footwear,
    Kitchenware: Kitchenware,
    Furniture: Furniture,
    Computing,
    Others: Others,
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  const handleSearch = async () => {
    if (!userEmail) {
      await axios({
        method: "GET",
        url: `http://${process.env.PORT}:8080/product/getaproductsbytitle?email=null&title=${searchText}`,
      })
        .then((res) => {
          console.log("Inside search with null");
          navigation.navigate("CategoriesProduct", {
            category: searchText,
            products: res.data.productsResponse,
            search: true,
          });
          setSearchText("");
        })
        .catch((err) => console.log(err.message));
    } else {
      await axios({
        method: "GET",
        url: `http://${process.env.PORT}:8080/product/getaproductsbytitle?email=${userEmail}&title=${searchText}`,
      })
        .then((res) => {
          console.log("Inside search");
          navigation.navigate("CategoriesProduct", {
            category: searchText,
            products: res.data.productsResponse,
            search: true,
          });
          setSearchText("");
        })
        .catch((err) => console.log(err.message));
    }
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getAllProduct();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: color.background,
        paddingHorizontal: 10,
      }}
    >
      <StatusBar
        barStyle={Platform.OS == "android" ? "light-content" : "dark-content"}
      />

      <View style={{ marginBottom: 15, paddingHorizontal: 10 }}>
        <View style={style.inputContainer}>
          <MaterialIcon name="search" size={24} onPress={handleSearch} />
          <TextInput
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
            placeholder="Search anything from anywhere"
            style={{ color: "grey", fontSize: 16, marginLeft: 10 }}
          />
        </View>
      </View>
      <View style={{ paddingHorizontal: 20, marginBottom: 10 }}>
        <Text style={{ fontSize: 14, fontWeight: "normal", marginBottom: 10 }}>
          Categories
        </Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {Object.keys(icons).map((item, key) => (
            <>
              <CategoryButton
                key={key}
                Icon={icons[item]}
                IconName={item}
                navigation={navigation}
              />
            </>
          ))}
        </ScrollView>
      </View>
      {isLoading ? (
        <SafeAreaView
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View>
            <ActivityIndicator size={"large"} color={"#41416E"} />
          </View>
          <Title>Loading, Please wait...</Title>
        </SafeAreaView>
      ) : (
        <>
          <View style={{ paddingHorizontal: 10, marginBottom: 70 }}>
            <ScrollView
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              showsVerticalScrollIndicator={false}
              style={{ height: "70%" }}
            >
              <ProductCard
                products={allProducts.productsResponse}
                navigation={navigation}
              />
            </ScrollView>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  inputContainer: {
    height: 45,
    width: "100%",
    backgroundColor: "white",
    borderRadius: 99,
    elevation: 10,
    top: 10,
    flexDirection: "row",
    paddingHorizontal: 20,
    alignItems: "center",
    shadowOpacity: 0.1,
    shadowColor: "gray",
  },
});

export default Home;
