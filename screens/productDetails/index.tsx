import React, { useState } from "react";
import { ScrollView, StyleSheet, Alert } from "react-native";

import ProductImage from "./ProductImage";
import ProductDetails from "./ProductDetails";
import Button from "./Button";

const ProductScreen = ({ route }) => {
  const { itemId } = route.params;
  const [quantity, setQuantity] = useState(1);

  const productData = {
    imageUrl: "https://via.placeholder.com/150",
    name: "Irul Chair",
    description: "Crafted with a perfect construction by Sato Fabric",
    price: "102.00",
  };

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  const handleBuyPress = () => {
    Alert.alert(
      "Buy Product",
      `You have added ${quantity} of "${productData.name}" to your cart.`,
      [
        {
          text: "Go to Cart",
          onPress: () => console.log("Navigate to Cart Screen"),
        },
        {
          text: "Continue Shopping",
          onPress: () => console.log("Continue Shopping"),
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <ProductImage imageUrl={productData.imageUrl} />
      <ProductDetails
        name={productData.name}
        description={productData.description}
        price={productData.price}
        onQuantityChange={handleQuantityChange}
      />
      <Button onPress={handleBuyPress} title={"Add to cart"} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
export default ProductScreen;
