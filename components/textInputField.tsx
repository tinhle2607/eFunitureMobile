// components/TextInputField.js
import React from "react";
import { TextInput, StyleSheet } from "react-native";

const TextInputField = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
}) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      autoCapitalize="none"
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    fontSize: 16,
  },
});

export default TextInputField;
