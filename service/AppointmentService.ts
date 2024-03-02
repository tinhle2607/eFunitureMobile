import axios from "axios";

import { Appointment } from "../interface";

const API_URL = "api";
const initialAppointments: Appointment[] = [
  {
    id: "66",
    nameCustomer: "Cus A",
    nameStaff: "Nhân viên A",
    date: "20/10/2022",
    phone: "098765431",
    time: "2:00 AM",
    email: "a@gamil.com",
    description: "Muốn đóng khung cửa sổ",
    status: 1,
  },
  {
    id: "63",
    nameCustomer: "Cus A",
    nameStaff: "Nhân viên A",
    date: "20/10/2022",
    phone: "098765431",
    time: "2:00 AM",
    email: "a@gamil.com",
    description: "Muốn đóng khung cửa sổ",
    status: 1,
  },
];

const appointment: Appointment = {
  id: "5",
  nameCustomer: "Cus A",
  nameStaff: null,
  date: "20/10/2022",
  phone: "098765431",
  time: "2:00 AM",
  email: "a@gamil.com",
  description: "Muốn đóng khung cửa sổ",
  status: 1,
};

class AppointmentService {
  static async getAppointmentsByPage(page: number) {
    return initialAppointments;
    try {
      const response = await axios.get(`${API_URL}/appointments`, {
        params: { page },
      });
      if (response.data.success === true) {
        return response.data.data;
      } else {
        // // toast.error(response.data.message);
      }
    } catch (error) {
      //   // toast.error("Something went wrong");
    }
  }

  static async getTotalPages() {
    return 40;
    try {
      const response = await axios.get(`${API_URL}/appointments/total-pages`);
      if (response.data.success === true) {
        return response.data.data;
      } else {
        // // toast.error(response.data.message);
      }
    } catch (error) {
      //   // toast.error("Something went wrong");
    }
  }

  static async createAppointment(
    date: string,
    time: string,
    name: string,
    phone: string
  ) {
    console.log(date);
    console.log(time);
    console.log(name);
    console.log(phone);
    // // toast.success(
    //   `Created appointment with description: ${appointmentData.email}`
    // );
    return;
    try {
      const response = await axios.post(`${API_URL}/appointments`);
      if (response.data.success !== true) {
        return response.data.data;
      } else {
        // // toast.error(response.data.message);
      }
    } catch (error) {
      // toast.error("Something went wrong");
    }
  }

  static async updateAppointment(appointmentData: Appointment) {
    // toast.success(`Updated appointment with ID: ${appointmentData.id}`);
    return;
    try {
      const response = await axios.put(
        `${API_URL}/appointments/${appointmentData.id}`,
        appointmentData
      );
      if (response.data.success !== true) {
        // toast.success(response.data.message);
      } else {
        // toast.error(response.data.message);
      }
    } catch (error) {
      // toast.error("Something went wrong");
    }
  }
  static async updateAppointmentStatus(
    appointmentID: string,
    newStatus: number
  ) {
    console.log(appointmentID + newStatus);
    // toast.success(`Updated appointment with ID: ${appointmentData.id}`);
    return;
    try {
      // const response = await axios.put(
      //   `${API_URL}/appointments/${appointmentData.id}`,
      //   appointmentData
      // );
      // if (response.data.success !== true) {
      // toast.success(response.data.message);
      // } else {
      //   // toast.error(response.data.message);
      // }
    } catch (error) {
      // toast.error("Something went wrong");
    }
  }

  static async getAppointmentById(appointmentId: string) {
    return appointment;
    try {
      const response = await axios.get(
        `${API_URL}/appointments/${appointmentId}`
      );
      if (response.data.success !== true) {
        return response.data.data;
      } else {
        // toast.error(response.data.message);
      }
    } catch (error) {
      // toast.error("Something went wrong");
    }
  }
}

export { AppointmentService as default };