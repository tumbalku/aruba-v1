import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  imageUrl: "",
};
const tempSlice = createSlice({
  name: "temp",
  initialState,
  reducers: {
    addImage: (state, action) => {
      console.log(action.payload);
      state.imageUrl = action.payload;
    },
    clearImage: (state) => {
      state.imageUrl = "";
    },
  },
});

export const { addImage, clearImage } = tempSlice.actions;

export default tempSlice.reducer;
