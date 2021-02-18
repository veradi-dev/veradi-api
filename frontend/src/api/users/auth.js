import request, { createHeaders } from "../base";

export const loginRequest = data =>
  request("post", "api/v1/auth/initial-login/", data);

export const logoutRequest = token =>
  request("post", "api/v1/auth/logout/", null, createHeaders(token));

export const CheckLogedInRequest = token =>
  request("get", "api/v1/users/is_logged_in/", null, createHeaders(token));
