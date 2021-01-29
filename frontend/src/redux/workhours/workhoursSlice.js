import { createSlice } from "@reduxjs/toolkit";

const workhoursSlice = createSlice({
  name: "workhours",
  initialState: [
    {
      user: {
        id: 0,
        username: null,
        email: null,
        first_name: null,
        last_name: null,
        department: null,
        rank: null,
        team: null,
        position: null
      },
      enter_logs: [],
      status: null,
      message: null,
      start: null,
      end: null,
      total: null,
      complete: null
    }
  ],
  reducers: {
    load: (state, { payload }) => {
      state = payload;
      return state;
    },
    delete: () => {
      return [
        {
          user: {
            id: 0
          },
          enter_logs: [],
          status: null,
          message: null,
          start: null,
          end: null,
          total: null,
          complete: null
        }
      ];
    }
  }
});

export const workhoursActions = workhoursSlice.actions;

const workhoursReducer = workhoursSlice.reducer;

export default workhoursReducer;
