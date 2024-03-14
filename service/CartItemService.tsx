import axios from "axios";

import { Item, Voucher } from "../interface";
import API_URL_ENV from "../app/config/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

const API_URL = API_URL_ENV + `/Cart`;
const API_URL_ORDER = API_URL_ENV + `/Order`;
const initialCartItems: Item[] = [
  {
    id: "33",
    image:
      "https://i.pinimg.com/originals/bf/44/f0/bf44f0dce9873f824d00bfb9617f97b4.jpg",
    name: "Loli 1",
    price: 200,
    quantity: 3,
  },
  {
    id: "4",
    image:
      "https://i.pinimg.com/originals/bf/44/f0/bf44f0dce9873f824d00bfb9617f97b4.jpg",
    name: "Loli 2",
    price: 200,
    quantity: 3,
  },
  {
    id: "93",
    image:
      "https://i.pinimg.com/originals/bf/44/f0/bf44f0dce9873f824d00bfb9617f97b4.jpg",
    name: "Loli 3",
    price: 200,
    quantity: 3,
  },
];

const cartItem: Item = {
  id: "93",
  image:
    "https://i.pinimg.com/originals/bf/44/f0/bf44f0dce9873f824d00bfb9617f97b4.jpg",
  name: "Loli 3",
  price: 200,
  quantity: 3,
};

class CartItemService {
  static async getCartItem() {
    const accessToken = await AsyncStorage.getItem("accessToken");
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    try {
      const response = await axios.get(`${API_URL}/GetItemsInCart`);
      if (response.data.isSuccess === true) {
        response.data.data.map((item) => {
          item.id = item.productId;
          item.name = item.productName;
        });
        return response.data.data;
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

  static async getCartItemById(CartItemId: string) {
    return cartItem;
    try {
      const response = await axios.get(`${API_URL}/CartItems/${CartItemId}`);
      if (response.data.success !== true) {
        return response.data.data;
      } else {
        // toast.error(response.data.message);
      }
    } catch (error) {
      //   toast.error("Something went wrong");
    }
  }
  static async deleteCartItem(CartItemId: string) {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      const response = await axios.delete(`${API_URL}/DeleteProductInCart`, {
        params: { productId: CartItemId },
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
  static async addQuantity(CartItemId: string) {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      const response = await axios.put(
        `${API_URL}/IncreaseProductInCart`,
        null,
        {
          params: { productId: CartItemId },
        }
      );
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
  static async reduceQuantity(CartItemId: string) {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      const response = await axios.put(
        `${API_URL}/DecreaseProductInCart`,
        null,
        {
          params: { productId: CartItemId },
        }
      );
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
  static async checkout(VoucherID: string, account: any) {
    if (VoucherID === null) VoucherID = "";
    console.log(account);
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      const response = await axios.post(`${API_URL_ORDER}/CheckOut`, {
        phoneNumber: account.phoneNumber,
        email: account.email,
        address: account.address,
        name: account.name,
        voucherId: VoucherID,
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

export { CartItemService as default };
