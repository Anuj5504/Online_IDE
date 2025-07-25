import { configureStore } from '@reduxjs/toolkit'
import userReducer from "../redux/slice/userSlice.js";

export const store = configureStore({
  reducer: {
    user:userReducer,
  },
});
