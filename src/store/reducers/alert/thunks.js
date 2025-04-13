import { SET_ALERT } from "./actions";

export const setAlertData = (payload, type = "success") => async (dispatch) => {
  console.log(payload)
  dispatch(SET_ALERT(payload));
  setTimeout(() => {
    dispatch(SET_ALERT({ open: false, message: "", type: type }));
  }, 3000);
};
