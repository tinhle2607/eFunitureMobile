import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { CustomPagination } from "../../components";

const ITEMS_PER_PAGE = 5;

const VoucherScreen = ({ vouchers, selectedVoucherIds, onSelectVoucher }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(vouchers.length / ITEMS_PER_PAGE);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={vouchers.slice(
          (currentPage - 1) * ITEMS_PER_PAGE,
          currentPage * ITEMS_PER_PAGE
        )}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.voucherButton,
              selectedVoucherIds.includes(item.id) && styles.selectedVoucher,
            ]}
            onPress={() => onSelectVoucher(item)}
          >
            <Text style={styles.voucherText}>{item.code}</Text>
          </TouchableOpacity>
        )}
      />
      <CustomPagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  voucherButton: {
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  selectedVoucher: {
    backgroundColor: "#D6EAF8",
  },
  voucherText: {
    textAlign: "center",
  },
});

export default VoucherScreen;
