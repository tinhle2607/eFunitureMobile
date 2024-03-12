import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  FlatList,
} from "react-native";

interface PriceOption {
  label: string;
  min: string;
  max: string;
}

interface FilterSearchBarProps {
  onFilterChange: (
    filterType: string,
    query: string,
    selectPrice: PriceOption
  ) => void;
  typeMapping: { [key: string]: string };
}

const FilterSearchBar: React.FC<FilterSearchBarProps> = ({
  onFilterChange,
  typeMapping,
}) => {
  const priceOptions: PriceOption[] = [
    { label: "All prices", min: "0", max: "1000000000" },
    { label: "100 - 200", min: "100", max: "200" },
    { label: "200 - 300", min: "200", max: "300" },
  ];

  const renderItem = ({ item }: { item: PriceOption }) => {
    return (
      <TouchableOpacity
        style={[
          styles.optionContainer,
          item === selectedPrice && styles.selectedOption,
        ]}
        onPress={() => {
          setSelectedPrice(item);
          onFilterChange(selectedType, searchText, item);
        }}
      >
        <Text style={styles.optionText}>{item.label}</Text>
      </TouchableOpacity>
    );
  };

  const [searchText, setSearchText] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedPrice, setSelectedPrice] = useState(priceOptions[0]);

  return (
    <View>
      <View style={styles.container}>
        <TextInput
          placeholder="Search..."
          style={styles.input}
          onChangeText={(text) => {
            setSearchText(text);
            onFilterChange(selectedType, text, selectedPrice);
          }}
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}
        >
          <TouchableOpacity
            key={0}
            style={[
              styles.filterButton,
              selectedType === "" && styles.selectedFilterButton,
            ]}
            onPress={() => {
              setSelectedType("");
              onFilterChange("", searchText, selectedPrice); // Passing selectedPrice here
            }}
          >
            <Text style={styles.filterText}>All</Text>
          </TouchableOpacity>
          {Object.entries(typeMapping).map(([key, value]) => (
            <TouchableOpacity
              key={key}
              style={[
                styles.filterButton,
                selectedType === key && styles.selectedFilterButton,
              ]}
              onPress={() => {
                setSelectedType(key);
                onFilterChange(key, searchText, selectedPrice); // Passing selectedPrice here
              }}
            >
              <Text style={styles.filterText}>{value}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <FlatList
        data={priceOptions}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <Text style={styles.selectedPriceText}>
        Selected Price: {selectedPrice.label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
  },
  input: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  filterContainer: {
    flexDirection: "row",
  },
  filterButton: {
    backgroundColor: "#eee",
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
  },
  selectedFilterButton: {
    backgroundColor: "#007bff",
    color: "#ffffff",
  },
  filterText: {
    color: "#000",
  },
  optionContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  optionText: {
    fontSize: 16,
  },
  selectedOption: {
    backgroundColor: "#e6f2ff",
  },
  selectedPriceText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default FilterSearchBar;
