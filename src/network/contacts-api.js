import { api, getSecureHeadersConfig } from './api';

export const getContactsApi = async () => {
  try {
    const response = await api.get("contacts", getSecureHeadersConfig());
    return response;
  } catch (error) {
    console.log(error.message);
  }
};

export const saveContactApi = async (data) => {
  console.log(getSecureHeadersConfig())
  try {
    const response = await api.post("contacts", data, getSecureHeadersConfig());
    return response;
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteContactApi = async (data) => {
  console.log(data);
  try {
    const response = await api.delete(`contacts/${data.contact.id}`, {
      ...getSecureHeadersConfig(),
      data: data,
    });
    return response;
  } catch (error) {
    console.log(error.message);
  }
};

export const updateContactApi = async (data) => {
  try {
    const response = await api.patch("contacts", data, getSecureHeadersConfig());
    return response;
  } catch (error) {
    console.log(error.message);
  }
};
