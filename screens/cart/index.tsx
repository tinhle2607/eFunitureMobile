import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import CartItem from "./CartItem";
import VoucherScreen from "./VoucherScreen";
import { cartData as initialCartData } from "../../constants";
const initialVouchers = [
  { id: "v1", code: "10OFF", discountPercent: 10 },
  { id: "v2", code: "20OFF", discountPercent: 20 },
  { id: "v3", code: "20OFF", discountPercent: 20 },
  { id: "v4", code: "20OFF", discountPercent: 20 },
  { id: "v5", code: "20OFF", discountPercent: 20 },
  { id: "v6", code: "20OFF", discountPercent: 20 },
  { id: "v1", code: "10OFF", discountPercent: 10 },
  { id: "v2", code: "20OFF", discountPercent: 20 },
  { id: "v3", code: "20OFF", discountPercent: 20 },
  { id: "v4", code: "20OFF", discountPercent: 20 },
  { id: "v5", code: "20OFF", discountPercent: 20 },
  { id: "v6", code: "20OFF", discountPercent: 20 },
  { id: "v1", code: "10OFF", discountPercent: 10 },
  { id: "v2", code: "20OFF", discountPercent: 20 },
  { id: "v3", code: "20OFF", discountPercent: 20 },
  { id: "v4", code: "20OFF", discountPercent: 20 },
  { id: "v5", code: "20OFF", discountPercent: 20 },
  { id: "v6", code: "20OFF", discountPercent: 20 },
];
const CartScreen = ({ navigation }) => {
  const [cartData, setCartData] = useState(initialCartData);

  const [selectedItems, setSelectedItems] = useState([]);
  const [vouchers, setVouchers] = useState(initialVouchers);
  const [selectedVoucherIds, setSelectedVoucherIds] = useState([]);

  const handleAddQuantity = (itemId) => {
    const newCartData = cartData.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartData(newCartData);
  };
  const onSelectVoucher = (voucher) => {
    setSelectedVoucherIds((currentSelectedVoucherIds) => {
      if (currentSelectedVoucherIds.includes(voucher.id)) {
        return currentSelectedVoucherIds.filter((id) => id !== voucher.id);
      } else {
        return [...currentSelectedVoucherIds, voucher.id];
      }
    });
  };

  const handleReduceQuantity = (itemId) => {
    const newCartData = cartData.map((item) => {
      if (item.id === itemId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCartData(newCartData);
  };

  const handleRemoveItem = (itemId) => {
    const newCartData = cartData.filter((item) => item.id !== itemId);
    setCartData(newCartData);
  };
  const isSelected = (itemId) => selectedItems.includes(itemId);
  const handleItemPress = (itemId) => {
    navigation.navigate("ProductDetail", { itemId: itemId });
  };

  const handleSelectItem = (itemId) => {
    if (isSelected(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const calculateTotalSelectedItems = () => {
    return selectedItems.reduce((acc, itemId) => {
      const item = cartData.find((item) => item.id === itemId);
      return item ? acc + item.price * item.quantity : acc;
    }, 0);
  };

  const calculateTotalDiscount = () => {
    let totalAfterDiscount = calculateTotalSelectedItems();

    selectedVoucherIds.forEach((voucherId) => {
      const voucher = vouchers.find((voucher) => voucher.id === voucherId);
      if (voucher) {
        totalAfterDiscount -=
          (totalAfterDiscount * voucher.discountPercent) / 100;
      }
    });

    const totalDiscount = calculateTotalSelectedItems() - totalAfterDiscount;
    return totalDiscount;
  };

  const calculateTotalWithDiscounts = () => {
    const totalDiscount = calculateTotalDiscount();
    const totalAfterDiscounts = calculateTotalSelectedItems() - totalDiscount;
    return totalAfterDiscounts.toFixed(2);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cartData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            onRemove={handleRemoveItem}
            onAddQuantity={handleAddQuantity}
            onReduceQuantity={handleReduceQuantity}
            onSelect={() => handleSelectItem(item.id)}
            isSelected={isSelected(item.id)}
            onPress={() => handleItemPress(item.id)}
          />
        )}
      />
      <VoucherScreen
        vouchers={vouchers}
        selectedVoucherIds={selectedVoucherIds}
        onSelectVoucher={onSelectVoucher}
      />
      <View style={styles.footer}>
        <Text style={styles.totalItemsText}>
          Selected Items ({selectedItems.length})
        </Text>
        <Text style={styles.totalPriceText}>
          Total: ${calculateTotalWithDiscounts()}
        </Text>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#f6f6f6",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  infoContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  productPrice: {
    fontSize: 14,
    color: "#666",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  quantityButton: {
    padding: 5,
    borderColor: "#ddd",
    borderRightWidth: 1,
    borderLeftWidth: 1,
  },
  quantityText: {
    fontSize: 18,
    color: "#333",
  },
  quantity: {
    paddingHorizontal: 10,
    fontSize: 18,
    color: "#333",
  },
  removeButton: {
    marginLeft: 15,
    padding: 8,
    borderRadius: 4,
    backgroundColor: "#ff3b30",
  },
  removeButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  totalItemsText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  totalPriceText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  checkoutButton: {
    backgroundColor: "#007bff",
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CartScreen;
