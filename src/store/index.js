import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import contacts from "./reducers/contacts/reducer";
import alert from "./reducers/alert/reducer";

const store = configureStore({
  reducer: combineReducers({
    contacts,
    alert,
    // other reducers...
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
