import request from "../base";

export const login = (data) => request("post", "api/v1/auth/login/", data);
