
import { api, getHeadersConfig } from "./api";
import { setAlertData } from "../store/reducers/alert/thunks";

export const signUpApi = async (data) => {
  try {
    const response = await api.post('auth/signup', data, getHeadersConfig());
    return response;
  } catch (error) {
    throw error;
  }
};

export const signInApi = async (data) => {
  try {
    const response = await api.post('auth/signin', data, getHeadersConfig());
    return response;
  } catch (error) {
    console.error("Sign-in API error:", error.message);
    throw error; // Pass the error to the caller
  }
};

export const validateTokenApi = async (token) => {
  try {
    const config = { ...getHeadersConfig(), headers: { Authorization: `Bearer ${token}` }};
    const response = await api.get('auth/validate-token', config);
    return response;
  } catch (error) {
    console.error("Token validation error:", error.message);
    throw error; // Pass the error to the caller
  }
};

export const verifyUserApi = async (data) => {
  try {
    const response = await api.post('/auth/verify', data, getHeadersConfig());
    return response;
  } catch (error) {
    console.error("User verification error:", error.message);
    throw error; // Pass the error to the caller
  }
};

export const requestPasswordResetApi = async (data) => {
  try {
    const response = await api.post('/auth/request-password-reset', data, getHeadersConfig());
    return response;
  } catch (error) {
    console.error("User verification error:", error.message);
    throw error; 
  }
};


export const forgotPasswordApi = async (data) => {
  try {
    const response = await api.post('/auth/forgot-password', data, getHeadersConfig());
    return response;
  } catch (error) {
    console.error("User verification error:", error.message);
    throw error; 
  }
};