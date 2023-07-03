import moment from "moment";
import React, { useState } from "react";
import { useToast } from "native-base";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import RatingModal from "./RatingModal";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { color } from "../assets/Color";

const ReservationHistoryCard = ({ product, getHistoryData, navigation }) => {
  const { userEmail, setRender, render } = useContext(AuthContext);
  const [handleModal, setHandleModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState("");

  const handleCloseModal = () => {
    setHandleModal(false);
  };

  const Card = ({
    reqId,
    id,
    image,
    title,
    time,
    price,
    category,
    status,
    email,
    endDate,
  }) => {
    const getStatusColor = () => {
      switch (status) {
        case "accept" || "Accept":
          return "#28a745"; // green
        case "reject" || "Reject":
          return "#dc3545"; // red
        case "pending" || "Pending":
          return "#888888"; // yellow
        default:
          return "#ffc107"; // gray
      }
    };

    const toast = useToast();

    const handleCancel = async () => {
      setIsLoading(true);
      console.log(reqId);
      console.log("Cancel ");
      await axios({
        method: "DELETE",
        url: `http://${process.env.PORT}:8080/product/reservation/cancelproductrequest?requestId=${reqId}`,
      })
        .then((res) => {
          console.log(res.data);
          if (res.data.status) {
            getHistoryData();
            toast.show({
              description: "Cancelled successfully.",
              type: "assertive",
              tintColor: "black",
              backgroundColor: "green.500",
            });
            navigation.navigate("Setting");
            setRender(!render);
            setIsLoading(false);
          } else {
            toast.show({
              description: "It's already accepted or rejected",
              type: "assertive",
              tintColor: "black",
              backgroundColor: "red.500",
            });
            setIsLoading(false);
          }
        })
        .catch((err) => err.message);
    };
    console.log(image);
    return (
      <View style={styles.card}>
        <Image
          source={{
            uri: `http://${process.env.PORT}:8080/product/image?id=${image}`,
          }}
          resizeMode="contain"
          style={styles.image}
        />
        <View style={styles.content}>
          <View style={styles.titleTimeContainer}>
            <Text style={styles.title}>
              {title.slice(0, 13)}
              {title.length > 13 && "..."}
            </Text>
            <Text style={styles.time}>{moment(time).fromNow()}</Text>
          </View>
          <Text style={styles.price}>PKR {price}</Text>
          <Text style={styles.category}>{email}</Text>
          <Text style={styles.category}>{category}</Text>

          <View style={styles.titleTimeContainer}>
            <View
              style={[styles.status, { backgroundColor: getStatusColor() }]}
            >
              <Text style={styles.statusText}>
                {status == "pending" ? status : status + "ed"}
              </Text>
            </View>
            {moment(new Date()).format("YYYY-MM-DD") === endDate.toString() &&
              status !== "pending" && (
                <TouchableOpacity
                  style={{
                    backgroundColor: "blue",
                    paddingVertical: 6,
                    paddingHorizontal: 12,
                    borderRadius: 4,
                    alignSelf: "flex-start",
                  }}
                  onPress={() => {
                    setId(id);
                    setHandleModal(true);
                  }}
                >
                  <Text style={styles.cancelButtonText}>Give Review</Text>
                </TouchableOpacity>
              )}
            {status === "pending" && (
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleCancel}
              >
                {isLoading ? (
                  <ActivityIndicator size={"small"} color={color.background} />
                ) : (
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                )}
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <>
      <RatingModal
        visible={handleModal}
        onClose={handleCloseModal}
        id={id}
        email={userEmail}
      />
      <View style={styles.container}>
        {product?.length > 0 ? (
          product.map((item, index) => (
            <Card
              reqId={item.requestId}
              id={item.product.productID}
              image={item.product.imageids[0]}
              title={item.product?.title}
              time={item.timeStamp}
              price={item.totalPrice}
              category={item?.product?.category}
              status={item?.requestStatus}
              email={item?.product?.email}
              endDate={item?.endDate}
            />
          ))
        ) : (
          <Text style={{ alignSelf: "center", fontSize: 16 }}>EMPTY</Text>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 150,
    marginBottom: 11,
    elevation: 1,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  titleTimeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  time: {
    fontSize: 12,
    color: "#888888",
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  category: {
    color: "#888888",
    marginBottom: 4,
  },
  status: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  statusText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  cancelButton: {
    backgroundColor: "#FF0000",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  cancelButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default ReservationHistoryCard;
