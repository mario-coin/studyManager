import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  token_key: ""
});

axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

// api.isAuthenticated = () => localStorage.getItem(this.token_key) !== null;

// api.getToken = () => { localStorage.getItem(this.token_key) };

// api.login = token => {
//   localStorage.setItem(this.token_key, token);
// };

// api.logout = () => {
//   localStorage.removeItem(this.token_key);
// };

// api.interceptors.request.use(async config => {
//   const token = this.getToken();
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default api;