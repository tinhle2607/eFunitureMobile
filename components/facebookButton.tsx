// components/FacebookButton.js
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const FacebookButton = () => {
  return (
    <TouchableOpacity style={styles.facebookButton}>
      <Text style={styles.facebookButtonText}>Log in with Facebook</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  facebookButton: {
    backgroundColor: "#3b5998",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 20,
    width: "100%",
    alignItems: "center",
  },
  facebookButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default FacebookButton;
