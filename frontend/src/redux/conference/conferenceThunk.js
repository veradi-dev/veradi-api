import { getConferenceRequest } from "~/frontend/src/api/conference";

export const getConference = (date) => (dispatch, getState) => {
  const token = getState().user.token;
  return getConferenceRequest(date, token);
};
