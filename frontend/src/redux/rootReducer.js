import { combineReducers } from "redux";
import user from "./user/userSlice";
import alert from "./alert/alertSlice";
import workhours from "./workhours/workhoursSlice";

const rootReducer = combineReducers({ user, alert, workhours });

export default rootReducer;
