import axios from "axios";

import { Product } from "../interface";
import Toast from "react-native-toast-message";
import API_URL_ENV from "../app/config/api";

const API_URL = API_URL_ENV + `/Product`;
const initialProducts: Product[] = [];

const product: Product = {
  id: "",
  name: "",
  categoryId: "",
  description: "",
  categoryName: "",
  image: "ldsald",
  inventoryQuantity: 0,
  status: 0,
  price: 200,
};

class ProductService {
  static async getProductsByPage(
    page: number,
    searchName: string,
    category: string,
    price: any
  ) {
    try {
      const response = await axios.get(`${API_URL}/FilterProducts2`, {
        params: {
          page: page,
          productName: searchName,
          categoryId: category,
          minPrice: price.min,
          maxPrice: price.max,
          pageSize: 10,
        },
      });
      if (response.data.isSuccess === true) {
        return response.data.data;
      } else {
        Toast.show({
          type: "error",
          text1: response.data.messages,
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error server",
      });
    }
  }

  static async getTotalPages(
    page: number,
    searchName: string,
    category: string
  ) {
    return 40;
    try {
      const response = await axios.get(`${API_URL}/Products/total-pages`, {
        params: { searchName },
      });
      if (response.data.success === true) {
        return response.data.data;
      } else {
        // toast.error(response.data.message);
      }
    } catch (error) {
      //   toast.error("Something went wrong");
    }
  }

  static async getProductById(ProductId: string) {
    try {
      const response = await axios.get(`${API_URL}/GetProductByID`, {
        params: {
          id: ProductId,
        },
      });
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

export { ProductService as default };
