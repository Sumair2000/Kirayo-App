import {
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Title, Avatar } from "react-native-paper";

import {
  Box,
  Center,
  HStack,
  Image,
  Pressable,
  VStack,
  Text,
  View,
  Button,
} from "native-base";
import { db } from "../../../config.js";
import moment from "moment";

const Chat = ({ navigation }) => {
  const { userToken, userEmail, getUserInfo } = useContext(AuthContext);

  const [messages, setMessages] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const getAllUsers = async () => {
    console.log("User chats");
    if (!userEmail) await getUserInfo();
    setIsLoading(true);
    db.collection("users")
      .doc(userEmail)
      .collection("myUsers")
      .onSnapshot({
        next: (querySnapshot) => {
          const data = querySnapshot.docs.map((snap) => ({
            ...snap.data(),
            createdAt: snap.data().createdAt.toDate(),
          }));
          setMessages(data);
        },
        error: (err) => console.log(err),
      });
    setIsLoading(false);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const renderItem = (data) => (
    <TouchableOpacity
      activeOpacity={1}
      style={{ paddingHorizontal: 20 }}
      onPress={() =>
        navigation.navigate("Message", {
          name: data.item.name,
          user: data.item.email,
        })
      }
    >
      <Box ml={0} mb={2}>
        <HStack
          alignItems={"center"}
          bg={"white"}
          shadow={1}
          rounded={10}
          overflow={"hidden"}
          paddingTop={3}
          paddingBottom={3}
        >
          <Center w="25%">
            <Avatar.Text size={50} label={data.item.name.slice(0, 1)} />
          </Center>
          <VStack w="70%" px={0}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginRight: 10,
              }}
            >
              <Text isTruncated color={"black"} bold fontSize={14}>
                {data.item.name.length > 16
                  ? data.item.name.slice(0, 16) + "..."
                  : data.item.name}
              </Text>
              <Text fontSize={12}>{moment(data.item.createdAt).fromNow()}</Text>
            </View>

            <Text fontSize={12} mt={0} w="full" isTruncated>
              {data.item.messageText}
            </Text>
          </VStack>
        </HStack>
      </Box>
    </TouchableOpacity>
  );

  console.log(messages);

  return userToken ? (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#E6EEF0",
      }}
    >
      <Title
        style={{ textAlign: "center", fontWeight: "bold", marginBottom: 5 }}
      >
        Messages
      </Title>
      {isLoading ? (
        <SafeAreaView
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View>
            <ActivityIndicator size={"large"} color={"#41416E"} />
          </View>
          <Title>Loading, Please wait...</Title>
        </SafeAreaView>
      ) : messages?.length > 0 ? (
        <FlatList
          scrollEnabled={true}
          data={messages}
          renderItem={renderItem}
        />
      ) : (
        <Text style={{ alignSelf: "center", fontSize: 16 }}>No Messages</Text>
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
        Please Login to see your chats
      </Text>
    </SafeAreaView>
  );
};

export default Chat;
