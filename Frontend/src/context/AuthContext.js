import { View, Text } from "react-native";
import React, { useState, createContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import axios from "axios";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState([]);
  const [userEmail, setUserEmail] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [myProductsData, setMyProductsData] = useState([]);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [render, setRender] = useState(true);

  const loginFunction = (data) => {
    setIsLoading(true);
    const token = jwtDecode(data?.jwt);
    console.log("login Token", data?.jwt);
    setUserInfo(token?.UserDetails);
    setUserEmail(token?.sub);
    setUserToken(data?.jwt);
    console.log(data.dob);
    setDateOfBirth(data?.dob);
    AsyncStorage.setItem("userInfo", JSON.stringify(token?.UserDetails));
    AsyncStorage.setItem("userToken", JSON.stringify(data?.jwt));
    setIsLoading(false);
    setRender(!render);
  };

  const logoutFunction = () => {
    setIsLoading(true);
    setUserToken(null);
    setUserInfo([]);
    setUserEmail(null);
    AsyncStorage.clear();
    setIsLoading(false);
    getAllProduct();
    setRender(!render);
  };

  const getUserInfo = async () => {
    try {
      if ((await AsyncStorage.getItem("userToken")) !== null) {
        const token = jwtDecode(await AsyncStorage.getItem("userToken"));

        setUserInfo(token?.UserDetails);
        setUserEmail(token?.sub);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let userToken = await AsyncStorage.getItem("userToken");
      let userInfo = await AsyncStorage.getItem("userInfo");
      setUserToken(userToken);
      setUserInfo(userInfo);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getMyPosts = async () => {
    console.log("get my posts", userEmail);
    await axios({
      method: "GET",
      url: `http://${process.env.PORT}:8080/product/getuserproducts?email=${userEmail}`,
    })
      .then((res) => {
        setMyProductsData(res.data.productsResponse);
      })
      .catch((err) => console.log(err.message));
  };

  const getAllProduct = async () => {
    console.log(process.env.PORT);
    console.log("all products email", userEmail);
    setIsLoading(true);
    setAllProducts([]);
    if (await AsyncStorage.getItem("userToken")) {
      await getUserInfo();
      console.log("Email not null.");
      await axios({
        method: "GET",
        url: `http://${process.env.PORT}:8080/product/getallproducts?email=${userEmail}`,
      })
        .then((res) => {
          setAllProducts([]);
          console.log("inside get all product with not null");
          console.log(res.data);
          setAllProducts(res.data);
          setIsLoading(false);
        })
        .catch((err) => console.log(err.message));
    } else {
      console.log("Email null");
      await axios({
        method: "GET",
        url: `http://${process.env.PORT}:8080/product/getallproducts?email=null`,
      })
        .then((res) => {
          console.log("Inside all product with null.");
          setAllProducts(res.data);
          setIsLoading(false);
        })
        .catch((err) => console.log(err.message));
    }
  };

  useEffect(() => {
    isLoggedIn();
    getAllProduct();
  }, [render]);

  return (
    <AuthContext.Provider
      value={{
        loginFunction,
        logoutFunction,
        isLoading,
        userToken,
        userInfo,
        userEmail,
        setUserEmail,
        setUserInfo,
        getUserInfo,
        allProducts,
        getAllProduct,
        myProductsData,
        getMyPosts,
        setRender,
        render,
        dateOfBirth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
