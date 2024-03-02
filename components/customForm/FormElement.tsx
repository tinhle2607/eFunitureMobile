import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import TextInputField from "../textInputField";

interface FormFieldProps {
  type: "text" | "date" | "picker" | "password";
  label: string;
  value: string | Date;
  onChangeText?: (text: string) => void;
  onDateChange?: (selectedDate: Date) => void;
  options?: { label: string; value: string }[];
}

const FormElement: React.FC<FormFieldProps> = ({
  type,
  label,
  value,
  onChangeText,
  onDateChange,
  options,
}) => {
  const [isSelectDate, setIsSelectDate] = useState(false);
  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    // Call the onDateChange handler if it exists
    setIsSelectDate(false);
    if (onDateChange && selectedDate) {
      onDateChange(selectedDate);
    }
  };
  const handlePressDate = () => {
    setIsSelectDate(true);
  };
  switch (type) {
    case "password":
      return (
        <TextInputField
          placeholder={label}
          value={value as string}
          onChangeText={onChangeText}
          secureTextEntry={true}
        />
      );
    case "text":
      return (
        <TextInputField
          placeholder={label}
          value={value as string}
          onChangeText={onChangeText}
          secureTextEntry={false}
        />
      );
    case "date":
      return (
        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={handlePressDate}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.dateInput}>
              {(value as Date).toISOString().split("T")[0]}
            </Text>
          </TouchableOpacity>
          {isSelectDate && (
            <DateTimePicker
              value={value as Date}
              mode="date"
              display="spinner"
              onChange={handleDateChange}
            />
          )}
        </View>
      );
    case "picker":
      return (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{label}</Text>
          <Picker
            selectedValue={value as string}
            onValueChange={(itemValue, itemIndex) => onChangeText?.(itemValue)}
            style={styles.picker}
          >
            {options?.map((option, index) => (
              <Picker.Item
                key={index}
                label={option.label}
                value={option.value}
              />
            ))}
          </Picker>
        </View>
      );
    default:
      return null;
  }
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  dateInput: {
    height: 40,
    lineHeight: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    textAlign: "center",
  },
  picker: {
    height: 50,
    width: "100%",
  },
});

export default FormElement;
