import { createAction } from "@reduxjs/toolkit";

export const SET_CLAIMS = createAction("claims/setClaims");
export const REMOVE_CLAIMS = createAction("claims/removeClaims");
export const IS_FETCHING_CLAIMS = createAction("claims/isFetchingClaims");
