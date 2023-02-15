import axios from "axios";

const API_URL = "https://dummyjson.com/products?limit=100";

export const fetchProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
};
