import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

const ProductCard = ({ name, category, imageUrl }) => (
  <View style={styles.cardContainer}>
    <Image style={styles.cardImage} source={{ uri: imageUrl }} />
    <View style={styles.cardContent}>
      <Text style={styles.cardTitle}>{name}</Text>
      <Text style={styles.cardCategory}>{category}</Text>
    </View>
  </View>
);

const ProductList = ({ products }) => (
  <ScrollView style={styles.productList} showsVerticalScrollIndicator={false}>
    {products.map(product => (
      <ProductCard
        key={product.id}
        name={product.name}
        category={product.category}
        imageUrl={product.imageUrl}
      />
    ))}
  </ScrollView>
);

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  cardImage: {
    height: 200,
    width: '100%',
  },
  cardContent: {
    padding: 20,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  cardCategory: {
    fontSize: 14,
    color: '#999',
  },
});

export default ProductList;