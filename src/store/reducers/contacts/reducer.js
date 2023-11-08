import { createReducer } from "@reduxjs/toolkit";
import { SET_CONTACTS, REMOVE_CONTACTS, IS_FETCHING_CONTACTS } from "./actions";

const initialState = {
  contactsData: [],
  meta: {
    isLoading: false,
  },
};

const contactsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(SET_CONTACTS, (state, { payload }) => {
      return {
        ...state,
        contactsData: payload,
      };
    })
    .addCase(IS_FETCHING_CONTACTS, (state, { payload }) => {
      return {
        ...state,
        meta: {
          isLoading: payload,
        },
      };
    });
});

export default contactsReducer;
