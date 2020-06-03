import axios from "axios";
import { getToken, logout } from "./auth";

import { withRouter} from 'react-router-dom';

const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const api = axios.create({
  baseURL: "http://localhost:5000"
});

axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

api.interceptors.request.use(async config => {
  const token = getToken();

  try {
    const decoded = await promisify(jwt.verify)(token, "secret");
    
    // if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    // }
  } catch (err) {
    logout();
    this.props.history.push("/");
  }
  return config;
});

export default withRouter(api);