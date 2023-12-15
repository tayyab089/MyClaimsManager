import { createReducer } from "@reduxjs/toolkit";
import { SET_CLAIMS, REMOVE_CLAIMS, IS_FETCHING_CLAIMS } from "./actions";

const initialState = {
  claimsData: [],
  meta: {
    isLoading: false,
  },
};

const claimsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(SET_CLAIMS, (state, { payload }) => {
      return {
        ...state,
        claimsData: payload,
      };
    })
    .addCase(IS_FETCHING_CLAIMS, (state, { payload }) => {
      return {
        ...state,
        meta: {
          isLoading: payload,
        },
      };
    });
});

export default claimsReducer;
