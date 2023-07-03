import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import products from "../assets/Products";
import { AuthContext } from "../context/AuthContext";

const CategoryButton = ({ Icon, IconName, Upload, navigation }) => {
  const { allProducts } = useContext(AuthContext);
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <TouchableOpacity
      style={{ marginRight: 10 }}
      onPress={() => {
        setSelectedCategory(Icon);
        if (Upload) {
        } else {
          navigation.navigate("CategoriesProduct", {
            category: IconName,
            products: allProducts.productsResponse,
          });
        }
      }}
    >
      <View
        style={{
          height: 60,
          width: 60,
          borderRadius: 999,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#F4F4F4",
          marginRight: 10,
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Icon height={22} width={22} />
        </View>
      </View>
      <Text style={{ alignSelf: "center", fontSize: 14, marginTop: 10 }}>
        {IconName}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryButton;
