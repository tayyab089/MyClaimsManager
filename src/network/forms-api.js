import { api, getSecureHeadersConfig } from "./api";

export const saveFormApi = async (data) => {
  try {
    const response = await api.post("forms", data, getSecureHeadersConfig());
    return response;
  } catch (error) {
    console.log(error.message);
  }
};

export const getFormApi = async (claimfileNo) => {
  try {
    const response = await api.get(`forms/claim/${claimfileNo}`, getSecureHeadersConfig());
    return response;
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteFormApi = async (data) => {
  console.log(data);
  try {
    const response = await api.delete(`forms/${data.form.formId}`, {
      ...getSecureHeadersConfig(),
      data: data,
    });
    return response;
  } catch (error) {
    console.log(error.message);
  }
};

export const updateFormApi = async (data) => {
  try {
    const response = await api.patch("forms", data, getSecureHeadersConfig());
    return response;
  } catch (error) {
    console.log(error.message);
  }
};

export const emailFormApi = async (data) => {
  try {
    const response = await api.post("forms/email", data, {
      headers: {
        ...getSecureHeadersConfig().headers,
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.log("Error in emailFormApi:", error.response ? error.response.data : error.message);
  }
};
