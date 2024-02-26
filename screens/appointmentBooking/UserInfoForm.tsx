// UserInfoForm.js
import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

const UserInfoForm = ({
  fullName,
  setFullName,
  contactNumber,
  setContactNumber,
}) => (
  <View style={styles.formContainer}>
    <TextInput
      style={styles.input}
      placeholder="Full Name"
      value={fullName}
      onChangeText={setFullName}
    />
    <TextInput
      style={styles.input}
      placeholder="Contact Number"
      value={contactNumber}
      onChangeText={setContactNumber}
    />
  </View>
);

const styles = StyleSheet.create({
  formContainer: {
    margin: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
});

export default UserInfoForm;
