import {
  SafeAreaView,
  View,
  Text,
  Image,
  Alert,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Button, useToast } from "native-base";
import React, { useContext, useState } from "react";
import { color } from "../assets/Color";
import { StripeProvider, CardField } from "@stripe/stripe-react-native";
import DateRangePicker from "rn-select-date-range";
import moment from "moment";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const ReserveProduct = ({ route, navigation }) => {
  const toast = useToast();

  const { product } = route.params;
  const { userEmail } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRange, setRange] = useState({});
  const [cardDetails, setCardDetails] = useState();

  const handleConfirmPayment = async () => {
    if (!selectedRange.secondDate || !cardDetails || !selectedRange.firstDate) {
      return Alert.alert("Empty fields", "Please fill all fields.");
    }
    setIsLoading(true);
    const data = {
      productId: product.productID,
      timeStamp: new Date(),
      startDate: selectedRange.firstDate,
      endDate: selectedRange.secondDate,
      totalPrice: selectedRange.secondDate
        ? Math.floor(
            product.displayPrice * 0.1 +
              product.displayPrice *
                moment(selectedRange.secondDate).diff(
                  selectedRange.firstDate,
                  "days"
                )
          )
        : Math.floor(product.displayPrice * 0.1 + product.displayPrice),
    };
    console.log("Reserved PORT", process.env.PORT, userEmail);
    await axios({
      method: "POST",
      url: `http://${process.env.PORT}:8080/product/reservation/productrequest?email=${userEmail}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    })
      .then((res) => {
        console.log("Inside reserve");
        if (res.data.status) {
          toast.show({
            description: "Product Reserved Successfully",
            type: "assertive",
            tintColor: "black",
            backgroundColor: "green.500",
          });
          navigation.navigate("Home");
        } else {
          toast.show({
            description: "Error, Please try later.",
            type: "assertive",
            tintColor: "black",
            backgroundColor: "red.500",
          });
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        toast.show({
          description: "Error, Please try later.",
          type: "assertive",
          tintColor: "black",
          backgroundColor: "red.500",
        });
        setIsLoading(false);
      });
  };
  // console.log(product);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <StripeProvider publishableKey={process.env.STRIPE_PUBLISHED_KEY}>
        <ScrollView
          style={{
            backgroundColor: color.background,
            flex: 1,
            paddingHorizontal: 10,
          }}
        >
          <Image
            style={{
              width: "100%",
              borderRadius: 10,
              height: 130,
              backgroundColor: "white",
            }}
            resizeMode="center"
            source={{
              uri: product.imageids[0]
                ? `http://${process.env.PORT}:8080/product/image?id=${product.imageids[0]}`
                : "https://dummyimage.com/640x360/fff/aaa",
            }}
          />
          <Text style={{ fontSize: 22, marginTop: 10, fontWeight: "bold" }}>
            {product?.title.length > 30
              ? product?.title.slice(0, 30) + "..."
              : product?.title}
          </Text>
          <Text style={{ color: color.primary, fontSize: 18, marginTop: 7 }}>
            PKR {product.displayPrice}
            <Text
              style={{
                fontSize: 15,
                color: "black",
                fontSize: 18,
                fontStyle: "italic",
              }}
            >
              /day
            </Text>
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "white",
              borderRadius: 10,
              padding: 10,
              marginTop: 10,
            }}
          >
            <Text style={{ fontSize: 20, marginBottom: 10, fontWeight: "500" }}>
              Select Dates
            </Text>
            <DateRangePicker
              onSelectDateRange={(range) => {
                setRange(range);
              }}
              blockSingleDateSelection={true}
              responseFormat="YYYY-MM-DD"
              maxDate={moment(new Date()).add(3, "M")}
              minDate={moment(
                product?.productReservations
                  ? product.productReservations[0].endedAt
                  : new Date()
              )}
              selectedDateContainerStyle={{
                height: 30,
                width: "130%",
                borderRadius: 5,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: color.secondary,
              }}
              selectedDateStyle={{ fontWeight: "bold", color: "white" }}
            />
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "white",
              borderRadius: 10,
              padding: 10,
              marginTop: 10,
              marginBottom: 10,
            }}
          >
            <Text style={{ fontSize: 20, marginBottom: 10, fontWeight: "500" }}>
              Price details
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 17, marginBottom: 5 }}>Total days</Text>
              {selectedRange.secondDate ? (
                <Text style={{ fontSize: 17, marginBottom: 5 }}>
                  {moment(selectedRange.secondDate).diff(
                    selectedRange.firstDate,
                    "days"
                  )}
                </Text>
              ) : (
                <Text
                  style={{
                    fontSize: 16,
                    marginBottom: 5,
                    color: "red",
                    fontStyle: "italic",
                  }}
                >
                  Please select dates
                </Text>
              )}
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 18, marginBottom: 5 }}>
                Price per day
              </Text>
              <Text style={{ fontSize: 18, marginBottom: 5 }}>
                {" "}
                {product.displayPrice}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 17, marginBottom: 5 }}>Service fee</Text>
              <Text style={{ fontSize: 17, marginBottom: 5 }}>
                {Math.floor(product.displayPrice * 0.1)}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  marginBottom: 5,
                  fontStyle: "italic",
                  fontWeight: "bold",
                }}
              >
                Total
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  marginBottom: 5,
                  fontStyle: "italic",
                  fontWeight: "bold",
                }}
              >
                PKR{" "}
                {selectedRange.secondDate
                  ? Math.floor(
                      product.displayPrice * 0.1 +
                        product.displayPrice *
                          moment(selectedRange.secondDate).diff(
                            selectedRange.firstDate,
                            "days"
                          )
                    )
                  : Math.floor(
                      product.displayPrice * 0.1 + product.displayPrice
                    )}
              </Text>
            </View>
          </View>
          <TextInput
            style={{
              height: 45,
              width: "100%",
              marginBottom: 10,
              backgroundColor: "white",
              borderRadius: 10,
              fontSize: 16,
              padding: 10,
            }}
            placeholder="Email Address"
            keyboardType="email-address"
            value={userEmail}
            editable={false}
            autoCapitalize="none"
          ></TextInput>
          <CardField
            postalCodeEnabled={false}
            style={{
              width: "100%",
              borderRadius: 10,
              height: 50,
              marginBottom: 20,
            }}
            cardStyle={{
              textColor: "#1c1c1c",
            }}
            onCardChange={(cardDetails) => {
              setCardDetails(cardDetails);
            }}
          />

          <Button
            isLoading={isLoading}
            borderRadius={10}
            backgroundColor={color.primary}
            size={"lg"}
            marginBottom={10}
            onPress={handleConfirmPayment}
          >
            Confirm and Pay
          </Button>
        </ScrollView>
      </StripeProvider>
    </TouchableWithoutFeedback>
  );
};

export default ReserveProduct;
