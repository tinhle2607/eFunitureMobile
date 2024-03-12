import axios from "axios";

import { Account } from "../interface";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_URL_ENV from "../app/config/api";

const API_URL = API_URL_ENV + `/Cart`;

class CartService {
  static async addToCart(quantity: number, productID: string) {
    const accessToken = await AsyncStorage.getItem("accessToken");
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    try {
      const response = await axios.post(`${API_URL}/AddProduct`, {
        productId: productID,
        quantity: quantity,
      });
      if (response.data.isSuccess === true) {
        Toast.show({
          type: "success",
          text1: response.data.message,
        });
      } else {
        Toast.show({
          type: "error",
          text1: response.data.message,
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Something went wrong",
      });
    }
  }
}

export { CartService as default };
