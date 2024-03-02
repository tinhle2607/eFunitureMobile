import axios from "axios";

import { Transaction } from "../interface";

const API_URL = "api";
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
  static async getTransactionsByPage(currentPage: number) {
    return initialTransactions;
    try {
      const response = await axios.get(`${API_URL}/Transactions`, {});
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
      const response = await axios.get(
        `${API_URL}/Transactions/total-pages`,
        {}
      );
      if (response.data.success === true) {
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
