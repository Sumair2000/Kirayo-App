import { View, Text } from "react-native";
import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./Navigation";
import ScreenNavigator from "./ScreenNavigator";
import { AuthContext } from "../src/context/AuthContext";
import { NativeBaseProvider } from "native-base";

const AppNav = () => {
  const { userToken } = useContext(AuthContext);
  return (
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
  );
};

export default AppNav;
