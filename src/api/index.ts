import { getToken } from "@/utils";
import axios from "axios";

const http = axios.create({
  baseURL: process.env.REACT_APP_URL,
  timeout: 5000,
});
http.interceptors.request.use(
  (config) => {
    console.log(config);
    config.headers.Authorization = getToken();
    return config;
  },
  (error) => {
    return Promise.reject(new Error(error));
  }
);
http.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(new Error(error.response.data));
  }
);
export default http;
