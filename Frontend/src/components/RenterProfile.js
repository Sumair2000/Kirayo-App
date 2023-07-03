import { View, ActivityIndicator } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Heading, HStack, VStack, Text } from "native-base";
import { Avatar } from "react-native-paper";
import Ratings from "./Ratings";
import IonIcons from "react-native-vector-icons/Ionicons";
import { db } from "../../config";
import uuid from "react-native-uuid";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const RenterProfile = ({ navigation, email, currentUser }) => {
  const [userProfile, setUserProfile] = useState("");
  const { userEmail } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const getUserProfile = async () => {
    setIsLoading(true);
    console.log("Renter");
    await axios({
      method: "GET",
      url: `http://${process.env.PORT}:8080/user/getuserdetails?email=${email}`,
    })
      .then((res) => {
        console.log("User renter profile.", userEmail);
        setUserProfile(res.data);
      })
      .catch((err) => console.log(err.message));
    setIsLoading(false);
  };

  useEffect(() => {
    getUserProfile();
  }, []);
  const handleChat = () => {
    // navigation.navigate("Message", {
    //   name: data.item.userName,
    //   user: data.item,
    // })

    // db.collection("users")
    //   .doc(email)
    //   .collection("myUsers")
    //   .doc(userEmail)
    //   .set({
    //     name: userProfile.userName,
    //     email: email,
    //     messageText: "",
    //     createdAt: new Date(),
    //   })
    //   .then((res) => {console.log("success")
    navigation.navigate("Message", {
      name: userProfile.userName,
      user: email,
    });
    // })
    // .catch((err) => console.log(err));
  };
  return (
    <>
      {isLoading ? (
        <ActivityIndicator
          animating={isLoading}
          size={"large"}
          color={"#475FCB"}
        />
      ) : (
        <>
          <Heading size={"md"} color="#4D5060" mb={3}>
            Renter
          </Heading>
          <View
            style={{
              backgroundColor: "white",
              padding: 10,
              width: "100%",
              marginRight: 10,
              borderRadius: 10,
            }}
          >
            <HStack alignItems={"center"}>
              <Avatar.Image
                source={{
                  uri: !userProfile?.imageID
                    ? "https://dummyimage.com/640x360/fff/aaa"
                    : `http://${process.env.PORT}:8080/user/image?id=${userProfile?.imageID}`,
                }}
                size={50}
                backgroundColor="green"
              />
              <VStack ml={2}>
                <Text style={{ fontSize: 16 }}>
                  {userProfile?.userName?.length > 16
                    ? userProfile?.userName.slice(0, 16) + "..."
                    : userProfile?.userName}
                </Text>
                <Ratings value={4.5} text={4.5} />
              </VStack>
              {!currentUser && userEmail && (
                <IonIcons
                  style={{ marginLeft: 100 }}
                  size={28}
                  name="ios-chatbox-ellipses"
                  color={"#475FCB"}
                  onPress={handleChat}
                />
              )}
            </HStack>
          </View>
        </>
      )}
    </>
  );
};

export default RenterProfile;
