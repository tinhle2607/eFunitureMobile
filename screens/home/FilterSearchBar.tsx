import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";

interface FilterSearchBarProps {
  onFilterChange: (filterType: string, query: string) => void;
  typeMapping: { [key: string]: string };
}

const FilterSearchBar: React.FC<FilterSearchBarProps> = ({
  onFilterChange,
  typeMapping,
}) => {
  const [searchText, setSearchText] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search..."
        style={styles.input}
        onChangeText={(text) => {
          setSearchText(text);
          onFilterChange(selectedType, text);
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
            selectedType === "0" && styles.selectedFilterButton,
          ]}
          onPress={() => {
            setSelectedType("0");
            onFilterChange("0", searchText);
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
              onFilterChange(key, searchText);
            }}
          >
            <Text style={styles.filterText}>{value}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
});

export default FilterSearchBar;
