// AppointmentBookingPage.js
import React, { useState } from "react";
import { ScrollView, StyleSheet, View, Button } from "react-native";
import DateSelector from "./DateSelector";
import TimeSelector from "./TimeSelector";
import UserInfoForm from "./UserInfoForm";
import Toast from "react-native-toast-message";
import Axios from "axios";

const AppointmentBookingPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [fullName, setFullName] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  const handleSubmit = async () => {
    const endpoint = `${process.env.JWT_SECRET}/appointment`;
    if (!selectedDate || !selectedTime || !fullName || !contactNumber) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Vui lòng điền đầy đủ thông tin.",
      });
      return;
    }

    const appointmentData = {
      date: selectedDate.toISOString(),
      time: selectedTime,
      fullName: fullName,
      contactNumber: contactNumber,
    };

    try {
      const response = await Axios.post(endpoint, appointmentData);

      Toast.show({
        type: "success",
        text1: "Booking successful!",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Booking failed",
      });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <DateSelector
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
      />
      <TimeSelector
        selectedTime={selectedTime}
        onSelectTime={setSelectedTime}
      />
      <UserInfoForm
        fullName={fullName}
        setFullName={setFullName}
        contactNumber={contactNumber}
        setContactNumber={setContactNumber}
      />
      <View style={styles.buttonContainer}>
        <Button title="Submit Appointment" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    margin: 20,
  },
});

export default AppointmentBookingPage;
