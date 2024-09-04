import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import tempReducer from "./features/user/tempSlice";

export const store = configureStore({
  reducer: {
    userState: userReducer,
    tempState: tempReducer,
  },
});
