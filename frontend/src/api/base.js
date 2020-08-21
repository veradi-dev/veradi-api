import axios from "axios";

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

export default request;
