import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import Navigation from "./navigation";
import { View, StyleSheet } from "react-native";
import Toast from "react-native-toast-message";
const Routers = () => {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Navigation />
        <Toast />
      </NavigationContainer>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "#f0f0f0",
  },
});

export default Routers;
