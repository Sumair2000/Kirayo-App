import { View, Text, SafeAreaView, ActivityIndicator } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import MyProducts from "../components/MyProducts";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { color } from "../assets/Color";
// import products from '../assets/Products'

const SavedProduct = ({ navigation }) => {
  const { userEmail, getAllProduct } = useContext(AuthContext);
  const [products, setProducts] = useState([]);

  const [isLoading, setisLoading] = useState(true);
  const getUserSavedProduct = async () => {
    console.log("Inside Saved Product");
    setisLoading(true);
    await axios({
      method: "GET",
      url: `http://${process.env.PORT}:8080/product/savedproduct/getusersavedproducts?email=${userEmail}`,
    })
      .then((res) => {
        console.log("Saved Product.", userEmail);
        setProducts(res.data);
        setisLoading(false);
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    getUserSavedProduct();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#E6EEF0" }}>
      {isLoading ? (
        <ActivityIndicator animating size={"large"} color={color.primary} />
      ) : (
        <MyProducts
          navigation={navigation}
          products={products.savedProductResponses}
          saved={true}
        />
      )}
    </SafeAreaView>
  );
};

export default SavedProduct;
