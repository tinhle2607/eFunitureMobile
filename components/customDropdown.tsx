import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
} from "react-native";

interface CustomDropdownProps {
  options: string[];
  onSelect: (value: string) => void;
  currentValue: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  onSelect,
  currentValue,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsVisible(true)}
      >
        <Text>{currentValue}</Text>
      </TouchableOpacity>
      <Modal visible={isVisible} transparent={true} animationType="slide">
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setIsVisible(false)}
        >
          <View style={styles.modalContent}>
            <ScrollView>
              {options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.option}
                  onPress={() => {
                    onSelect(option);
                    setIsVisible(false);
                  }}
                >
                  <Text>{option}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: "#ddd",
    marginBottom: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    width: "80%",
    maxHeight: "60%",
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
});

export default CustomDropdown;
