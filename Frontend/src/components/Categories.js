import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import Icon1 from "../assets/categories/Vector.svg";
import Icon2 from "../assets/categories/Vector1.svg";
import Icon3 from "../assets/categories/Vector2.svg";
import Icon4 from "../assets/categories/Vector3.svg";
import Icon5 from "../assets/categories/Vector4.svg";
import Icon6 from "../assets/categories/Vector5.svg";
import Icon7 from "../assets/categories/Vector6.svg";
import Icon8 from "../assets/categories/Vector7.svg";
import Icon9 from "../assets/categories/Group.svg";

const Categories = ({ setCheck, check }) => {
  return (
    <TouchableWithoutFeedback onPress={() => setCheck(null)}>
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginVertical: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setCheck("Tools");
            }}
          >
            <View
              style={{
                height: 80,
                width: 80,
                borderRadius: 999,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: check === "Tools" ? "#EC8932" : "#F4F4F4",
                borderColor: check === "Tools" && "#475FCB",
                // borderWidth: check === "Tools" && 1.5,
              }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Icon1 height={30} width={30} />
              </View>
            </View>
            <Text
              style={{
                alignSelf: "center",
                fontSize: 16,
                marginTop: 10,
                color: check === "Tools" ? "#475FCB" : "black",
              }}
            >
              Tools
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setCheck("Equipment");
            }}
          >
            <View
              style={{
                height: 80,
                width: 80,
                borderRadius: 999,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: check === "Equipment" ? "#EC8932" : "#F4F4F4",
                borderColor: check === "Equipment" && "#475FCB",
                // borderWidth: check === "Equipment" && 1.5,
              }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Icon2 height={30} width={30} />
              </View>
            </View>
            <Text
              style={{
                alignSelf: "center",
                fontSize: 16,
                marginTop: 10,
                color: check === "Equipment" ? "#475FCB" : "black",
              }}
            >
              Equipment
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setCheck("Appliances");
            }}
          >
            <View
              style={{
                height: 80,
                width: 80,
                borderRadius: 999,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#F4F4F4",
                backgroundColor: check === "Appliances" ? "#EC8932" : "#F4F4F4",
                borderColor: check === "Appliances" && "#475FCB",
                // borderWidth: check === "Appliances" && 1.5,
              }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Icon5 height={30} width={30} />
              </View>
            </View>
            <Text
              style={{
                alignSelf: "center",
                fontSize: 16,
                marginTop: 10,
                color: check === "Appliances" ? "#475FCB" : "black",
              }}
            >
              Appliances
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginVertical: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setCheck("Apparel");
            }}
          >
            <View
              style={{
                height: 80,
                width: 80,
                borderRadius: 999,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#F4F4F4",
                backgroundColor: check === "Apparel" ? "#EC8932" : "#F4F4F4",
                borderColor: check === "Apparel" && "#475FCB",
                // borderWidth: check === "Apparel" && 1.5,
              }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Icon4 height={30} width={30} />
              </View>
            </View>
            <Text
              style={{
                alignSelf: "center",
                fontSize: 16,
                marginTop: 10,
                color: check === "Apparel" ? "#475FCB" : "black",
              }}
            >
              Apparel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setCheck("Footwear");
            }}
          >
            <View
              style={{
                height: 80,
                width: 80,
                borderRadius: 999,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#F4F4F4",
                backgroundColor: check === "Footwear" ? "#EC8932" : "#F4F4F4",
                borderColor: check === "Footwear" && "#475FCB",
                // borderWidth: check === "Footwear" && 1.5,
              }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Icon3 height={30} width={30} />
              </View>
            </View>
            <Text
              style={{
                alignSelf: "center",
                fontSize: 16,
                marginTop: 10,
                color: check === "Footwear" ? "#475FCB" : "black",
              }}
            >
              Footwear
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setCheck("Kitchenware");
            }}
          >
            <View
              style={{
                height: 80,
                width: 80,
                borderRadius: 999,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#F4F4F4",
                backgroundColor:
                  check === "Kitchenware" ? "#EC8932" : "#F4F4F4",
                borderColor: check === "Kitchenware" && "#475FCB",
                // borderWidth: check === "Kitchenware" && 1.5,
              }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Icon6 height={30} width={30} />
              </View>
            </View>
            <Text
              style={{
                alignSelf: "center",
                fontSize: 16,
                marginTop: 10,
                color: check === "Kitchenware" ? "#475FCB" : "black",
              }}
            >
              Kitchenware
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginVertical: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setCheck("Furniture");
            }}
          >
            <View
              style={{
                height: 80,
                width: 80,
                borderRadius: 999,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: check === "Furniture" ? "#EC8932" : "#F4F4F4",
                borderColor: check === "Furniture" && "#475FCB",
                // borderWidth: check === "Furniture" && 1.5,
              }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Icon7 height={30} width={30} />
              </View>
            </View>
            <Text
              style={{
                alignSelf: "center",
                fontSize: 16,
                marginTop: 10,
                color: check === "Furniture" ? "#475FCB" : "black",
              }}
            >
              Furniture
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setCheck("Computing");
            }}
          >
            <View
              style={{
                height: 80,
                width: 80,
                borderRadius: 999,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: check === "Computing" ? "#EC8932" : "#F4F4F4",
                borderColor: check === "Computing" && "#475FCB",
                // borderWidth: check === "Computing" && 1.5,
              }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Icon9 height={30} width={30} />
              </View>
            </View>
            <Text
              style={{
                alignSelf: "center",
                fontSize: 16,
                marginTop: 10,
                color: check === "Computing" ? "#475FCB" : "black",
              }}
            >
              Computing
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setCheck("Others");
            }}
          >
            <View
              style={{
                height: 80,
                width: 80,
                borderRadius: 999,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: check === "Others" ? "#EC8932" : "#F4F4F4",
                borderColor: check === "Others" && "#475FCB",
                // borderWidth: check === "Others" && 1.5,
              }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Icon8 height={30} width={30} />
              </View>
            </View>
            <Text
              style={{
                alignSelf: "center",
                fontSize: 16,
                marginTop: 10,
                color: check === "Others" ? "#475FCB" : "black",
              }}
            >
              Others
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Categories;
