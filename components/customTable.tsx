import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ListRenderItemInfo,
} from "react-native";
import CustomDropdown from "./customDropdown";
import { StatusGraph } from "../helper";

interface Item {
  id: number;
  name: string;
  description: string;
  status: number;
}

interface Action {
  label: string;
  onPress: (item: Item) => void;
}

interface CustomTableProps {
  data: Item[];
  statusGraph: StatusGraph;
  onUpdateStatus: (id: number, newStatus: number) => void;
  statusMapping: { [key: number]: string };
}

const CustomTable: React.FC<CustomTableProps> = ({
  data,
  statusGraph,
  onUpdateStatus,
  statusMapping,
}) => {
  const renderItem = ({ item }: ListRenderItemInfo<Item>) => {
    const nextStatusOptions = statusGraph
      .getNextStates(item.status)
      .map((status) => statusMapping[status]);

    return (
      <View style={styles.row}>
        <Text style={styles.text}>{item.name}</Text>
        <Text style={styles.text}>{item.description}</Text>
        <CustomDropdown
          currentValue={statusMapping[item.status]}
          options={nextStatusOptions}
          onSelect={(selectedValue) => {
            const newStatus = parseInt(
              Object.keys(statusMapping).find(
                (key) => statusMapping[key] === selectedValue
              ) || "0",
              10
            );
            onUpdateStatus(item.id, newStatus);
          }}
        />
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  text: {
    fontSize: 16,
  },
});

export default CustomTable;
