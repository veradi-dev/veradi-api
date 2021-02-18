import {
  getNoticeRequest,
  updateNoticeRequest,
  deleteNoticeRequest
} from "~/frontend/src/api/notices";

export const getNotice = data => (dispatch, getState) => {
  const token = getState().user.token;
  return getNoticeRequest({ token, data });
};

export const updateNotice = (id, data) => (dispatch, getState) => {
  const token = getState().user.token;
  return updateNoticeRequest({ token, id, data });
};

export const deleteNotice = id => (dispatch, getState) => {
  const token = getState().user.token;
  return deleteNoticeRequest({ token, id });
};
