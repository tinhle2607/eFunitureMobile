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
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:30 PM",
    "2:15 PM",
    "3:00 PM",
    "4:30 PM",
    "5:00 PM",
    "6:15 PM",
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
