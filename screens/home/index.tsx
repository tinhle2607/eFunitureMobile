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

const typeMapping = {
  all: "All",
  1: "Chairs",
  2: "Tables",
  3: "Sofas",
  4: "Beds",
};

const initialFurnitureData = [
  {
    id: "1",
    name: "Royal Palm Sofa",
    price: "50.18",
    imageUri: "https://via.placeholder.com/150",
    type: "3",
  },
  {
    id: "2",
    name: "Leatherette Sofa",
    price: "30.99",
    imageUri: "https://via.placeholder.com/150",
    type: "3",
  },
  {
    id: "3",
    name: "Leatherette Sofa",
    price: "30.99",
    imageUri: "https://via.placeholder.com/150",
    type: "3",
  },
];
const PAGE_SIZE = 10;
const HomeScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState(initialFurnitureData);
  const [furnitureDisplay, setFurnitureDisplay] = useState([]);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(initialFurnitureData.length / PAGE_SIZE)
  );

  useEffect(() => {
    let newFilteredData = initialFurnitureData;
    if (searchType !== "all") {
      newFilteredData = initialFurnitureData.filter(
        (item) => item.type === searchType
      );
    }

    if (searchQuery !== "") {
      newFilteredData = newFilteredData.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredData(newFilteredData);
    setTotalPages(Math.ceil(newFilteredData.length / PAGE_SIZE));
    setFurnitureDisplay(
      newFilteredData.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
      )
    );
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
        data={furnitureDisplay}
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
