import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AuthService } from "../../service";
import { Logo, TextInputField, DynamicForm } from "../../components";
interface FormFieldDefinition {
  type: "text" | "date" | "picker" | "password";
  key: string;
  label: string;
  value: string | Date;
  options?: { label: string; value: string }[];
}
const RegisterScreen = ({ navigation }) => {
  const formFields: FormFieldDefinition[] = [
    { type: "text", key: "userName", label: "User Name", value: "" },
    { type: "text", key: "name", label: "Name", value: "" },
    {
      type: "date",
      key: "dateOfBirth",
      label: "Date of Birth",
      value: new Date(),
    },
    {
      type: "picker",
      key: "gender",
      label: "Gender",
      value: "male",
      options: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
        { label: "Other", value: "other" },
      ],
    },
    { type: "text", key: "email", label: "Email", value: "" },
    { type: "text", key: "phoneNumber", label: "Phone Number", value: "" },
    { type: "password", key: "password", label: "Password", value: "" },
    {
      type: "password",
      key: "passwordConfirm",
      label: "Confirm Password",
      value: "",
    },
  ];
  const [formData, setFormData] = useState({
    userName: "",
    name: "",
    dateOfBirth: new Date(),
    gender: "",
    email: "",
    phoneNumber: "",
    password: "",
    passwordConfirm: "",
  });
  const handleFormChange = (key: string, value: string | Date) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleRegister = async () => {
    const response = await AuthService.register(
      formData.userName,
      formData.name,
      formData.dateOfBirth.toISOString(),
      formData.gender,
      formData.email,
      formData.phoneNumber,
      formData.password,
      formData.password
    );
    if (response) navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Logo />
      <Text style={styles.header}>Register</Text>

      <DynamicForm
        formFields={formFields.map((field) => ({
          ...field,
          value: formData[field.key],
        }))}
        onChange={handleFormChange}
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
