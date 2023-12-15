import { SET_CLAIMS, REMOVE_CLAIMS, IS_FETCHING_CLAIMS } from "./actions";
import { getClaimsApi } from "src/network/claims-api";

export const fetchClaims = (refreshDataCallback) => async (dispatch) => {
  dispatch(IS_FETCHING_CLAIMS(true));
  try {
    const response = await getClaimsApi();
    if (response && response.data.type !== "error") {
      console.log(response.data.data);
      // response.data.data.sort((a, b) => {
      //   const extractLastName = (fullName) => {
      //     const nameParts = fullName.split(" ");
      //     return nameParts.length > 1 ? nameParts[nameParts.length - 1] : fullName;
      //   };
      //   const lastNameA = extractLastName(a.name).toUpperCase();
      //   const lastNameB = extractLastName(b.name).toUpperCase();

      //   if (lastNameA < lastNameB) {
      //     return -1; // a should come before b
      //   } else if (lastNameA > lastNameB) {
      //     return 1; // a should come after b
      //   } else {
      //     return 0; // names are equal
      //   }
      // });
      dispatch(SET_CLAIMS(response.data.data));
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
