// FurnitureItem.tsx
import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
const windowWidth = Dimensions.get("window").width;
const itemWidth = windowWidth / 2;

const FurnitureItem = ({ id, name, price, imageUri, onPress }) => {
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={() => onPress(id)}>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.price}>${price}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: itemWidth - 16,
    borderRadius: 5,
    margin: 8,
    padding: 10,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 5,
  },
  name: {
    marginTop: 8,
    fontWeight: "bold",
    fontSize: 16,
  },
  price: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
});

export default FurnitureItem;
