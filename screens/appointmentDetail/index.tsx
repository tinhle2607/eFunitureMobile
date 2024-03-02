import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { ObjectDetail, CustomDropdown } from "../../components";
import { Appointment } from "../../interface";
import { AppointmentService } from "../../service";
import { StatusGraph } from "../../helper";

const initalAppointment = {
  id: "",
  nameCustomer: " ",
  nameStaff: "",
  date: "",
  email: "",
  phone: "",
  time: "",
  status: 0,
  description: "",
};

const AppointmentDetailScreen = ({ route }) => {
  const { itemId } = route.params;
  const statusMapping = {
    1: "Pending",
    2: "Waiting",
    3: "Completed",
    4: "Cancelled",
  };
  const statusGraph = new StatusGraph();
  statusGraph.addEdge(2, 4);
  statusGraph.addEdge(1, 4);
  const appointmentFields = [
    { key: "nameCustomer", label: "Customer Name", type: "text" },
    { key: "nameStaff", label: "Staff Name", type: "text" },
    {
      key: "date",
      label: "Date",
      type: "text",
    },
    { key: "email", label: "Email", type: "text" },
    { key: "phone", label: "Phone", type: "text" },
    { key: "time", label: "Time", type: "text" },
    { key: "description", label: "Description", type: "text" },
  ];
  const [appointment, setAppointment] =
    useState<Appointment>(initalAppointment);
  const fetchAppointment = async () => {
    const response = await AppointmentService.getAppointmentById(itemId);
    setAppointment(response);
  };
  useEffect(() => {
    fetchAppointment();
  }, []);
  const onUpdateStatus = (AppointmentID: string, newStatus: number) => {
    AppointmentService.updateAppointmentStatus(AppointmentID, newStatus);
    fetchAppointment();
  };
  const nextStatusOptions = statusGraph
    .getNextStates(appointment.status)
    .map((status) => statusMapping[status]);

  return (
    <View>
      <ObjectDetail fields={appointmentFields} data={appointment} />
      <CustomDropdown
        key={appointment.id}
        currentValue={statusMapping[appointment.status]}
        options={nextStatusOptions}
        onSelect={(selectedValue) => {
          const newStatus = parseInt(
            Object.keys(statusMapping).find(
              (key) => statusMapping[key] === selectedValue
            ) || "0",
            10
          );
          onUpdateStatus(appointment.id, newStatus);
        }}
      />
    </View>
  );
};

export default AppointmentDetailScreen;
