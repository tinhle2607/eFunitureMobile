import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

const VerticalMenu = () => {
  const navigation = useNavigation<any>();

  const menuItems = [
    { key: "VoucherList", label: "Vouchers", iconName: "ticket-outline" },
    {
      key: "SettingAccount",
      label: "Account Settings",
      iconName: "account-cog-outline",
    },
    { key: "logout", label: "Logout", iconName: "logout" },
  ];

  const handleMenuSelect = (itemKey: string) => {
    if (itemKey === "logout") {
      console.log("Logging out...");
    } else {
      navigation.navigate(itemKey);
    }
  };

  return (
    <View style={styles.menuContainer}>
      {menuItems.map((item) => (
        <TouchableOpacity
          key={item.key}
          style={styles.menuItem}
          onPress={() => handleMenuSelect(item.key)}
        >
          <Icon name={item.iconName} size={24} style={styles.icon} />
          <Text style={styles.menuItemText}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {},
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 10,
  },
  icon: {
    width: 24,
    textAlign: "center",
  },
});

export default VerticalMenu;
