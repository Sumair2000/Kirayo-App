import { SafeAreaView, Text, ActivityIndicator } from "react-native";
import React, { useState, useCallback, useEffect, useContext } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { db } from "../../config";
import { AuthContext } from "../context/AuthContext";

const Message = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const { userEmail, userInfo } = useContext(AuthContext);
  const { user, name, email } = route.params;
  const [isLoading, setIsLoading] = useState(true);

  const getAllMessages = async () => {
    setIsLoading(true);
    const docId =
      user > userEmail ? userEmail + "-" + user : user + "-" + userEmail;
    console.log(docId);
    const querySnap = await db
      .collection("chatrooms")
      .doc(docId)
      .collection("messages")
      .orderBy("createdAt", "desc")
      .get();

    const msgs = querySnap.docs.map((docSnap) => {
      return {
        ...docSnap.data(),
        createdAt: docSnap.data().createdAt.toDate(),
      };
    });
    setIsLoading(false);
    setMessages(msgs);
  };
  useEffect(() => {
    getAllMessages();
  }, []);

  const onSend = (messages) => {
    const msg = messages[0];

    db.collection("users")
      .doc(user)
      .collection("myUsers")
      .doc(userEmail)
      .set({
        name: userInfo.fullname,
        email: userEmail,
        messageText: msg.text,
        createdAt: new Date(),
      })
      .then((res) => {
        console.log("success");
      })
      .catch((err) => console.log(err));

    db.collection("users")
      .doc(userEmail)
      .collection("myUsers")
      .doc(user)
      .set({
        name: name,
        email: user,
        messageText: msg.text,
        createdAt: new Date(),
      })
      .then((res) => {
        console.log("success");
      })
      .catch((err) => console.log(err));

    const myMsg = {
      ...msg,
      sentBy: userEmail,
      sentTo: user,
      createdAt: new Date(),
    };
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, myMsg)
    );

    const docId =
      user > userEmail ? userEmail + "-" + user : user + "-" + userEmail;

    db.collection("chatrooms")
      .doc(docId)
      .collection("messages")
      .add({ ...myMsg });
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#E6EEF0",
      }}
    >
      {isLoading ? (
        <ActivityIndicator
          animating={isLoading}
          size={"large"}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            height: "50%",
          }}
        />
      ) : (
        <GiftedChat
          messages={messages}
          onSend={(text) => onSend(text)}
          user={{
            _id: user,
            name: userInfo.fullname,
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default Message;
