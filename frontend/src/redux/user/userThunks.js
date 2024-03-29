import { userActions } from "./userSlice";
import {
  loginRequest,
  logoutRequest,
  CheckLogedInRequest
} from "../../api/users/auth";
import { alertActions } from "../alert/alertSlice";

const logout = () => (dispatch, getState) => {
  const token = getState().user.token;
  logoutRequest(token)
    .then(() => dispatch(alertActions.success(`로그아웃 되었습니다.`)))
    .finally(() => dispatch(userActions.logout()));
};

const login = data => dispatch => {
  loginRequest(data)
    .then(res => {
      const { data, status } = res;
      if (status === 200) {
        dispatch(userActions.login(data));
        dispatch(
          alertActions.success(
            `반갑습니다 ${data.user.last_name}${data.user.first_name}님`
          )
        );

        return true;
      }
    })
    .catch(e => {
      dispatch(logout());
      dispatch(alertActions.error(`로그인 정보가 올바르지 않습니다.`));
    });
};

const checkLogedIn = () => (dispatch, getState) => {
  const token = getState().user.token;
  let isLogin = true;
  CheckLogedInRequest(token).catch(e => {
    if (e.response.status === 401) {
      dispatch(logout());
      isLogin = false;
    }
  });
  return isLogin;
};

export { login, logout, checkLogedIn };
