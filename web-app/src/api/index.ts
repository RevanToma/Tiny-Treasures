import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.50.35:8000/api/v1",
});
// baseURL: "http://127.0.0.1:8000/api/v1",

function getCookie(n: string) {
  const a = `; ${document.cookie}`.match(`;\\s*${n}=([^;]+)`);
  return a ? a[1] : "";
}

api.interceptors.request.use(async (config) => {
  config.headers["Content-Type"] = "application/json";

  const cookie = getCookie("jwt");

  if (cookie) {
    config.headers["Authorization"] = `Bearer ${cookie}`;
  }

  return config;
});

export default api;
