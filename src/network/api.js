// apiEndpoints.js

import axios from "axios";
import { getTokenCookies } from 'src/contexts/auth-context';
// import store from "../store";

export const api = axios.create({
  baseURL:
    process.env.NODE_ENV == "development"
      ? "http://localhost:3001/"
      : "https://s4r7rz1w2m.execute-api.us-east-1.amazonaws.com/dev",
  // baseURL: "http://localhost:3001/",
});

// Function to get the user token from Redux state

export const getHeadersConfig = () => {
  //   const accessToken = store.getState().auth.accessToken;
  return {
    headers: {
      "Content-Type": "application/json",
    },
  };
};

export const getSecureHeadersConfig = () => {
  const token = getTokenCookies();

  return {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }), // Add Authorization header if token exists
    },
  };
};
