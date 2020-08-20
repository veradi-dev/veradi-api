import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    id: 0,
    token: null,
    isAuthenticated: false,
  },
  reducers: {},
});

export const userActions = userSlice.actions;

const userReducer = userSlice.reducer;

export default userReducer;
