import axios from "axios";
import { showError } from "../Assets/Constants/showNotifier";
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_API_URL ,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && token != undefined) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    if (err.response && err.response.status === 401) {
      showError("Unauthorized access. Please login again."); 
      console.log("Unauthorized");
    }
    return Promise.reject(err);
  }
);

export default axiosInstance;
