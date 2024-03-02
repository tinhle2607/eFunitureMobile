import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_URL_ENV from "../app/config/api";

import Toast from "react-native-toast-message";
import { Account } from "../interface";

const API_URL = API_URL_ENV + `/Authentication`;
const account: Account = {
  dateOfBird: "20/3/2002",
  email: "bac@gamil.com",
  gender: "male",
  id: "231",
  name: "test",
  password: "32132",
  phoneNumber: "9038219381",
  userName: "test",
};
class AuthService {
  static async login(userName: string, password: string) {
    return axios
      .post(API_URL + "/Login", {
        userName,
        password,
      })
      .then((response) => {
        if (response.data.isSuccess && response.data.data) {
          AsyncStorage.setItem("user", JSON.stringify(response.data.data));

          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${response.data.data}`;
          Toast.show({
            type: "success",
            text1: "Login Successful",
          });
          return true;
        } else {
          Toast.show({
            type: "error",
            text1: response.data.message,
          });
        }
        return false;
      })
      .catch((error) => {
        Toast.show({
          type: "error",
          text1: "Error Login",
        });
        return false;
      });
  }
  static async register(
    userName: string,
    name: string,
    dateOfBird: string,
    gender: string,
    email: string,
    phoneNumber: string,
    password: string,
    passwordConfirm: string
  ) {
    return axios
      .post(API_URL + "/Register", {
        userName,
        name,
        dateOfBird,
        gender,
        email,
        phoneNumber,
        password,
        passwordConfirm,
      })
      .then((response) => {
        if (response.data.isSuccess) {
          Toast.show({
            type: "success",
            text1: "Register Successful",
          });
          return true;
        } else {
          Toast.show({
            type: "error",
            text1: response.data.message,
          });
        }
        return false;
      })
      .catch((error) => {
        Toast.show({
          type: "error",
          text1: "Error Register",
        });
        return false;
      });
  }

  static async logout() {
    AsyncStorage.removeItem("user");
    axios.defaults.headers.common["Authorization"] = "";
    Toast.show({
      type: "success",
      text1: "logout",
    });
  }

  static async getCurrentUser() {
    return account;
  }
  static async updateUser(
    name: string,
    dateOfBird: string,
    male: string,
    phoneNumber: string,
    email: string
  ) {
    return;
  }
}

export { AuthService as default };
