import {
  Flex,
  ScrollView,
  Text,
  Pressable,
  Image,
  Box,
  Heading,
  View,
} from "native-base";
import { Animated } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import Fontisto from "react-native-vector-icons/Fontisto";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import React from "react";
import moment from "moment";

const ProductCard = ({ products, navigation }) => {
  if (products?.length < 1)
    return (
      <Text
        style={{
          alignSelf: "center",
          fontWeight: "bold",
          fontSize: 24,
          paddingTop: 50,
        }}
      >
        Comming Soon
      </Text>
    );
  // console.log(products[0]?.imageids[0]);
  return (
    <Flex
      flexWrap="wrap"
      direction="row"
      justifyContent={"space-around"}
      px={0}
    >
      {products?.map((product) => (
        <Pressable
          key={product?.productID}
          w="47%"
          bg={"white"}
          rounded="2xl"
          shadow={2}
          pt={0.3}
          my={2}
          pb={3}
          overflow="hidden"
          onPress={() =>
            navigation.navigate("DetailedProduct", {
              product: product,
              saved: false,
            })
          }
        >
          <Image
            source={{
              uri: !product.imageids[0]
                ? "https://dummyimage.com/640x360/fff/aaa"
                : `http://${process.env.PORT}:8080/product/image?id=${product.imageids[0]}`,
            }}
            alt={product?.title}
            w="full"
            h={24}
            resizeMode="cover"
          />
          <Box px={4} pt={1}>
            <Heading size={"sm"} bold isTruncated>
              {product?.title}
            </Heading>
            <Text fontSize={13} mt={0} isTruncated w="full" color={"#475FCB"}>
              PKR {product?.price}
              <Text fontSize={13} mt={0} isTruncated w="full" color={"black"}>
                /day
              </Text>
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
                margin: 3,
              }}
            >
              <MaterialIcons name="category" size={16} color="#777777" />
              <Text fontSize={12} mt={0} w="full" isTruncated>
                {" "}
                {product?.category}
              </Text>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
                margin: 3,
              }}
            >
              <Fontisto name="date" size={16} color="#777777" />
              <Text fontSize={12} mt={0} w="full" isTruncated>
                {" "}
                {moment(product?.timeStamp).fromNow()}
              </Text>
            </View>
          </Box>
        </Pressable>
      ))}
    </Flex>
  );
};

export default ProductCard;
