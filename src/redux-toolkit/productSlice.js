import { createSlice } from "@reduxjs/toolkit";
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

const initialState = {
  products: [],
  isLoading: false,
  error: false,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getProducts: (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
      state.error = false;
    },
    updateProducts: (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    },
  },
});

export const { getProducts, updateProducts } = productSlice.actions;
export const productReducer = productSlice.reducer;
