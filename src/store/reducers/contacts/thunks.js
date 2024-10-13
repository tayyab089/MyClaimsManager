import { getContactsApi } from 'src/network/contacts-api';
import { SET_CONTACTS, REMOVE_CONTACTS, IS_FETCHING_CONTACTS } from "./actions";

import { sortContacts } from "src/utils/sort-data";

export const fetchContacts = (refreshDataCallback) => async (dispatch) => {
  dispatch(IS_FETCHING_CONTACTS(true));
  try {
    const response = await getContactsApi();
    if (response && response.data.type !== "error") {
      dispatch(SET_CONTACTS(sortContacts(response.data.data)));
    }
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(IS_FETCHING_CONTACTS(false));
    if (typeof refreshDataCallback === "function") {
      refreshDataCallback();
    }
  }
};

// Add Contact Function ==================================================================
export const addContactToStore = (contact) => async (dispatch, getState) => {
  const currentState = getState();
  const currentContacts = currentState.contacts.contactsData;
  const updatedContacts = [...currentContacts, contact];

  dispatch(SET_CONTACTS(sortContacts(updatedContacts)));
};

// Update Contact Function ===============================================================
export const updateContactInStore = (contact) => async (dispatch, getState) => {
  const currentState = getState();
  const currentContacts = currentState.contacts.contactsData;

  const updatedContacts = currentContacts.map((item) => {
    if (item.id == contact.id) {
      return contact;
    } else {
      return item;
    }
  });

  dispatch(SET_CONTACTS(sortContacts(updatedContacts)));
};

// Delete Contact Function ==============================================================
export const deleteContactFromStore = (contact) => async (dispatch, getState) => {
  const currentState = getState();
  const currentContacts = currentState.contacts.contactsData;

  const updatedContacts = currentContacts.filter((item) => item.id !== contact.id);

  dispatch(SET_CONTACTS(updatedContacts));
};
