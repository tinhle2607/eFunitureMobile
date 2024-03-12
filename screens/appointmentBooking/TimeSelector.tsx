// TimeSelector.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const TimeSlot = ({ time, onSelectTime, isSelected }) => (
  <TouchableOpacity
    onPress={() => onSelectTime(time)}
    style={[styles.timeSlot, isSelected ? styles.timeSlotSelected : null]}
  >
    <Text style={styles.timeSlotText}>{time}</Text>
  </TouchableOpacity>
);

const TimeSelector = ({ selectedTime, onSelectTime }) => {
  const times = [
    "10:00",
    "11:00",
    "12:00",
    "13:30",
    "14:15",
    "15:00",
    "16:30",
    "17:00",
    "18:15",
  ];

  return (
    <View style={styles.timesContainer}>
      {times.map((time) => (
        <TimeSlot
          key={time}
          time={time}
          isSelected={selectedTime === time}
          onSelectTime={onSelectTime}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  timesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#fff",
  },
  timeSlot: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    margin: 5,
    borderRadius: 5,
  },
  timeSlotSelected: {
    backgroundColor: "red",
  },
  timeSlotText: {
    color: "#000",
  },
});

export default TimeSelector;
