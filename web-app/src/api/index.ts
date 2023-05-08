import axios from "axios";
const accessTokenCookie = localStorage.getItem("authToken");

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1",
});

// api.interceptors.request.use(async (config) => {
//   config.headers["Content-Type"] = "application/json";

//   config.headers["Authorization"] = `Bearer ${accessTokenCookie}`;

//   return config;
// });

export default api;
