import { workhoursActions } from "./workhoursSlice";
import {
  getMyWorkhoursRequest,
  correctionWorkhourRequest
} from "../../api/workhours";
import { alertActions } from "../alert/alertSlice";

export const getMyWorkhours = (year, month) => (dispatch, getState) => {
  const userId = getState().user.id;
  const token = getState().user.token;

  getMyWorkhoursRequest({ token, userId, year, month }).then(res => {
    dispatch(workhoursActions.load(res.data));
  });
};

export const correctionWorkhour = (data, method) => (dispatch, getState) => {
  const token = getState().user.token;
  if (method === "get") {
    return correctionWorkhourRequest(token, null, method);
  } else if (method === "post") {
    correctionWorkhourRequest(token, data, method)
      .then(res => {
        dispatch(
          alertActions.create({
            type: "success",
            message: "이의신청이 접수되었습니다."
          })
        );
      })
      .catch(err => {
        dispatch(
          alertActions.create({
            type: "error",
            message: "이의신청 접수 중 오류가 발생했습니다."
          })
        );
      });
  }
};
