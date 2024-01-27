import { createReducer } from "@reduxjs/toolkit";
import { SET_ALERT } from "./actions";

const initialState = {
  alertData: {
    open: false,
    message: "",
    type: "success",
  },
};

const alertReducer = createReducer(initialState, (builder) => {
  builder.addCase(SET_ALERT, (state, { payload }) => {
    return {
      ...state,
      alertData: payload,
    };
  });
});

export default alertReducer;
