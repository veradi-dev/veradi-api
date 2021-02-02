import { workhoursActions } from "./workhoursSlice";
import {
  getMyWorkhoursRequest,
  correctionWorkhourRequest
} from "../../api/workhours";

export const getMyWorkhours = (year, month) => (dispatch, getState) => {
  const userId = getState().user.id;
  const token = getState().user.token;

  getMyWorkhoursRequest({ token, userId, year, month }).then(res => {
    dispatch(workhoursActions.load(res.data));
  });
};

export const correctionWorkhour = data => (dispatch, getState) => {
  const token = getState().user.token;

  correctionWorkhourRequest(token, data).then(res => {
    console.log(res);
  });
};
