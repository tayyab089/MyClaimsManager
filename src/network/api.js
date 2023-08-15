// apiEndpoints.js

import axios from "axios";
// import store from "../store";

export const api = axios.create({
  baseURL: "http://localhost:3000/",
});

// Function to get the user token from Redux state

const getHeadersConfig = () => {
  //   const accessToken = store.getState().auth.accessToken;
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: "fe5daa66-05c0-4e48-9235-95ae370ded9d",
    },
  };
};

export const getContactsApi = async () => {
  try {
    const response = await api.get("contacts", getHeadersConfig());
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const saveContactApi = async (data) => {
  try {
    const response = await api.post("contacts", data, getHeadersConfig());
    return response;
  } catch (error) {
    console.log(error);
  }
};
