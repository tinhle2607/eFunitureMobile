import axios from "axios";

import { Item, Voucher } from "../interface";

const API_URL = "api";
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
    return initialCartItems;
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
    return;
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
  static async addQuantity(CartItemId: string) {
    return;
  }
  static async reduceQuantity(CartItemId: string) {
    return;
  }
  static async checkout(
    CartItemID: string[],
    VoucherID: string[],
    price: number
  ) {
    return;
  }
}

export { CartItemService as default };
