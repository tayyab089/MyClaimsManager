import { createReducer } from "@reduxjs/toolkit";
import { SET_CONTACTS, REMOVE_CONTACTS, IS_FETCHING_CONTACTS } from "./actions";

const initialState = {
  contactsData: [],
  count: 0,
  lastKeyId: undefined,
  meta: {
    isLoading: false,
  },
};

const contactsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(SET_CONTACTS, (state, { payload }) => {
      return {
        ...state,
        contactsData: payload.data,
        lastKeyId: payload.lastKeyId,
        count: payload.count,
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
