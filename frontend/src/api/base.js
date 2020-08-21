import axios from "axios";

const createHeaders = (token) => ({
  Authorization: `token ${token}`,
});

const request = (method, path, data, headers, params) => {
  return axios.request({
    baseUrl: "http://localhost:8000/",
    url: path,
    method,
    data,
    headers,
    params,
  });
};

export { createHeaders };
export default request;
