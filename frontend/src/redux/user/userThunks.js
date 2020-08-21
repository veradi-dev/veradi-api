import { userActions } from "./userSlice";
import { loginRequest, logoutRequest } from "../../api/users/auth";

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

export { login, logout };
