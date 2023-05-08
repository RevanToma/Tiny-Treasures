import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1",
});

// api.interceptors.request.use(async (config) => {
//   config.headers["Content-Type"] = "application/json";

//   return config;
// });

export default api;
