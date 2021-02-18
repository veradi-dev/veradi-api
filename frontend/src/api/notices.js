import request, { createHeaders } from "./base";

export const getNoticeRequest = ({ token, data }) => {
  const { team, page } = data;
  return request(
    "get",
    `api/v1/notice/?page=${page}${team !== null ? `&team=${team}` : ""}`,
    null,
    createHeaders(token)
  );
};

export const createNoticeRequest = ({ token, data }) => {
  return request("post", `api/v1/notice/`, data, createHeaders(token));
};
export const updateNoticeRequest = ({ token, id, data }) => {
  return request("patch", `api/v1/notice/${id}/`, data, createHeaders(token));
};
export const deleteNoticeRequest = ({ token, id }) => {
  return request("delete", `api/v1/notice/${id}/`, null, createHeaders(token));
};
