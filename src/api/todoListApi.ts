import axios from "axios";
import { getEnvVariables } from "@/shared/helpers";

const { VITE_API_URL } = getEnvVariables();

const todoListApi = axios.create({
  baseURL: VITE_API_URL,
});

// Interceptar las peticiones ya sea que vayan al backend
todoListApi.interceptors.request.use((config) => {
  config.headers["x-token"] = localStorage.getItem("TOKEN") || "";
  return config;
});

export default todoListApi;
