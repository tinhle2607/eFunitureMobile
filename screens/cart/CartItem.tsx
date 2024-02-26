import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const CartItem = ({
  item,
  onRemove,
  onAddQuantity,
  onReduceQuantity,
  onSelect,
  isSelected,
  onPress,
}) => {
  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        onPress={() => onSelect(item.id)}
        style={styles.radioContainer}
      >
        <View
          style={[
            styles.radioOuterCircle,
            isSelected && styles.radioOuterCircleSelected,
          ]}
        >
          {isSelected && <View style={styles.radioInnerCircle} />}
        </View>
      </TouchableOpacity>

      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
      </View>

      <TouchableOpacity
        style={styles.infoContainer}
        onPress={() => onPress(item.id)}
      >
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
      </TouchableOpacity>
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          onPress={() => onReduceQuantity(item.id)}
          style={styles.quantityButton}
        >
          <Text style={styles.quantityText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{item.quantity}</Text>
        <TouchableOpacity
          onPress={() => onAddQuantity(item.id)}
          style={styles.quantityButton}
        >
          <Text style={styles.quantityText}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => onRemove(item.id)}
        style={styles.removeButton}
      >
        <MaterialIcons name="highlight-remove" />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { height: 1, width: 0 },
    elevation: 2,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  productContainer: {
    flexDirection: "row",
  },
  radioContainer: {
    marginRight: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  radioOuterCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
  },
  radioOuterCircleSelected: {
    borderColor: "orange",
  },
  radioInnerCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "orange",
  },
  imageContainer: {
    borderRadius: 25,
    overflow: "hidden",
  },
  productImage: {
    width: 50,
    height: 50,
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  productName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333333",
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    color: "#888888",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  quantityButton: {
    marginHorizontal: 8,
    padding: 8,
    backgroundColor: "#EEEEEE",
    borderRadius: 4,
  },
  quantityText: {
    fontSize: 16,
    color: "#333333",
  },
  quantity: {
    fontSize: 16,
    color: "#333333",
  },
  removeButton: {
    padding: 8,
    backgroundColor: "#FF3B30",
    borderRadius: 15,
  },
  removeButtonText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  selectedItem: {
    backgroundColor: "#e0e0e0",
  },
});

export default CartItem;
