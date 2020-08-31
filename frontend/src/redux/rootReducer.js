import { combineReducers } from "redux";
import user from "./user/userSlice";
import alert from "./alert/alertSlice";

const rootReducer = combineReducers({ user, alert });

export default rootReducer;
