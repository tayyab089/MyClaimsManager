import { SET_ALERT } from "./actions";

export const setAlertData = (payload) => async (dispatch) => {
  dispatch(SET_ALERT(payload));
  setTimeout(() => {
    dispatch(SET_ALERT({ open: false, message: "", type: "" }));
  }, 3000);
};
