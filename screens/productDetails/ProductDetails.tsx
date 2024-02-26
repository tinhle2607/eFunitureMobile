import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface ProductDetailsProps {
  name: string;
  description: string;
  price: string;
  onQuantityChange: (quantity: number) => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  name,
  description,
  price,
  onQuantityChange,
}) => {
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange(newQuantity);
  };

  const decrementQuantity = () => {
    const newQuantity = quantity > 1 ? quantity - 1 : 1;
    setQuantity(newQuantity);
    onQuantityChange(newQuantity);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.price}>${price}</Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          onPress={decrementQuantity}
          style={styles.quantityButton}
        >
          <Text style={styles.quantityControlText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{quantity}</Text>
        <TouchableOpacity
          onPress={incrementQuantity}
          style={styles.quantityButton}
        >
          <Text style={styles.quantityControlText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "white", // Assuming a white background
  },
  name: {
    fontSize: 20, // Reduced font size
    fontWeight: "bold",
    marginBottom: 4, // Added some space below the name
  },
  description: {
    fontSize: 16, // Adjusted font size
    color: "#666", // Adjusted color for the description
    marginBottom: 4, // Added some space below the description
  },
  price: {
    fontSize: 26, // Slightly larger font size for price
    fontWeight: "bold",
    color: "#EB5757", // Adjusted color for the price
    marginBottom: 10, // Added some space below the price
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0", // Adjusted border color
    borderRadius: 10, // Added border radius
    padding: 8, // Adjust padding for the container
  },
  quantityButton: {
    // Removed borders from individual buttons
    padding: 8, // Adjust padding for buttons
  },
  quantityControlText: {
    fontSize: 24, // Larger font size for +/-
    color: "#EB5757", // Adjusted color for +/-
  },
  quantityText: {
    marginHorizontal: 10, // Adjusted spacing between controls
    fontSize: 18, // Adjusted font size for quantity
  },
});

export default ProductDetails;
