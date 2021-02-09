import request, { createHeaders } from "./base";

export const getNoticeToAll = ({ token }) =>
  request("get", "api/v1/notice/", null, createHeaders(token));
