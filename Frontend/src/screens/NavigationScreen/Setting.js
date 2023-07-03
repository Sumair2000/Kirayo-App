import {
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Share,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
  Title,
  Avatar,
  Caption,
  Text,
  TouchableRipple,
} from "react-native-paper";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { AuthContext } from "../../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import { color } from "../../assets/Color";

const Setting = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);

  const {
    logoutFunction,
    userToken,
    userInfo,
    userEmail,
    setUserEmail,
    setUserInfo,
    getUserInfo,
  } = useContext(AuthContext);

  const userLoggedIn = userToken;

  const shareWithFriends = async () => {
    try {
      const result = await Share.share({
        message:
          "React Native | A framework for building native apps using React",
        url: "https://www.kirayo.com/",
        title: "Kirayo App",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        console.log(userEmail);
        await getUserInfo();

        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <>
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
        <SafeAreaView style={styles.container}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginHorizontal: 30,
              top: 20,
            }}
          >
            <Text style={{ fontSize: 22, fontWeight: "bold" }}>
              {userLoggedIn ? "Profile Setting" : "Setting"}
            </Text>
            {userLoggedIn && (
              <Icon
                onPress={() => navigation.navigate("EditProfile")}
                name="account-edit"
                size={30}
              />
            )}
          </View>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 20 }}>
              <Avatar.Image
                source={{
                  uri: userLoggedIn
                    ? `http://${process.env.PORT}:8080/user/image?id=${userInfo?.image}`
                    : "https://dummyimage.com/640x360/fff/aaa",
                }}
                size={80}
              />
              <View style={{ marginLeft: 20 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  {userLoggedIn ? (
                    <Title
                      style={[styles.title, { marginBottom: 5, marginTop: 10 }]}
                    >
                      {userInfo?.fullname
                        ? userInfo?.fullname
                        : userInfo?.fullname?.slice(0, 14)}
                      {userInfo?.fullname?.length > 13 && "...."}
                    </Title>
                  ) : (
                    <Title
                      style={[styles.title, { marginBottom: 5, marginTop: 10 }]}
                    >
                      Login in
                    </Title>
                  )}
                  {/* {userLoggedIn && <MaterialIcon name="verified-user" size={25} style={{color: "green"}} />} */}
                </View>

                {!userLoggedIn && (
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Login")}
                  >
                    <Caption style={[styles.caption, { color: "#EC8932" }]}>
                      Login in to your account
                    </Caption>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
          {userLoggedIn && (
            <>
              <View style={styles.userInfoSection}>
                <View style={styles.row}>
                  <Icon name="email" size={20} color="#777777" />
                  <Text style={{ color: "#777777", marginLeft: 20 }}>
                    {/* {JSON.parse(userInfo).emailphonenumber} */}
                    {userEmail}
                    {/* {userInfo?.email
                  ? userInfo?.email
                  : JSON.parse(userInfo)?.email} */}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Icon name="map-marker-radius" size={20} color="#777777" />
                  <Text style={{ color: "#777777", marginLeft: 20 }}>
                    {/* {JSON.parse(userInfo).city} */}
                    {userInfo?.city ? userInfo?.city : userInfo?.city}
                  </Text>
                </View>
              </View>
              <View
                style={{ borderTopWidth: 0.5, top: -10, color: "black" }}
              ></View>
              <View style={styles.menuWrapper}>
                <TouchableRipple onPress={() => navigation.navigate("Request")}>
                  <View style={styles.menuItem}>
                    <MaterialCommunityIcons
                      name="list-status"
                      color={color.primary}
                      size={25}
                    />
                    <Text style={styles.menuItemText}>Reservations</Text>
                  </View>
                </TouchableRipple>
              </View>
              <View style={styles.menuWrapper}>
                <TouchableRipple
                  onPress={() => navigation.navigate("SavedProduct")}
                >
                  <View style={styles.menuItem}>
                    <Icon
                      name="heart-outline"
                      color={color.primary}
                      size={25}
                    />
                    <Text style={styles.menuItemText}>Your favourites</Text>
                  </View>
                </TouchableRipple>
              </View>
              <View style={styles.menuWrapper}>
                <TouchableRipple
                  onPress={() => navigation.navigate("MyReviews")}
                >
                  <View style={styles.menuItem}>
                    <MaterialIcons
                      name="rate-review"
                      color={color.primary}
                      size={25}
                    />
                    <Text style={styles.menuItemText}>My Reviews</Text>
                  </View>
                </TouchableRipple>
              </View>
            </>
          )}

          <View style={styles.menuWrapper}>
            <TouchableRipple onPress={shareWithFriends}>
              <View style={styles.menuItem}>
                <Icon name="email-outline" color={color.primary} size={25} />
                <Text style={styles.menuItemText}>
                  Invite friends to kirayo
                </Text>
              </View>
            </TouchableRipple>
          </View>
          <View
            style={{
              borderBottomWidth: 0.3,
              borderTopWidth: 0.3,
              borderBottomColor: "black",
              borderTopColor: "black",
            }}
          >
            <TouchableRipple
              onPress={() => {
                userLoggedIn ? logoutFunction() : navigation.navigate("Login");
              }}
            >
              <View style={styles.menuItem}>
                <Icon name="logout-variant" color={color.secondary} size={25} />
                <Text style={styles.menuItemText}>
                  {userLoggedIn ? "Sign Out" : "Log In"}
                </Text>
              </View>
            </TouchableRipple>
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6EEF0",
  },
  userInfoSection: {
    top: 20,
    paddingHorizontal: 30,
    marginBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
    color: "#777777",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrapper: {
    marginVertical: 0,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
});
