import { getNoticeRequest } from "~/frontend/src/api/notices";

export const getNotice = data => (dispatch, getState) => {
  const token = getState().user.token;
  return getNoticeRequest({ token, data });
};
