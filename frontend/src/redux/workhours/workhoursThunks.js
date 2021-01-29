import { workhoursActions } from "./workhoursSlice";
import { getMyWorkhoursRequest } from "../../api/workhours";
import { alertActions } from "../alert/alertSlice";

export const getMyWorkhours = (year, month) => (dispatch, getState) => {
  const userId = getState().user.id;
  const token = getState().user.token;
  let data = null;
  getMyWorkhoursRequest({ token, userId, year, month })
    .then(res => {
      // console.log(res);
      // console.log(res.data);
      dispatch(workhoursActions.load(res.data));
    })
    .catch(res => {
      // console.log(res);
      // console.log(res.data);
    });
};
