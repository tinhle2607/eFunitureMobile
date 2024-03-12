import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

interface Field {
  key: string;
  label: string;
  type: string;
  options?: { label: string; value: any }[];
}

interface UpdateObjectProps {
  fields: Field[];
  initialData: { [key: string]: any };
  onUpdate: (updatedData: { [key: string]: any }) => void;
}

const UpdateObject: React.FC<UpdateObjectProps> = ({
  fields,
  initialData,
  onUpdate,
}) => {
  const [data, setData] = useState(initialData);
  const handlePressDate = () => {
    setIsSelectDate(true);
  };
  const [isSelectDate, setIsSelectDate] = useState(false);
  const handleChange = (key: string, value: any) => {
    setData({ ...data, [key]: value });
  };
  const handleUpdate = () => {
    onUpdate(data);
  };

  const renderInput = (field: Field) => {
    switch (field.type) {
      case "text":

      case "password":
        return (
          <TextInput
            style={styles.input}
            onChangeText={(value) => handleChange(field.key, value)}
            value={data[field.key] || ""}
            secureTextEntry={field.type === "password"}
          />
        );
      case "select":
        return (
          <Picker
            selectedValue={data[field.key]}
            onValueChange={(itemValue, itemIndex) =>
              handleChange(field.key, itemValue)
            }
            style={styles.picker}
          >
            {field.options?.map((option) => (
              <Picker.Item
                label={option.label}
                value={option.value}
                key={option.value}
              />
            ))}
          </Picker>
        );
      case "date":
        return (
          <>
            {isSelectDate && (
              <DateTimePicker
                value={data[field.key] ? new Date(data[field.key]) : new Date()}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  // Format the selected date to ISO string without time part
                  const currentDate = selectedDate
                    ? selectedDate.toISOString().split("T")[0]
                    : data[field.key];
                  handleChange(field.key, currentDate);
                  setIsSelectDate(false);
                }}
                style={styles.datePicker}
              />
            )}
            <TouchableOpacity onPress={handlePressDate}>
              <Text style={styles.dateInput}>
                {data[field.key]
                  ? new Date(data[field.key]).toLocaleDateString()
                  : new Date().toLocaleDateString()}
              </Text>
            </TouchableOpacity>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {fields.map((field) => (
        <View key={field.key} style={styles.fieldContainer}>
          <Text style={styles.label}>{field.label}</Text>
          {renderInput(field)}
        </View>
      ))}
      <Button title="Update" onPress={handleUpdate} color="#007bff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  picker: {
    height: 50,
    width: "100%",
  },
  datePicker: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  selectedDateText: {
    // Styles for the selected date text
    fontSize: 16,
    color: "#000",
    marginTop: 10,
    // Add more styling as per your requirement
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
});

export default UpdateObject;
