import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
  name: "alert",
  initialState: {
    type: "",
    message: "",
  },
  reducers: {
    create: (state, action) => {
      return action.payload;
    },
    success: (state, { payload }) => {
      return {
        type: "success",
        message: payload,
      };
    },
    info: (state, { payload }) => {
      return {
        type: "info",
        message: payload,
      };
    },
    error: (state, { payload }) => {
      return {
        type: "error",
        message: payload,
      };
    },
  },
});

export const alertActions = alertSlice.actions;
export default alertSlice.reducer;
