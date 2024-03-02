import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
const HorizontalMenu = () => {
  const navigation = useNavigation<any>();
  const menuItems = [
    {
      key: "ContactList",
      label: "Contact",
      iconName: "account-circle-outline",
    },

    { key: "Process", label: "Process", iconName: "cogs" },
    { key: "Order", label: "Order", iconName: "clipboard-text-outline" },
  ];

  return (
    <View style={styles.menuContainer}>
      {menuItems.map((item) => (
        <TouchableOpacity
          key={item.key}
          style={styles.menuItem}
          onPress={() => navigation.navigate(item.key)}
        >
          <Icon name={item.iconName} size={24} style={styles.icon} />
          <Text style={styles.menuItemText}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: "#fff",
  },
  menuItem: {
    alignItems: "center",
    padding: 5,
  },
  icon: {
    marginBottom: 5,
    color: "#000",
  },
  menuItemText: {
    fontSize: 12,
    color: "#000",
  },
});

export default HorizontalMenu;
