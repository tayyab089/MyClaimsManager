// apiEndpoints.js

import axios from "axios";
// import store from "../store";
import { useAuthContext } from "src/contexts/auth-context";

export const api = axios.create({
  // baseURL: "https://s4r7rz1w2m.execute-api.us-east-1.amazonaws.com/dev",
  baseURL: "http://localhost:3001/",
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
    console.log(error.message);
  }
};

export const saveContactApi = async (data) => {
  try {
    const response = await api.post("contacts", data, getHeadersConfig());
    return response;
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteContactApi = async (data) => {
  try {
    const response = await api.delete(`contacts/${data.contact.id}`, {
      ...getHeadersConfig(),
      data: data,
    });
    return response;
  } catch (error) {
    console.log(error.message);
  }
};

export const updateContactApi = async (data) => {
  try {
    const response = await api.patch("contacts", data, getHeadersConfig());
    return response;
  } catch (error) {
    console.log(error.message);
  }
};
