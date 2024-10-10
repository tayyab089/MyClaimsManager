
import { api, getHeadersConfig } from "./api";

export const signUpApi = async (data) => {
  try {
    const response = await api.post('auth/signup', data, getHeadersConfig());
    return response;
  } catch (error) {
    throw error; // Pass the error to the caller
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
    const response = await api.get('/validate-token', config);
    return response;
  } catch (error) {
    console.error("Token validation error:", error.message);
    throw error; // Pass the error to the caller
  }
};

export const verifyUserApi = async (data) => {
  try {
    const response = await api.post('/verify', data, getHeadersConfig());
    return response;
  } catch (error) {
    console.error("User verification error:", error.message);
    throw error; // Pass the error to the caller
  }
};
