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
  return (
    <View style={styles.container}>
      <FlatList
        data={vouchers}
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
            <Text style={styles.voucherText}>{item.name}</Text>
          </TouchableOpacity>
        )}
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
