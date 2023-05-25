import axios, { AxiosResponse } from "axios";
import { apiUrl } from "../utils/urls/serverUrls";

const api = axios.create({
  baseURL: `${apiUrl}`,
});

api.interceptors.request.use(async (config) => {
  config.withCredentials = true;
  config.headers["Content-Type"] = "application/json";

  return config;
});

export const setAuthInterceptor = (accessToken: string) => {
  return api.interceptors.request.use(async (config) => {
    config.withCredentials = true;
    config.headers["Content-Type"] = "application/json";
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  });
};

export default api;
