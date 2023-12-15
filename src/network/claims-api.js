import { api, getHeadersConfig } from "./api";

export const saveClaimApi = async (data) => {
  try {
    const response = await api.post("claims", data, getHeadersConfig());
    return response;
  } catch (error) {
    console.log(error.message);
  }
};

export const getClaimsApi = async () => {
  try {
    const response = await api.get("claims", getHeadersConfig());
    return response;
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteClaimApi = async (data) => {
  console.log(data);
  try {
    const response = await api.delete(`claims/${data.claim.fileNo}`, {
      ...getHeadersConfig(),
      data: data,
    });
    return response;
  } catch (error) {
    console.log(error.message);
  }
};

export const updateClaimApi = async (data) => {
  try {
    const response = await api.patch("claims", data, getHeadersConfig());
    return response;
  } catch (error) {
    console.log(error.message);
  }
};
