import { createSlice } from "@reduxjs/toolkit";

const productStorage = JSON.parse(sessionStorage.getItem("items"));
const pageStorage = parseInt(sessionStorage.getItem("page"));
const selectedQtyStorage = parseInt(sessionStorage.getItem("selectedQty"));

const initialState = {
  products: productStorage || [],
  page: pageStorage || 1,
  selectedQty: selectedQtyStorage || 10,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    changePage: (state, action) => {
      state.page = action.payload;
    },
    changeQty: (state, action) => {
      state.selectedQty = action.payload;
    },

    updateProducts: (state, action) => {
      let products = action.payload;
      let perPage = products?.length / parseInt(state.selectedQty);
      let totalPage = products?.length / perPage;
      let itemsQty = products?.slice(
        totalPage * (state.page - 1),
        totalPage * state.page
      );
      state.products = itemsQty;
    },
  },
});

export const { changePage, changeQty, updateProducts } = productSlice.actions;
export const productReducer = productSlice.reducer;
