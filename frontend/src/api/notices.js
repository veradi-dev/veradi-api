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
