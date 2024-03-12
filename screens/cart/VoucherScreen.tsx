import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

const VoucherScreen = ({ vouchers, selectedVoucherId, onSelectVoucher }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={vouchers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.voucherButton,
              selectedVoucherId === item.id && styles.selectedVoucher,
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
  container: {
    // Add any container styles you might need
  },
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
