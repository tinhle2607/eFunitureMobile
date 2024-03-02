import axios from "axios";

import { Status, Item } from "../interface";

const API_URL = "api";

const initialItems: Item = {
  id: "33",
  image:
    "https://i.pinimg.com/originals/bf/44/f0/bf44f0dce9873f824d00bfb9617f97b4.jpg",
  name: "Loli 1",
  price: 200,
  quantity: 3,
};
const initialStatus: Status[] = [
  { id: "2", date: "14/2/2002", status: 1 },
  { id: "23", date: "23/2/2002", status: 2 },
  { id: "222", date: "24/2/2002", status: 3 },
];

class OrderProcessingService {
  static async getOrderProcessing(idOrderProcessing: string) {
    return initialItems;
    try {
      const response = await axios.get(`${API_URL}/OrderProcessings`, {});
      if (response.data.success === true) {
        return response.data.data;
      } else {
        // toast.error(response.data.message);
      }
    } catch (error) {
      //   toast.error("Something went wrong");
    }
  }
  static async getOrderStatus(OrderID: string) {
    return initialStatus;
  }
}

export { OrderProcessingService as default };
