
import { api, getHeadersConfig } from "./api";

export const signUpApi = async (data) => {
  try {
    const response = await api.post('/signup', data, getHeadersConfig());
    return response;
  } catch (error) {
    console.log(error.message);
  }
};

export const signInApi = async (data) => {
  try {
    const response = await api.post('auth/signin', data, getHeadersConfig());
    return response;
  } catch (error) {
    console.log(error.message);
  }
};

export const validateTokenApi = async (token) => {
  try {
    const config = { ...getHeadersConfig(), headers: { Authorization: `Bearer ${token}` }};
    const response = await api.get('/validate-token', config);
    return response;
  } catch (error) {
    console.log(error.message);
  }
};

export const verifyUserApi = async (data) => {
  try {
    const response = await api.post('/verify', data, getHeadersConfig());
    return response;
  } catch (error) {
    console.log(error.message);
  }
};