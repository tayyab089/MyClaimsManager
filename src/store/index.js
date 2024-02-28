import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import contacts from "./reducers/contacts/reducer";
import claims from "./reducers/claims/reducer";
import alert from "./reducers/alert/reducer";
import forms from "./reducers/forms/reducer";
import user from "./reducers/user/reducer";

const store = configureStore({
  reducer: combineReducers({
    contacts,
    claims,
    alert,
    forms,
    user,
    // other reducers...
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
