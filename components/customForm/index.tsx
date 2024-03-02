import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import FormElement from "./FormElement";
interface FormFieldDefinition {
  type: "text" | "date" | "picker" | "password";
  key: string;
  label: string;
  value: string | Date;
  options?: { label: string; value: string }[];
}

interface DynamicFormProps {
  formFields: FormFieldDefinition[];
  onChange: (key: string, value: string | Date) => void;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ formFields, onChange }) => {
  const handleTextChange = (key: string, value: string) => {
    onChange(key, value);
  };

  const handleDateChange = (key: string, value: Date) => {
    onChange(key, value);
  };
  return (
    <View style={styles.container}>
      {formFields.map((field) => (
        <FormElement
          key={field.key}
          type={field.type}
          label={field.label}
          value={field.value}
          onChangeText={(text) => handleTextChange(field.key, text)}
          onDateChange={(date) => handleDateChange(field.key, date)}
          options={field.type === "picker" ? field.options : undefined}
        />
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {},
});
export default DynamicForm;
