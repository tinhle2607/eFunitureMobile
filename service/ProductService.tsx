import axios from "axios";

import { Product } from "../interface";

const API_URL = "api";
const initialProducts: Product[] = [
  {
    id: "33",
    name: "Sản phẩm A",
    category: 1,
    description: "123456",
    imageUri:
      "https://i.pinimg.com/originals/bf/44/f0/bf44f0dce9873f824d00bfb9617f97b4.jpg",
    price: 200,
  },
  {
    id: "2",
    name: "Sản phẩm B",
    category: 1,
    description: "123456",
    imageUri:
      "https://i.pinimg.com/originals/bf/44/f0/bf44f0dce9873f824d00bfb9617f97b4.jpg",
    price: 200,
  },
  {
    id: "6",
    name: "Sản phẩm C",
    category: 1,
    description: "123456",
    imageUri:
      "https://i.pinimg.com/originals/bf/44/f0/bf44f0dce9873f824d00bfb9617f97b4.jpg",
    price: 200,
  },
];

const product: Product = {
  id: "6",
  name: "Sản phẩm C",
  category: 1,
  description: "123456",
  imageUri:
    "https://i.pinimg.com/originals/bf/44/f0/bf44f0dce9873f824d00bfb9617f97b4.jpg",
  price: 200,
};

class ProductService {
  static async getProductsByPage(
    page: number,
    searchName: string,
    category: string
  ) {
    return initialProducts;
    try {
      const response = await axios.get(`${API_URL}/Products`, {
        params: { page, searchName },
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
    return product;
    try {
      const response = await axios.get(`${API_URL}/Products/${ProductId}`);
      if (response.data.success !== true) {
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
