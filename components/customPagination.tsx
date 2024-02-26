import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const pageNeighbours = 2;
  let blocks = [];

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - pageNeighbours && i <= currentPage + pageNeighbours)
    ) {
      blocks.push(i);
    } else if (blocks[blocks.length - 1] !== "...") {
      blocks.push("...");
    }
  }

  return (
    <View style={styles.paginationContainer}>
      <TouchableOpacity
        style={[styles.pageButton, currentPage === 1 && styles.disabledButton]}
        disabled={currentPage === 1}
        onPress={() => onPageChange(currentPage - 1)}
      >
        <Text style={styles.pageButtonText}>Prev</Text>
      </TouchableOpacity>
      {blocks.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.pageButton,
            item === currentPage && styles.activePageButton,
          ]}
          disabled={item === "..."}
          onPress={() => typeof item === "number" && onPageChange(item)}
        >
          <Text style={styles.pageButtonText}>{item}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        style={[
          styles.pageButton,
          currentPage === totalPages && styles.disabledButton,
        ]}
        disabled={currentPage === totalPages}
        onPress={() => onPageChange(currentPage + 1)}
      >
        <Text style={styles.pageButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  pageButton: {
    marginHorizontal: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 3,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  disabledButton: {
    backgroundColor: "#eeeeee",
  },
  activePageButton: {
    backgroundColor: "#0066cc",
    borderColor: "#0055bb",
  },
  pageButtonText: {
    color: "#000000",
  },
});

export default Pagination;
