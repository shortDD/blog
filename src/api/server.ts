import { getToken } from "@/utils";
import axios from "axios";

const http = axios.create({
  baseURL: process.env.REACT_APP_URL,
  timeout: 5000,
});
http.interceptors.request.use(
  (config) => {
    config.headers.token = getToken();
    return config;
  },
  (error) => {
    return Promise.reject(new Error(error));
  }
);
http.interceptors.response.use(
  (response) => {
    const { data, success, message } = response.data;
    if (success) {
      return data;
    } else {
      return Promise.reject(new Error(message));
    }
  },
  (error) => {
    return Promise.reject(new Error(error.response.data));
  }
);
export default http;
