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
  products: JSON.parse(sessionStorage.getItem("items")) || [],
  page: parseInt(sessionStorage.getItem("page")) || 1,
  selectedQty: parseInt(sessionStorage.getItem("selectedQty")) || 10,
  isLoading: false,
  error: false,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    reset: (state) => {
      state.page = 1;
      state.selectedQty = 10;
    },
    changePage: (state, action) => {
      state.page = action.payload;
    },
    changeQty: (state, action) => {
      state.selectedQty = action.payload;
    },
    getProducts: (state, action) => {
      state.products = action.payload;
    },
    updateProducts: (state, action) => {
      console.log(action.payload);
      let products = action.payload;
      console.log(products);
      let perPage = products.length / parseInt(state.selectedQty);
      let totalPage = products.length / perPage;
      let itemsQty = products?.slice(
        totalPage * (state.page - 1),
        totalPage * state.page
      );

      sessionStorage.setItem("perpage", perPage);
      sessionStorage.setItem("totalPage", totalPage);

      console.log(products);
      console.log(perPage);
      console.log(totalPage);
      console.log(itemsQty);

      state.products = itemsQty;
      state.page = perPage;
    },
  },
});

export const { reset, changePage, changeQty, getProducts, updateProducts } =
  productSlice.actions;
export const productReducer = productSlice.reducer;
