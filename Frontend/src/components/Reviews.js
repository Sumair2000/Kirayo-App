import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { Box, Center, HStack, VStack, Text, View } from "native-base";

import { Title, Avatar } from "react-native-paper";
import Ratings from "./Ratings";
import axios from "axios";
const Reviews = ({ id }) => {
  const [reviewData, setReviewData] = useState([]);
  const reviews = [
    {
      name: "Sumair Ahmed",
      rating: 5,
      comment:
        "Overall good experience, shoe is comfy and well-maintained. I saved good amount of money and still stand out in my event.",
    },
    {
      name: "Zulfiqar Ahmed Khan",
      rating: 3,
      comment:
        "Cards are a great way to display information, usually containing content and actions about a single subject. Cards can contain images, buttons, text and more.",
    },
    {
      name: "Abdur Rehman",
      rating: 5,
      comment:
        "Cards are a great way to display information, usually containing content and actions about a single subject. Cards can contain images, buttons, text and more.",
    },
    {
      name: "Hassaan Quershi",
      rating: 4.5,
      comment:
        "Cards are a great way to display information, usually containing content and actions about a single subject. Cards can contain images, buttons, text and more.",
    },
  ];

  const getReviews = async () => {
    console.log("Getting reviews");
    axios({
      method: "GET",
      url: `http://${process.env.PORT}:8080/product/reviews/getproductreviews?productId=${id}`,
    })
      .then((res) => {
        console.log("Inside Reviews");
        setReviewData(res.data.productsResponse);
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    getReviews();
  }, []);

  const renderItem = (data) => {
    return (
      <View
        style={{
          backgroundColor: "white",
          padding: 10,
          maxWidth: 300,
          marginRight: 10,
          borderRadius: 10,
        }}
      >
        <HStack alignItems={"center"}>
          <Avatar.Text size={40} label={data.item.renterName.slice(0, 1)} />
          <VStack ml={2}>
            <Text style={{ fontSize: 16 }}>{data.item.renterName}</Text>
            <Ratings value={data.item.rating} />
          </VStack>
        </HStack>

        <Text style={{ marginTop: 5 }}>{data.item.comment}</Text>
      </View>
    );
  };

  return reviewData?.length > 0 ? (
    <FlatList
      data={reviewData}
      renderItem={renderItem}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  ) : (
    <Text style={{ alignSelf: "center" }}>No Reviews</Text>
  );
};

export default Reviews;
