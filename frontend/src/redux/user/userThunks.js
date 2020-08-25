import { userActions } from "./userSlice";
import {
  loginRequest,
  logoutRequest,
  CheckLogedInRequest,
} from "../../api/users/auth";

const logout = () => (dispatch, getState) => {
  const token = getState().user.token;
  logoutRequest(token).finally(() => {
    dispatch(userActions.logout());
  });
};

const login = (data) => (dispatch) => {
  loginRequest(data)
    .then((res) => {
      const { data, status } = res;
      if (status === 200) {
        dispatch(userActions.login(data));
        return true;
      }
    })
    .catch((e) => {
      dispatch(logout());
    });
};

const checkLogedIn = () => (dispatch, getState) => {
  const token = getState().user.token;
  CheckLogedInRequest(token).catch((e) => {
    dispatch(logout());
  });
};

export { login, logout, checkLogedIn };
