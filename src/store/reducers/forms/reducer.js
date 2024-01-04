import { createReducer } from "@reduxjs/toolkit";
import { SET_FORMS, REMOVE_FORMS, IS_FETCHING_FORMS } from "./actions";

const initialState = {
  formsData: [],
  meta: {
    isFormLoading: false,
  },
};

const formsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(SET_FORMS, (state, { payload }) => {
      return {
        ...state,
        formsData: payload,
      };
    })
    .addCase(IS_FETCHING_FORMS, (state, { payload }) => {
      return {
        ...state,
        meta: {
          isFormLoading: payload,
        },
      };
    });
});

export default formsReducer;
