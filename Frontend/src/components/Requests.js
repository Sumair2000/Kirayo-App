import {
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
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
  Button,
} from "native-base";
import axios from "axios";
import { SwipeListView } from "react-native-swipe-list-view";
import Entypo from "react-native-vector-icons/Entypo";
import Fontisto from "react-native-vector-icons/Fontisto";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import moment from "moment";
import { color } from "../assets/Color";
import { AuthContext } from "../context/AuthContext";
import ReservationHistoryCard from "./ReservationHistoryCard";

const Requests = ({ navigation }) => {
  const toast = useToast();

  const { userEmail } = useContext(AuthContext);
  const [buttonGroup, setButtonGroup] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const [requestData, setRequestData] = useState([]);
  const [historyData, setHistoryData] = useState([]);

  const getReservationsDetails = async (check) => {
    setisLoading(true);
    if (check === "") {
      console.log("history");
      await axios({
        method: "GET",
        url: `http://${process.env.PORT}:8080/product/reservation/getproductrequestbyrenter?email=${userEmail}`,
      })
        .then((res) => {
          if (res.data.status) {
            console.log("history");
            setHistoryData(res.data.productRequestResponses);
          }
        })
        .catch((err) => err.message);
      setisLoading(false);
    } else if (check === "Week") {
      console.log("request.");
      await axios({
        method: "GET",
        url: `http://${process.env.PORT}:8080/product/reservation/getproductrequestbyrentee?email=${userEmail}`,
      })
        .then((res) => {
          if (res.data.status) {
            console.log("inside request");
            setRequestData(res.data.productRequestResponses);
          }
        })
        .catch((err) => err.message);
      setisLoading(false);
    }
  };

  const getHistoryData = async () => {
    if (buttonGroup === "") {
      await axios({
        method: "GET",
        url: `http://${process.env.PORT}:8080/product/reservation/getproductrequestbyrenter?email=${userEmail}`,
      })
        .then((res) => {
          if (res.data.status) {
            console.log("Inside req");
            setHistoryData(res.data.productRequestResponses);
          }
        })
        .catch((err) => err.message);
    }
  };

  useEffect(() => {
    getHistoryData();
  }, []);

  const handleRequest = async (id, req, price, email) => {
    console.log(id, req);

    if (req) {
      console.log("in re");
      axios({
        method: "POST",
        url: `http:${
          process.env.PORT
        }:8080/payment/create-payment-intent?amount=${(
          price * 100
        ).toString()}&email=${email}`,
      })
        .then((res) => {
          if (res.data.status) {
            axios({
              method: "POST",
              url: `http://${process.env.PORT}:8080/product/reservation/productacceptance?requestId=${id}`,
              data: {
                is_accept: req,
              },
            })
              .then((res) => {
                console.log(res.data);
                if (res.data.status) {
                  console.log(res.data);
                  toast.show({
                    description: `product reservations ${
                      req ? "accepted" : "rejected"
                    }`,
                    type: "assertive",
                    tintColor: "black",
                    backgroundColor: "green.500",
                  });
                  toast.show({
                    description: "Payment Successful",
                    type: "assertive",
                    tintColor: "black",
                    backgroundColor: "green.500",
                  });
                  getReservationsDetails("Week");
                } else {
                  toast.show({
                    description: "Error, Please try again later.",
                    type: "assertive",
                    tintColor: "black",
                    backgroundColor: "red.500",
                  });
                }
              })
              .catch((err) => console.log(err.message));
          } else {
            toast.show({
              description: "Error, while payment. Please try later.",
              type: "assertive",
              tintColor: "black",
              backgroundColor: "red.500",
            });
          }
        })
        .catch((err) => {
          toast.show({
            description: "Error, while payment. Please try later.",
            type: "assertive",
            tintColor: "black",
            backgroundColor: "red.500",
          });
          console.log(err.message);
        });
    } else {
      axios({
        method: "POST",
        url: `http://${process.env.PORT}:8080/product/reservation/productacceptance?requestId=${id}`,
        data: {
          is_accept: req,
        },
      })
        .then((res) => {
          if (res.data.status) {
            console.log(res.data);
            toast.show({
              description: `product reservations ${
                req ? "accepted" : "rejected"
              }`,
              type: "assertive",
              tintColor: "black",
              backgroundColor: "green.500",
            });
            getReservationsDetails("Week");
          } else {
            toast.show({
              description: "Error, Please try again later.",
              type: "assertive",
              tintColor: "black",
              backgroundColor: "red.500",
            });
          }
        })
        .catch((err) => console.log(err.message));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "accept" || "Accept":
        return "#28a745"; // green
      case "reject" || "Reject":
        return "#dc3545"; // red
      default:
        return "#ffc107"; // gray
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#E6EEF0", paddingHorizontal: 10 }}
    >
      <>
        <View style={{ width: "100%" }}>
          <Button.Group
            colorScheme="gray"
            isAttached
            mx={{
              base: "auto",
              md: 0,
            }}
            // size="lg"
            width={"100%"}
            borderRadius={10}
            borderWidth={1}
          >
            <Button
              onPress={() => {
                setButtonGroup("");
                getReservationsDetails("");
              }}
              variant={buttonGroup === "" ? "solid" : "outline"}
              width={"50%"}
            >
              Reservation history
            </Button>
            <Button
              onPress={() => {
                setButtonGroup("Week");
                getReservationsDetails("Week");
              }}
              variant={buttonGroup === "Week" ? "solid" : "outline"}
              width={"50%"}
            >
              Reservation requests
            </Button>
          </Button.Group>
          {isLoading ? (
            <ActivityIndicator size={"large"} color={color.primary} />
          ) : buttonGroup == "" ? (
            <ScrollView
              style={{ marginBottom: 60 }}
              scrollEnabled
              showsVerticalScrollIndicator={false}
            >
              <ReservationHistoryCard
                product={historyData}
                getHistoryData={getHistoryData}
                navigation={navigation}
              />
            </ScrollView>
          ) : (
            <ScrollView
              style={{ marginBottom: 60 }}
              scrollEnabled
              showsVerticalScrollIndicator={false}
            >
              {requestData?.length > 0 ? (
                requestData?.map((request, index) => (
                  <View key={index} style={styles.cardContainer}>
                    <Image
                      alt={request?.product?.title}
                      source={{
                        uri: `http://${process.env.PORT}:8080/product/image?id=${request.product.imageids[0]}`,
                      }}
                      style={styles.image}
                      resizeMode="contain"
                    />
                    <View style={styles.buttonContainer}>
                      <Text style={styles.title}>
                        {request.product.title.slice(0, 25)}
                        {request.product.title.length > 25 && "..."}
                      </Text>
                      <Text style={{ fontSize: 12 }}>
                        {moment(request.timeStamp).fromNow()}
                      </Text>
                    </View>

                    <Text style={styles.price}>
                      Total: PKR {request.totalPrice}
                    </Text>
                    <Text style={styles.price}>
                      Total days: {request.totalDays}
                    </Text>
                    {request?.requestStatus === "pending" ? (
                      <View style={styles.buttonContainer}>
                        <TouchableOpacity
                          style={styles.acceptButton}
                          onPress={() =>
                            handleRequest(
                              request.requestId,
                              true,
                              request.totalPrice,
                              request.product.email
                            )
                          }
                        >
                          <Text style={styles.buttonText}>Accept</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.rejectButton}
                          onPress={() =>
                            handleRequest(request.requestId, false)
                          }
                        >
                          <Text style={styles.buttonText}>Reject</Text>
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <View
                        style={{
                          paddingVertical: 8,
                          paddingHorizontal: 8,
                          borderRadius: 4,
                          backgroundColor: getStatusColor(
                            request?.requestStatus
                          ),
                        }}
                      >
                        <Text
                          style={{
                            color: "#FFFFFF",
                            fontWeight: "bold",
                            textTransform: "capitalize",
                            textAlign: "center",
                          }}
                        >
                          {request?.requestStatus + "ed"}
                        </Text>
                      </View>
                    )}
                  </View>
                ))
              ) : (
                <Text style={{ alignSelf: "center", fontSize: 16 }}>Empty</Text>
              )}
            </ScrollView>
          )}
        </View>
      </>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  cardContainer: {
    marginTop: 10,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
  },
  image: {
    width: "100%",
    height: 150,
    marginBottom: 5,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  acceptButton: {
    backgroundColor: "#4CAF50",
    width: "45%",
    padding: 8,
    borderRadius: 4,
  },
  rejectButton: {
    backgroundColor: "#F44336",
    padding: 8,
    borderRadius: 4,
    width: "45%",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Requests;
