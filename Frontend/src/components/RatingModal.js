import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import { useToast } from "native-base";
import { color } from "../assets/Color";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const RatingModal = ({ visible, onClose, id, email }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { setRender, render } = useContext(AuthContext);

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const toast = useToast();

  const handleCommentChange = (text) => {
    setComment(text);
  };

  const handleSubmit = async () => {
    // Validate and submit the rating and comment

    if (!comment || !rating) {
      return Alert.alert("Alert", "Please fill all fields");
    }
    if (comment.length > 120) {
      // Display an error or prompt the user to shorten the comment
      return Alert.alert("Alert", "Character limit exceeded");
    }
    setIsLoading(true);

    console.log({
      productId: id,
      email: email,
      rating: rating,
      comment: comment,
    });

    await axios({
      method: "POST",
      url: `http://${process.env.PORT}:8080/product/reviews/productreviews`,
      data: {
        productId: id,
        email: email,
        rating: rating,
        comment: comment,
      },
    })
      .then((res) => {
        if (res.data.status) {
          toast.show({
            description: "Review submitted",
            type: "assertive",
            tintColor: "black",
            backgroundColor: "green.500",
          });
          setRender(!render);
          onClose();
          setIsLoading(true);
        }
      })
      .catch((err) => {
        console.log(err.message);
        setIsLoading(true);
      });
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Rate and Review</Text>

          <View style={styles.ratingContainer}>
            <Text style={styles.ratingLabel}>Rating:</Text>
            <View style={styles.ratingButtons}>
              {[1, 2, 3, 4, 5].map((value) => (
                <TouchableOpacity
                  key={value}
                  style={[
                    styles.ratingButton,
                    rating === value && styles.selectedRatingButton,
                  ]}
                  onPress={() => handleRatingChange(value)}
                >
                  <Text>{value}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TextInput
            style={styles.commentInput}
            placeholder="Enter your comment (max 120 characters)"
            multiline
            maxLength={120}
            spellCheck={true}
            value={comment}
            onChangeText={handleCommentChange}
          />

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    width: "80%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  ratingContainer: {
    marginBottom: 16,
  },
  ratingLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  ratingButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ratingButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#CCC",
  },
  selectedRatingButton: {
    backgroundColor: color.background,
    borderColor: color.primary,
  },
  commentInput: {
    height: 100,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: color.primary,
    borderRadius: 4,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 8,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  closeButton: {
    backgroundColor: "#CCC",
    borderRadius: 4,
    paddingVertical: 12,
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default RatingModal;
