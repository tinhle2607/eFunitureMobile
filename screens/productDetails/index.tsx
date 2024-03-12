import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Alert } from "react-native";

import ProductImage from "./ProductImage";
import ProductDetails from "./ProductDetails";
import Button from "./Button";
import { Product } from "../../interface";
import { CartService, ProductService } from "../../service";

const ProductScreen = ({ route }) => {
  const { itemId } = route.params;
  const initialProduct: Product = {
    categoryId: "",
    description: "",
    id: "",
    image: "https://i.",
    name: "",
    price: 0,
    categoryName: "",
    inventoryQuantity: 0,
    status: 0,
  };
  const [quantity, setQuantity] = useState(1);

  const [productData, setProductData] = useState<Product>(initialProduct);

  useEffect(() => {
    const fetchProduct = async () => {
      const product = await ProductService.getProductById(itemId);
      setProductData(product);
    };
    fetchProduct();
  }, []);
  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  const handleBuyPress = () => {
    CartService.addToCart(quantity, productData.id);
  };

  return (
    <ScrollView style={styles.container}>
      <ProductImage imageUrl={productData.image} />
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
