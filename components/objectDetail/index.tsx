import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";

interface Field {
  key: string;
  label: string;
  type: string;
  formatter?: (value: any) => string;
}

interface ObjectDetailProps {
  fields: Field[];
  data: { [key: string]: any };
}

const ObjectDetail: React.FC<ObjectDetailProps> = ({ fields, data }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {fields.map((field) => {
        switch (field.type) {
          case "text":
            return (
              <View key={field.key} style={styles.fieldContainer}>
                <Text style={styles.label}>{field.label}</Text>
                <Text style={styles.value}>
                  {field.formatter
                    ? field.formatter(data[field.key])
                    : data[field.key]}
                </Text>
              </View>
            );
          case "image":
            return (
              <View key={field.key} style={styles.fieldContainer}>
                <Image source={{ uri: data[field.key] }} style={styles.image} />
              </View>
            );

          default:
            return null;
        }
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  fieldContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 15,
    width: "90%",
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  value: {
    color: "#333",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
  },
});

export default ObjectDetail;
