import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Toast from "react-native-toast-message";
import axios from "axios";
import { Logo, TextInputField } from "../../components";
const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Passwords do not match",
      });
      return;
    }

    try {
      const endpoint = `${process.env.JWT_SECRET}/register`;
      const response = await axios.post(endpoint, {
        email: email,
        fullName: fullName,
        address: address,
        password: password,
      });

      if (response.status === 200 || response.status === 201) {
        Toast.show({
          type: "success",
          text1: "Registration Successful",
        });
        navigation.navigate("Login");
      } else {
        Toast.show({
          type: "error",
          text1: "Registration Failed",
          text2: response.data.message,
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Registration Error",
        text2: error.response
          ? error.response.data.message
          : "An error occurred. Please try again later.",
      });
    }
  };

  return (
    <View style={styles.container}>
      <Logo />
      <Text style={styles.header}>Register</Text>

      <TextInputField
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
        secureTextEntry={false}
      />
      <TextInputField
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        secureTextEntry={false}
      />
      <TextInputField
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
        secureTextEntry={false}
      />
      <TextInputField
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <TextInputField
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={true}
      />

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.loginText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  registerButton: {
    backgroundColor: "#0000ff",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  loginText: {
    color: "#0000ff",
    marginTop: 10,
  },
});

export default RegisterScreen;
