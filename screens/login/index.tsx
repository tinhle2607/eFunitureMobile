import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Logo, DynamicForm } from "../../components";
import { AuthService } from "../../service";
interface FormFieldDefinition {
  type: "text" | "date" | "picker" | "password";
  key: string;
  label: string;
  value: string | Date;
  options?: { label: string; value: string }[];
}
const LoginScreen = ({ navigation }) => {
  const formFields: FormFieldDefinition[] = [
    { type: "text", key: "userName", label: "User Name", value: "" },
    { type: "password", key: "password", label: "Password", value: "" },
  ];
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });
  const handleFormChange = (key: string, value: string | Date) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleLogin = async () => {
    const response = await AuthService.login(
      formData.userName,
      formData.password
    );
    if (response) navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Logo />
      <Text style={styles.welcome}>Welcome</Text>

      <DynamicForm
        formFields={formFields.map((field) => ({
          ...field,
          value: formData[field.key],
        }))}
        onChange={handleFormChange}
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
