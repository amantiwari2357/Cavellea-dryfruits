import { createSlice } from "@reduxjs/toolkit";

// Define the initial state using plain JavaScript objects
const initialState = {
  colorSelection: {
    name: "Brown",
    code: "bg-[#4F4631]",
  },
  sizeSelection: "Large",
};

export const productsSlice = createSlice({
  name: "products",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setColorSelection: (state, action) => {
      state.colorSelection = action.payload;
    },
    setSizeSelection: (state, action) => {
      state.sizeSelection = action.payload;
    },
  },
});

export const { setColorSelection, setSizeSelection } = productsSlice.actions;

export default productsSlice.reducer;
