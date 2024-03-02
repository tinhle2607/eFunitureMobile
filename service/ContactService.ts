import axios from "axios";

import { Contact, Item } from "../interface";

const API_URL = "api";
const initialContacts: Contact[] = [
  {
    id: "231",
    date: "20/10/2019",
    title: "Ghế tình yêu",
    description: "Làm ghế lung linh",
    value: 1000,
    pay: 500,
    status: 1,
  },
  {
    id: "2312",
    date: "20/10/2019",
    title: "Ghế tình yêu",
    description: "Làm ghế lung linh",
    value: 1000,
    pay: 500,
    status: 2,
  },
  {
    id: "2331",
    date: "20/10/2019",
    title: "Ghế tình yêu",
    description: "Làm ghế lung linh",
    value: 1000,
    pay: 500,
    status: 3,
  },
];
const contact: Contact = {
  id: "2331",
  date: "20/10/2019",
  title: "Ghế tình yêu",
  description: "Làm ghế lung linh",
  value: 1000,
  pay: 500,
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

class ContactService {
  static async getContactsByPage(currentPage: number, status: number) {
    return initialContacts;
    try {
      const response = await axios.get(`${API_URL}/Contacts`, {});
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
      const response = await axios.get(`${API_URL}/Contacts/total-pages`, {});
      if (response.data.success === true) {
        return response.data.data;
      } else {
        // toast.error(response.data.message);
      }
    } catch (error) {
      //   toast.error("Something went wrong");
    }
  }
  static async updateStatus(idContact, newStatus) {
    return;
  }
  static async getContactById(idContact) {
    return contact;
  }
  static async getItemContact(idContact) {
    return initialItems;
  }
}

export { ContactService as default };
