MyComments;

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { color } from "../assets/Color";
import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useEffect } from "react";

const MyComments = () => {
  const comments = [
    {
      name: "John Doe",
      rating: 4,
      comment: "Great product! Highly recommended.",
    },
    {
      name: "Jane Smith",
      rating: 5,
      comment: "Excellent service. Very satisfied.",
    },
    // Add more comments here
  ];

  const CommentCard = ({ renterName, rating, comment }) => {
    return (
      <View style={styles.card}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{renterName?.charAt(0)}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.name}>{renterName}</Text>
          <Text style={styles.rating}>Rating: {rating}</Text>
          <Text style={styles.comment}>{comment}</Text>
        </View>
      </View>
    );
  };

  const [data, setData] = useState([]);
  const { userEmail } = useContext(AuthContext);
  const getMyReviews = async () => {
    await axios({
      method: "GET",
      url: `http://${process.env.PORT}:8080/product/reviews/getproductreviewsbyuser?email=${userEmail}`,
    })
      .then((res) => {
        console.log("Inside My Reviews");
        setData(res.data.productsResponse);
      })
      .catch((err) => err.message);
  };

  useEffect(() => {
    getMyReviews();
  }, []);

  return data?.length > 0 ? (
    <View style={styles.container}>
      {data?.map((comment, index) => (
        <CommentCard key={index} {...comment} />
      ))}
    </View>
  ) : (
    <View style={styles.container}>
      <Text style={{ fontSize: 16, alignSelf: "center" }}>No Reviews</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: color.background,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#4287f5",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 24,
    color: "#fff",
  },
  content: {
    marginLeft: 12,
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  rating: {
    fontSize: 16,
    marginBottom: 4,
  },
  comment: {
    fontSize: 14,
    color: "#555",
  },
});

export default MyComments;
