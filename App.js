import React from "react";
import { View, StyleSheet } from "react-native";
import Routes from "./app/config/routers";

const App = () => {
  return (
    <>
      <Routes />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;