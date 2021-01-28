import request, { createHeaders } from "../base";

export const get_team_members = token =>
  request("get", "api/v1/users/get_team_members", null, createHeaders(token));
