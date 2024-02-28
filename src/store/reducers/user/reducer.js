import { createReducer } from "@reduxjs/toolkit";
import { SET_USER, REMOVE_USER, IS_FETCHING_USER } from "./actions";

const initialState = {
  user: {
    id: "fe5daa66-05c0-4e48-9235-95ae370ded9d",
    avatar: "/assets/avatars/avatar-siegbert-gottfried.png",
    name: "Howie Guttman",
    email: "howie.guttman@outlook.com",
  },
  meta: {
    isUserLoading: false,
  },
};

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(SET_USER, (state, { payload }) => {
      return {
        ...state,
        claimsData: payload,
      };
    })
    .addCase(IS_FETCHING_USER, (state, { payload }) => {
      return {
        ...state,
        meta: {
          isUserLoading: payload,
        },
      };
    });
});

export default userReducer;
