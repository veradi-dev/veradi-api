import { userActions } from "./userSlice";
import { login as loginRequest } from "../../api/users/auth";

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
      console.log(e);
    });
};

export { login };
