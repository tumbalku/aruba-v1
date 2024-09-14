import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  imageUrl: "",
  chooseUser: null,
};
const tempSlice = createSlice({
  name: "temp",
  initialState,
  reducers: {
    chooseUser: (state, action) => {
      console.log("chooseUser", action.payload);
      state.chooseUser = action.payload;
    },
    clearChooseUser: (state) => {
      state.chooseUser = null;
    },
    addImage: (state, action) => {
      state.imageUrl = action.payload;
    },
    clearImage: (state) => {
      state.imageUrl = "";
    },
  },
});

export const { addImage, clearImage, chooseUser, clearChooseUser } =
  tempSlice.actions;

export default tempSlice.reducer;
