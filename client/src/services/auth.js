export const TOKEN_KEY = "@study-Token";

const jwt = require("jsonwebtoken");
const { promisify } = require("util");

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
// export const isAuthenticated = () => {
//   const token = localStorage.getItem(TOKEN_KEY);

//   if(token !== null) return true;

//   try {
//     const decoded = promisify(jwt.verify)(token, "secret");
    
//     return true;
//   } catch (err) {
//     logout();
//     return false;
//   }
// };

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const login = token => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};