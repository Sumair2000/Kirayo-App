import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../src/screens/NavigationScreen/Home";
import CategoriesProduct from "../src/screens/CategoriesProduct";
import { color } from "../src/assets/Color";
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: color.background,
        },
      }}
      initialRouteName="Home"
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="CategoriesProduct"
        category={"Hello"}
        component={CategoriesProduct}
        options={({ route }) => ({
          headerShown: true,
          headerShadowVisible: false,
          title: route.params.category,
          headerBackTitleVisible: false,
        })}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
