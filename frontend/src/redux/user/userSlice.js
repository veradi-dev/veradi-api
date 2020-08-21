import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    id: 0,
    expiry: null,
    token: null,
    isAuthenticated: false,
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    department: "",
    rank: "",
    team: "",
    position: "",
  },
  reducers: {
    login: (state, { payload }) => {
      const { user } = payload;
      state.token = payload.token;
      state.expiry = payload.expiry;
      state.isAuthenticated = true;
      state.id = user.id;
      state.username = user.username;
      state.email = user.email;
      state.first_name = user.first_name;
      state.last_name = user.last_name;
      state.department = user.department;
      state.rank = user.rank;
      state.team = user.team;
      state.position = user.position;
    },
    logout: () => {
      return {
        id: 0,
        expiry: null,
        token: null,
        isAuthenticated: false,
        username: "",
        email: "",
        first_name: "",
        last_name: "",
        department: "",
        rank: "",
        team: "",
        position: "",
      };
    },
  },
});

export const userActions = userSlice.actions;

const userReducer = userSlice.reducer;

export default userReducer;
