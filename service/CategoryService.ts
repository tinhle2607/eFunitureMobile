import axios from "axios";

import { Category } from "../interface";

const API_URL = "api";
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
    return initialCategories;
    try {
      const response = await axios.get(`${API_URL}/Categories`, {});
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
