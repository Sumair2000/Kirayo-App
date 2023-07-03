import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React, { useEffect } from "react";
import ProductCard from "../components/ProductCard";

const CategoriesProduct = ({ route, navigation }) => {
  const { category, products, search } = route.params;
  const newProd = products?.filter((item) => item.category === category);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#E6EEF0" }}>
      <View style={{ paddingHorizontal: 20 }}>
        {/* <Text style={{fontSize: 16, fontWeight: "bold", marginBottom: 5}}>Search Category: <Text style={{fontWeight: "Normal",}}>{category}</Text></Text> */}

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ height: "85%" }}
        >
          <ProductCard
            products={search ? products : newProd}
            navigation={navigation}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default CategoriesProduct;
