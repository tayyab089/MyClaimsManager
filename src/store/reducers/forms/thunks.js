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
      console.log(response.data);
    }
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(IS_FETCHING_FORMS(false));
  }
};

// // Add Forms Function =================================================================
// export const addFormsDataToClaim = (fileNo, formName) => async (dispatch, getState) => {
//   const currentState = getState();
//   const currentClaims = currentState.claims.claimsData;
//   const updatedData = { type: formName, updated: new Date(), createdBy: "Howie Guttman" };

//   const updatedClaims = currentClaims.map((claim) => {
//     console.log(claim.fileNo, fileNo);
//     if (claim.fileNo == fileNo) {
//       console.log("Match Found, I Ran");
//       return { ...claim, forms: [...claim.forms, updatedData] };
//     }
//     return claim;
//   });

//   dispatch(SET_CLAIMS(updatedClaims));
// };

// // Add Claim Function ==================================================================
// export const addClaimToStore = (claim) => async (dispatch, getState) => {
//   const currentState = getState();
//   const currentClaims = currentState.claims.claimsData;
//   const updatedClaims = [...currentClaims, claim];

//   dispatch(SET_CLAIMS(sortClaims(updatedClaims)));
// };

// // Update Claim Function ================================================================
// export const updateClaimInStore = (claim) => async (dispatch, getState) => {
//   const currentState = getState();
//   const currentClaims = currentState.claims.claimsData;

//   const updatedClaims = currentClaims.map((item) => {
//     if (item.fileNo == claim.fileNo) {
//       return claim;
//     } else {
//       return item;
//     }
//   });

//   dispatch(SET_CLAIMS(sortClaims(updatedClaims)));
// };

// Delete Claim Function ==============================================================
export const deleteFormFromStore = (form) => async (dispatch, getState) => {
  const currentState = getState();
  const currentForms = currentState.forms.formsData;

  const updatedForms = currentForms.filter((item) => item.formId !== form.formId);

  dispatch(SET_FORMS(updatedForms));
};
