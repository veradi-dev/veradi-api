import request, { createHeaders } from "./base";

export const getMyWorkhoursRequest = ({ token, userId, year, month }) =>
  request("get", "api/v1/workhours/", null, createHeaders(token), {
    user: userId,
    year,
    month
  });

export const correctionWorkhourRequest = (token, data) =>
  request("post", "api/v1/workhours/correction/", data, createHeaders(token));

export const decideCorrectionWorkhourRequest = () => {};
