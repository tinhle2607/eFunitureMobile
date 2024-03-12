import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_URL_ENV from "../app/config/api";

import Toast from "react-native-toast-message";
import { Account } from "../interface";

const API_URL = API_URL_ENV + `/Authentication`;
const account: Account = {
  id: "",
  name: "",
  email: "",
  password: "",
  address: "",
  wallet: 0,
  roles: "",
  dateOfBird: "",
  gender: "",
  phoneNumber: "",
  lockoutEnd: "",
};

class AuthService {
  static async login(userName: string, password: string) {
    try {
      const response = await axios.post(API_URL + "/Login", {
        userName,
        password,
      });

      if (response.data.isSuccess && response.data.data) {
        await AsyncStorage.setItem(
          "accessToken",
          response.data.data.accessToken
        );
        await AsyncStorage.setItem(
          "refreshToken",
          response.data.data.refreshToken
        );
        await AsyncStorage.setItem("user", "true");
        // const accessToken = await AsyncStorage.getItem("accessToken");
        // Toast.show({
        //   type: "success",
        //   text1: accessToken,
        // });
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
    } catch (error) {
      console.error("Error Login:", error);
      Toast.show({
        type: "error",
        text1: "Error Login",
      });
    }

    return false;
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
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("refreshToken");
    axios.defaults.headers.common["Authorization"] = "";
    Toast.show({
      type: "success",
      text1: "logout",
    });
  }

  static async reNewToken() {
    const refreshToken = await AsyncStorage.getItem("refreshToken");
    const accessToken = await AsyncStorage.getItem("accessToken");
    try {
      delete axios.defaults.headers.common["Authorization"];
      const response = await axios.post(API_URL + "/RenewToken", {
        refreshToken: refreshToken,
        accessToken: accessToken,
      });

      if (response.data.isSuccess === true) {
        await AsyncStorage.setItem(
          "accessToken",
          response.data.data.accessToken
        );
        await AsyncStorage.setItem(
          "refreshToken",
          response.data.data.refreshToken
        );
        await AsyncStorage.setItem("user", "true");

        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.data.accessToken}`;
      }
      return;
    } catch (error) {
      console.error("Error renewing token:", error);
    }
    await AsyncStorage.removeItem("user");

    return;
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
