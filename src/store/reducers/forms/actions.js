import { createAction } from "@reduxjs/toolkit";

export const SET_FORMS = createAction("forms/setForms");
export const REMOVE_FORMS = createAction("forms/removeForms");
export const IS_FETCHING_FORMS = createAction("forms/isFetchingForms");
