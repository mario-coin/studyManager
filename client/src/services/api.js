import axios from "axios";
import { getToken } from "./auth";

const api = axios.create({
  baseURL: "http://127.0.0.1:3333",
  token_key: ""
});

api.isAuthenticated = () => localStorage.getItem(token_key) !== null;

api.getToken = () => localStorage.getItem(token_key);

api.login = token => {
  localStorage.setItem(token_key, token);
};

api.logout = () => {
  localStorage.removeItem(token_key);
};

api.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;