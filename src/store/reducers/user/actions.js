import { createAction } from "@reduxjs/toolkit";

export const SET_USER = createAction("user/setUser");
export const REMOVE_USER = createAction("user/removeUser");
export const IS_FETCHING_USER = createAction("user/isFetchingUser");
