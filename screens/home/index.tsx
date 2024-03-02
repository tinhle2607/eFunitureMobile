import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Button,
} from "react-native";
import { CustomPagination } from "../../components";
import FilterSearchBar from "./FilterSearchBar";
import FurnitureItem from "./FurnitureItem";
import { CategoryService, ProductService } from "../../service";
import { Category, Product } from "../../interface";

const PAGE_SIZE = 10;
const HomeScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [product, setProduct] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [categories, setCategories] = useState<Category[]>([]);
  const [typeMapping, setTypeMapping] = useState<Record<string, string>>({});
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await CategoryService.getCategories();
      setCategories(response);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const newTypeMapping = categories.reduce((acc, category) => {
      acc[category.id] = category.name;
      return acc;
    }, {} as Record<string, string>);
    setTypeMapping(newTypeMapping);
  }, [categories]);
  useEffect(() => {
    const fetchProducts = async () => {
      const products = await ProductService.getProductsByPage(
        currentPage,
        searchQuery,
        searchType
      );
      setProduct(products);
    };
    const fetchToTalPageProduct = async () => {
      const total = await ProductService.getTotalPages(
        currentPage,
        searchQuery,
        searchType
      );
      setTotalPages(total);
    };
    fetchToTalPageProduct();
    fetchProducts();
  }, [searchType, searchQuery, currentPage]);

  const handleFilterChange = (type, query) => {
    setSearchType(type);
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleItemPress = (id) => {
    navigation.navigate("ProductDetail", { itemId: id });
  };

  const onPageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate("Login")}
      />
      <Button
        title="Go to Appointment"
        onPress={() => navigation.navigate("Appointment")}
      />
      <FilterSearchBar
        onFilterChange={handleFilterChange}
        typeMapping={typeMapping}
      />
      <FlatList
        data={product}
        renderItem={({ item }) => (
          <FurnitureItem
            id={item.id}
            name={item.name}
            price={item.price}
            imageUri={item.imageUri}
            onPress={() => handleItemPress(item.id)}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
      />
      <CustomPagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
