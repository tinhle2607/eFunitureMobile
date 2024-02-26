import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Toast from "react-native-toast-message";
import axios from "axios";
import { Logo, FacebookButton, TextInputField } from "../../components";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const endpoint = `${process.env.JWT_SECRET}/login`;
      const response = await axios.post(endpoint, {
        email: email,
        password: password,
      });

      const { data } = response;

      if (response.status === 200) {
        Toast.show({
          type: "success",
          text1: "Login Successful",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Login Failed",
          text2: data.message,
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Login Error",
        text2: error.response
          ? error.response.data.message
          : "An error occurred. Please try again later.",
      });
    }
  };

  return (
    <View style={styles.container}>
      <Logo />
      <Text style={styles.welcome}>Welcome</Text>

      <TextInputField
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        secureTextEntry={false}
      />
      <TextInputField
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />

      <TouchableOpacity>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.signUpText}>Don't have an account? Sign Up</Text>
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
  welcome: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

  forgotPasswordText: {
    color: "#0000ff",
  },
  loginButton: {
    backgroundColor: "#0000ff",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  signUpText: {
    color: "#0000ff",
    marginTop: 10,
  },
});

export default LoginScreen;
