import React from "react";
import { Image, StyleSheet } from "react-native";

const ProductImage = ({ imageUrl }) => {
  return <Image source={{ uri: imageUrl }} style={styles.image} />;
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
  },
});

export default ProductImage;
