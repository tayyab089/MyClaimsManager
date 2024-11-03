import { SET_FORMS, REMOVE_FORMS, IS_FETCHING_FORMS } from "./actions";
import { getFormApi } from "src/network/forms-api";
import { setAlertData } from "../alert/thunks";

// Fetch Forms Function ==============================================================
export const fetchForms = (fileNo) => async (dispatch) => {
  dispatch(IS_FETCHING_FORMS(true));
  try {
    const response = await getFormApi(fileNo);
    if (response && response.data.type !== "error") {
      dispatch(SET_FORMS(response.data.data));
    }
  } catch (error) {
  } finally {
    dispatch(IS_FETCHING_FORMS(false));
  }
};

// Add Form Function ==================================================================
export const addFormToStore = (form) => async (dispatch, getState) => {
  const currentState = getState();
  const currentForms = currentState.forms.formsData;
  const updatedForms = [...currentForms, form];

  dispatch(SET_FORMS(updatedForms));
};

// Update Form Function ================================================================
export const updateFormInStore = (form) => async (dispatch, getState) => {
  const currentState = getState();
  const currentforms = currentState.forms.formsData;

  const updatedforms = currentforms.map((item) => {
    if (item.formId == form.formId) {
      return form;
    } else {
      return item;
    }
  });
  dispatch(SET_FORMS(updatedforms));
};

// Delete Form Function ==============================================================
export const deleteFormFromStore = (form) => async (dispatch, getState) => {
  const currentState = getState();
  const currentForms = currentState.forms.formsData;

  const updatedForms = currentForms.filter((item) => item.formId !== form.formId);

  dispatch(SET_FORMS(updatedForms));
};
