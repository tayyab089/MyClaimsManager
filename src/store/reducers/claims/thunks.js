import { SET_CLAIMS, REMOVE_CLAIMS, IS_FETCHING_CLAIMS } from "./actions";
import { getClaimsApi } from "src/network/claims-api";

import { sortClaims } from "src/utils/sort-data";

export const fetchClaims = (refreshDataCallback) => async (dispatch) => {
  dispatch(IS_FETCHING_CLAIMS(true));
  try {
    const response = await getClaimsApi();
    if (response && response.data.type !== "error") {
      dispatch(SET_CLAIMS(sortClaims(response.data.data)));
    }
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(IS_FETCHING_CLAIMS(false));
    if (typeof refreshDataCallback === "function") {
      refreshDataCallback();
    }
  }
};

export const addFormsDataToClaim = (fileNo, formName) => async (dispatch, getState) => {
  const currentState = getState();
  const currentClaims = currentState.claims.claimsData;
  const updatedData = { type: formName, updated: new Date(), createdBy: "Howie Guttman" };

  const updatedClaims = currentClaims.map((claim) => {
    console.log(claim.fileNo, fileNo);
    if (claim.fileNo == fileNo) {
      console.log("Match Found, I Ran");
      return { ...claim, forms: [...claim.forms, updatedData] };
    }
    return claim;
  });

  dispatch(SET_CLAIMS(updatedClaims));
};

export const addClaim = (claim) => async (dispatch, getState) => {
  const currentState = getState();
  const currentClaims = currentState.claims.claimsData;
  const updatedClaims = [...currentClaims, claim];

  dispatch(SET_CLAIMS(sortClaims(updatedClaims)));
};

export const updateClaim = (claim) => async (dispatch, getState) => {
  const currentState = getState();
  const currentClaims = currentState.claims.claimsData;

  const updatedClaims = currentClaims.map((item) => {
    if (item.fileNo == claim.fileNo) {
      return claim;
    } else {
      return item;
    }
  });

  dispatch(SET_CLAIMS(sortClaims(updatedClaims)));
};
