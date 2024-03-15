import axios from "axios";

import { Transaction } from "../interface";
import API_URL_ENV from "../app/config/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = API_URL_ENV + `/Transaction`;
const initialTransactions: Transaction[] = [
  {
    id: "231",
    Amount: 100,
    BalanceRemain: 123123,
    context: "Đêm qua em tuyệt lắm",
    date: "20/3/2002",
    from: "MOMO",
    to: "system",
    type: 1,
  },
  {
    id: "3123",
    Amount: 100,
    BalanceRemain: 123123,
    context: "Đêm qua em tuyệt lắm",
    date: "20/3/2002",
    from: "MOMO",
    to: "system",
    type: 1,
  },
  {
    id: "31223",
    Amount: 100,
    BalanceRemain: 123123,
    context: "Đêm qua em tuyệt lắm",
    date: "20/3/2002",
    from: "MOMO",
    to: "system",
    type: 1,
  },
];

class TransactionService {
  static async getTransactionsByPage(
    currentPage: number,
    startDate: string,
    endDate: string
  ) {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      const response = await axios.get(
        `${API_URL}/FilterTransactionByLogin?FromTime=${startDate}&ToTime=${endDate}&PageIndex=${currentPage}&PageSize=10`
      );
      console.log(response.data.data);
      if (response.data.isSuccess === true) {
        return response.data.data;
      } else {
        // toast.error(response.data.message);
      }
    } catch (error) {
      //   toast.error("Something went wrong");
    }
  }

  static async getTransactionById(id: string) {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      const response = await axios.get(
        `${API_URL}/GetTransactionById?transactionId=${id}`,
        {}
      );
      if (response.data.isSuccess === true) {
        return response.data.data;
      } else {
        // toast.error(response.data.message);
      }
    } catch (error) {
      //   toast.error("Something went wrong");
    }
  }
}

export { TransactionService as default };
