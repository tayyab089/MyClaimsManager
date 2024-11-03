import { api, getSecureHeadersConfig } from "./api";

export const saveClaimApi = async (data) => {
  try {
    const response = await api.post("claims", data, getSecureHeadersConfig());
    return response;
  } catch (error) {
  }
};

export const getClaimsApi = async () => {
  try {
    const response = await api.get("claims", getSecureHeadersConfig());
    return response;
  } catch (error) {
  }
};

export const getSingleClaimApi = async (id) => {
  try {
    const response = await api.get(`claims/${id}`, getSecureHeadersConfig());
    return response;
  } catch (error) {
  }
};



export const deleteClaimApi = async (data) => {
  try {
    const response = await api.delete(`claims/${data.claim.fileNo}`, {
      ...getSecureHeadersConfig(),
      data: data,
    });
    return response;
  } catch (error) {
  }
};

export const updateClaimApi = async (data) => {
  try {
    const response = await api.patch("claims", data, getSecureHeadersConfig());
    return response;
  } catch (error) {
  }
};
