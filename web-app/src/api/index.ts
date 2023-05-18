import axios from "axios";

export const serverURL = "http://127.0.0.1:8000";

const api = axios.create({
  baseURL: `${serverURL}/api/v1`,
});

function getCookie(n: string) {
  const a = `; ${document.cookie}`.match(`;\\s*${n}=([^;]+)`);
  return a ? a[1] : "";
}

api.interceptors.request.use(async (config) => {
  config.withCredentials = true;
  config.headers["Content-Type"] = "application/json";
  /*
  const cookie = getCookie("jwt");

  if (cookie) {
    config.headers["Authorization"] = `Bearer ${cookie}`;
  }*/

  return config;
});

export default api;
