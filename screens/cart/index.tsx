import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import CartItemRender from "./CartItemRender";
import VoucherScreen from "./VoucherScreen";
import { cartData as initialCartData } from "../../constants";
import { Item, Voucher } from "../../interface";
import { CartItemService, VoucherService } from "../../service";
import { CustomPagination } from "../../components";

const CartScreen = ({ navigation }) => {
  const [cartData, setCartData] = useState<Item[]>([]);

  const [selectedItems, setSelectedItems] = useState([]);
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [selectedVoucherIds, setSelectedVoucherIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleAddQuantity = (itemId) => {
    CartItemService.addQuantity(itemId);
    fetchCartItem();
  };
  const fetchVoucher = async () => {
    const Total = await VoucherService.getTotalPages();
    setTotalPages(Total);
    const response = await VoucherService.getVouchersByPage(currentPage);
    setVouchers(response);
  };
  const fetchCartItem = async () => {
    const response = await CartItemService.getCartItem();
    setCartData(response);
  };
  useEffect(() => {
    fetchCartItem();
  }, []);
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
    CartItemService.reduceQuantity(itemId);
    fetchCartItem();
  };

  const handleRemoveItem = (itemId) => {
    CartItemService.deleteCartItem(itemId);
    fetchCartItem();
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
        totalAfterDiscount -= (totalAfterDiscount * voucher.percent) / 100;
      }
    });

    const totalDiscount = calculateTotalSelectedItems() - totalAfterDiscount;
    return totalDiscount;
  };

  const calculateTotalWithDiscounts = () => {
    const totalDiscount = calculateTotalDiscount();
    const totalAfterDiscounts = calculateTotalSelectedItems() - totalDiscount;
    return totalAfterDiscounts;
  };
  const checkout = () => {
    CartItemService.checkout(
      selectedItems,
      selectedVoucherIds,
      calculateTotalWithDiscounts()
    );
  };

  useEffect(() => {
    fetchVoucher();
  }, [currentPage]);
  return (
    <View style={styles.container}>
      <FlatList
        data={cartData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CartItemRender
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
      <CustomPagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      <View style={styles.footer}>
        <Text style={styles.totalItemsText}>
          Selected Items ({selectedItems.length})
        </Text>
        <Text style={styles.totalPriceText}>
          Total: ${calculateTotalWithDiscounts()}
        </Text>
        <TouchableOpacity style={styles.checkoutButton} onPress={checkout}>
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
