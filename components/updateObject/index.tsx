import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

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
});

export default UpdateObject;
