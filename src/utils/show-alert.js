import { setAlertData } from "src/store/reducers/alert/thunks";

export const showAlert = (response, dispatch) => {
  dispatch(setAlertData({ open: true, message: response.data.message, type: response.data.type }));
};
