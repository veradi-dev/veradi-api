import { createSlice } from "@reduxjs/toolkit";

const workhoursSlice = createSlice({
  name: "workhours",
  initialState: [],
  reducers: {
    load: (state, { payload }) => {
      return payload;
    },
    deleteAll: () => {
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
