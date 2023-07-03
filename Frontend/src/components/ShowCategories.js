import { View, Text, ScrollView } from "react-native";
import React from "react";
import CategoryButton from "./CategoryButton";
import Tools from "../assets/categories/Vector.svg";
import Equipment from "../assets/categories/Vector1.svg";
import Appliances from "../assets/categories/Vector4.svg";
import Apparel from "../assets/categories/Vector3.svg";
import Footwear from "../assets/categories/Vector2.svg";
import Kitchenware from "../assets/categories/Vector5.svg";
import Furniture from "../assets/categories/Vector6.svg";
import Computing from "../assets/categories/Vector7.svg";
import Others from "../assets/categories/Group.svg";

const ShowCategories = () => {
  const icons = {
    Tools: Tools,
    Equipment: Equipment,
    Appliances: Appliances,
    Apparel: Apparel,
    Footwear: Footwear,
    Kitchenware: Kitchenware,
    Furniture: Furniture,
    Computing: Computing,
    Others: Others,
  };
  return (
    <>
      <Text style={{ fontSize: 14, fontWeight: "normal", marginBottom: 10 }}>
        Categories
      </Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {Object.keys(icons).map((item) => (
          <>
            <CategoryButton
              Icon={icons[item]}
              IconName={item}
              navigation={navigation}
            />
          </>
        ))}
      </ScrollView>
    </>
  );
};

export default ShowCategories;
