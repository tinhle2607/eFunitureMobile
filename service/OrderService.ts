import axios from "axios";

import { Item, Order, Status } from "../interface";

const API_URL = "api";
const initialOrders: Order[] = [
  {
    id: "33",
    address: "Order A",
    amount: 2000,
    pay: 100,
    status: 1,
  },
  {
    id: "12",
    address: "Order A",
    amount: 2000,
    pay: 100,
    status: 1,
  },
];

const order: Order = {
  id: "33",
  address: "Order A",
  amount: 2000,
  pay: 100,
  status: 1,
};
const initialItems: Item[] = [
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
const initialStatus: Status[] = [
  { id: "2", date: "14/2/2002", status: 1 },
  { id: "23", date: "23/2/2002", status: 2 },
  { id: "222", date: "24/2/2002", status: 3 },
];

class OrderService {
  static async getOrders(currentPage: number, status: number) {
    return initialOrders;
    try {
      const response = await axios.get(`${API_URL}/Orders`, {});
      if (response.data.success === true) {
        return response.data.data;
      } else {
        // toast.error(response.data.message);
      }
    } catch (error) {
      //   toast.error("Something went wrong");
    }
  }

  static async getTotalPages() {
    return 40;
    try {
      const response = await axios.get(`${API_URL}/Orders/total-pages`, {});
      if (response.data.success === true) {
        return response.data.data;
      } else {
        // toast.error(response.data.message);
      }
    } catch (error) {
      //   toast.error("Something went wrong");
    }
  }
  static async getItemOrder(OrderID: string) {
    return initialItems;
    try {
      const response = await axios.get(`${API_URL}/Orders/total-pages`, {});
      if (response.data.success === true) {
        return response.data.data;
      } else {
        // toast.error(response.data.message);
      }
    } catch (error) {
      //   toast.error("Something went wrong");
    }
  }
  static async getOrder(OrderID: string) {
    return order;
  }
  static async getOrderStatus(OrderID: string) {
    return initialStatus;
  }
}

export { OrderService as default };
