import axios from "axios";

const API_URL = process.env.REACT_APP_URL;

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
};
