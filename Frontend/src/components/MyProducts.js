import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Center,
  HStack,
  Image,
  Pressable,
  VStack,
  Text,
  View,
  useToast,
} from "native-base";
import { SwipeListView } from "react-native-swipe-list-view";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import Fontisto from "react-native-vector-icons/Fontisto";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import moment from "moment";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Alert, SafeAreaView } from "react-native";

const MyProducts = ({ navigation, products, saved }) => {
  const toast = useToast();

  const { getAllProduct, getMyPosts, setRender, render } =
    useContext(AuthContext);

  const handleSavedProduct = async (productId) => {
    await axios({
      method: "DELETE",
      url: `http://${process.env.PORT}:8080/product/savedproduct/deleteusersavedproducts?id=${productId}`,
    })
      .then(async (res) => {
        if (res.data.status) {
          navigation.navigate("SavedProduct");
          setRender(!render);
          // await getAllProduct()
          toast.show({
            description: "Product unsaved!",
            type: "assertive",
            tintColor: "black",
            backgroundColor: "green.500",
          });
        }
      })
      .catch((err) => {
        console.log(err.message);
        toast.show({
          description: "Error, Please try again.",
          type: "assertive",
          tintColor: "black",
          backgroundColor: "red.500",
        });
      });
  };

  const handleDeleteProduct = (productId) => {
    Alert.alert(
      "Confirmation",
      "Are you sure you want to delete?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await axios({
              method: "DELETE",
              url: `http://${process.env.PORT}:8080/product/deleteuserproducts?id=${productId}`,
            })
              .then(async (res) => {
                if (res.data.status) {
                  // getAllProduct();
                  setRender(!render);
                  navigation.navigate("Home");
                  getMyPosts();
                  toast.show({
                    description: "Product deleted successfuly",
                    type: "assertive",
                    tintColor: "black",
                    backgroundColor: "green.500",
                  });
                } else {
                  toast.show({
                    description: "Error, Please try again.",
                    type: "assertive",
                    tintColor: "black",
                    backgroundColor: "red.500",
                  });
                }
              })
              .catch((err) => console.log(err.message));
          },
        },
      ],
      { cancelable: true }
    );
  };

  const renderItems = (data) => {
    console.log(!data?.item.imageids[0]);
    return (
      <Pressable
        onPress={() =>
          navigation.navigate("DetailedProduct", {
            product: data.item,
            saved: saved,
          })
        }
      >
        <Box ml={6} mb={3}>
          <HStack
            alignItems={"center"}
            bg={"white"}
            shadow={1}
            rounded={10}
            overflow={"hidden"}
          >
            <Center w="25%" bg={"grey"}>
              <Image
                source={{
                  uri: !data?.item.imageids[0]
                    ? "https://dummyimage.com/640x360/fff/aaa"
                    : `http://${process.env.PORT}:8080/product/image?id=${data?.item.imageids[0]}`,
                }}
                alt={data.item.title}
                w="full"
                h={24}
                resizeMode="center"
              />
            </Center>
            <VStack w="70%" px={2}>
              {saved ? (
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginRight: 10,
                  }}
                >
                  <Text isTruncated color={"black"} bold fontSize={14}>
                    {data.item.title.slice(0, 22)}
                    {data.item.title.length > 22 && "..."}
                  </Text>
                  <Pressable
                    onPress={() => handleSavedProduct(data.item.savedProductId)}
                  >
                    <FontAwesome name={"heart"} size={20} color="gray" />
                  </Pressable>
                </View>
              ) : (
                <Text isTruncated color={"black"} bold fontSize={14}>
                  {data.item.title}
                </Text>
              )}
              <Text fontSize={13} mt={0} isTruncated w="full" color={"#475FCB"}>
                PKR {data.item.price}
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
                <MaterialIcons name="category" size={14} color="#777777" />
                <Text fontSize={12} mt={0} w="full" isTruncated>
                  {" "}
                  {data.item.category}
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
                <Fontisto name="date" size={14} color="#777777" />
                <Text fontSize={12} mt={0} w="full" isTruncated>
                  {" "}
                  {moment(data.item.timeStamp).fromNow()}
                </Text>
              </View>
            </VStack>
          </HStack>
        </Box>
      </Pressable>
    );
  };

  const renderHiddenItem = (data, rowMap) => {
    return (
      <View
        style={{
          height: "89%",
          flexDirection: "row",
        }}
      >
        <Pressable
          w={60}
          ml="auto"
          h={"10"}
          height={"full"}
          justifyContent={"center"}
          backgroundColor="blue.500"
          onPress={() => {
            closeRow(rowMap, data.item.key);

            navigation.navigate("EditImage", { product: data.item });
          }}
        >
          <Center alignItems={"center"} space={2}>
            <FontAwesome name="edit" size={24} color={"white"} />
          </Center>
        </Pressable>
        <Pressable
          w={60}
          roundedTopRight={10}
          roundedBottomRight={10}
          justifyContent={"center"}
          backgroundColor="red.500"
          onPress={() => handleDeleteProduct(data.item.productID)}
        >
          <Center alignItems={"center"} space={2}>
            <FontAwesome name="trash" size={24} color={"white"} />
          </Center>
        </Pressable>
      </View>
    );
  };

  const [openRowKey, setOpenRowKey] = useState(null);

  const onRowOpen = (rowKey, rowMap) => {
    setOpenRowKey(rowKey);
  };

  const closeRow = (rowKey, rowMap) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
      setOpenRowKey(null);
    }
  };

  return (
    <>
      {products?.length > 0 ? (
        <Box mr={6}>
          <SwipeListView
            keyExtractor={(item, index) => index.toString()}
            rightOpenValue={-120}
            previewRowKey={"0"}
            previewOpenValue={-40}
            previewOpenDelay={3000}
            data={products}
            renderItem={renderItems}
            renderHiddenItem={(data, rowMap) =>
              !saved && renderHiddenItem(data, rowMap)
            }
            showsVerticalScrollIndicator={false}
            onRowOpen={onRowOpen}
          />
        </Box>
      ) : (
        <SafeAreaView
          style={{
            flex: 1,
            justifyContent: "center",
          }}
        >
          <Text style={{ alignSelf: "center", fontSize: 24 }}>
            No any product
          </Text>
        </SafeAreaView>
      )}
    </>
  );
};

export default MyProducts;
