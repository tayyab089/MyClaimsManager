import { createAction } from "@reduxjs/toolkit";

export const SET_CONTACTS = createAction("contacts/setContacts");
export const REMOVE_CONTACTS = createAction("contacts/removeContacts");
export const IS_FETCHING_CONTACTS = createAction("contacts/isFetchingContacts");
