import { api, getHeadersConfig, getPDFHeadersConfig } from "./api";

export const saveFormApi = async (data) => {
  try {
    const response = await api.post("forms", data, getHeadersConfig());
    return response;
  } catch (error) {
    console.log(error.message);
  }
};

export const getFormApi = async (claimfileNo) => {
  const userId = "fe5daa66-05c0-4e48-9235-95ae370ded9d";
  try {
    const response = await api.get(`forms/user/${userId}/claim/${claimfileNo}`, getHeadersConfig());
    return response;
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteFormApi = async (data) => {
  console.log(data);
  try {
    const response = await api.delete(`forms/${data.form.formId}`, {
      ...getHeadersConfig(),
      data: data,
    });
    return response;
  } catch (error) {
    console.log(error.message);
  }
};

export const updateFormApi = async (data) => {
  try {
    const response = await api.patch("forms", data, getHeadersConfig());
    return response;
  } catch (error) {
    console.log(error.message);
  }
};

export const emailFormApi = async (data) => {
  try {
    const response = await api.post("/", data, getPDFHeadersConfig());
    return response;
  } catch (error) {
    console.log(error.message);
  }
};
