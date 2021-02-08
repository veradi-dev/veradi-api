import request, { createHeaders } from "./base";

export const getConferenceRequest = (date, token) =>
  request(
    "get",
    `/api/v1/conference?year=${date.getFullYear()}&month=${
      date.getMonth() + 1
    }&day=${date.getDate()}`,
    null,
    createHeaders(token)
  );
