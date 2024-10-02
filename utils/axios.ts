import axios from "axios";

export const axiosRequest = axios.create({
  baseURL: "https://conformidades-api.onrender.com",
  timeout: 10000,
});
