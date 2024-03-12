import axios from "axios";

import { Category } from "../interface";
import API_URL_ENV from "../app/config/api";
import Toast from "react-native-toast-message";

const API_URL = API_URL_ENV + `/Category`;
const initialCategories: Category[] = [
  {
    id: "33",
    name: "Category A",
  },
  {
    id: "2",
    name: "Category B",
  },
  {
    id: "6",
    name: "Category C",
  },
];

const category: Category = {
  id: "6",
  name: "Category C",
};

class CategoryService {
  static async getCategories() {
    try {
      const response = await axios.get(`${API_URL}/GetCategories`, {});
      if (response.data.isSuccess === true) {
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
        text1: "Error server",
      });
    }
  }

  static async getTotalPages() {
    return 40;
    try {
      const response = await axios.get(`${API_URL}/Categories/total-pages`, {});
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

export { CategoryService as default };
