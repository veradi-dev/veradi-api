import request, { createHeaders } from "./base";

export const getMyWorkhoursRequest = ({ token, userId, year, month }) =>
  request("get", "api/v1/workhours/", null, createHeaders(token), {
    user: userId,
    year,
    month
  });

export const correctionWorkhourRequest = (
  token,
  data = null,
  method = "post"
) =>
  request(method, "api/v1/workhours/correction/", data, createHeaders(token));

export const getTeamStatRequest = (token, year, month) =>
  request(
    "get",
    `api/v1/workhours/team_stat/?year=${year}&month=${month}`,
    null,
    createHeaders(token)
  );
