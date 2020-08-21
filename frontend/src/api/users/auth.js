import request, { createHeaders } from "../base";

export const loginRequest = (data) =>
  request("post", "api/v1/auth/login/", data);

export const logoutRequest = (token) =>
  request("post", "api/v1/auth/logout/", null, createHeaders(token));
