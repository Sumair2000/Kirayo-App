import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../src/screens/NavigationScreen/Home";
import Chat from "../src/screens/NavigationScreen/Chat";
import Setting from "../src/screens/NavigationScreen/Setting";
import MyPost from "../src/screens/NavigationScreen/MyPost";
import Entypo from "react-native-vector-icons/Entypo";
import IonIcon from "react-native-vector-icons/Ionicons";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import UploadFirst from "../src/screens/Upload/UploadFirst";

import HomeStack from "./HomeStack";
const Tab = createBottomTabNavigator();

const ScreenNavigator = () => {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            position: "absolute",
            bottom: 10,
            left: 21,
            right: 21,
            elevation: 0,
            backgroundColor: "#FEFCFF",
            borderRadius: 10,
            height: 55,
            ...styles.shadow,
          },
        }}
      >
        <Tab.Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: 0,
                }}
              >
                <Entypo
                  name="home"
                  style={{
                    width: 23,
                    height: 23,
                    color: focused ? "#475FCB" : "#41416E",
                  }}
                  size={23}
                />
                <Text
                  style={{
                    color: focused ? "#475FCB" : "#41416E",
                    fontSize: 12,
                    top: 3,
                  }}
                >
                  Home
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="MyPost"
          component={MyPost}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: 0,
                }}
              >
                <MaterialIcon
                  name="post-outline"
                  style={{
                    width: 23,
                    height: 23,
                    color: focused ? "#475FCB" : "#41416E",
                  }}
                  size={23}
                />
                <Text
                  style={{
                    color: focused ? "#475FCB" : "#41416E",
                    fontSize: 12,
                    top: 3,
                  }}
                >
                  My Post
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="AdPost"
          component={UploadFirst}
          options={{
            tabBarStyle: {
              display: "none",
            },
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: -25,
                  left: 0,
                }}
              >
                <AntDesign
                  name="pluscircle"
                  style={{
                    color: focused ? "#475FCB" : "#41416E",
                  }}
                  size={50}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Chat"
          component={Chat}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: 0,
                }}
              >
                <Entypo
                  name="chat"
                  style={{
                    width: 23,
                    height: 23,
                    color: focused ? "#475FCB" : "#41416E",
                  }}
                  size={23}
                />
                <Text
                  style={{
                    color: focused ? "#475FCB" : "#41416E",
                    fontSize: 12,
                    top: 3,
                  }}
                >
                  Chat
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Setting"
          component={Setting}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: 0,
                }}
              >
                <IonIcon
                  name="settings"
                  style={{
                    width: 23,
                    height: 23,
                    color: focused ? "#475FCB" : "#41416E",
                  }}
                  size={23}
                />
                <Text
                  style={{
                    color: focused ? "#475FCB" : "#41416E",
                    fontSize: 12,
                    top: 3,
                  }}
                >
                  Setting
                </Text>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "grey",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default ScreenNavigator;
