import { SET_CONTACTS, REMOVE_CONTACTS, IS_FETCHING_CONTACTS } from "./actions";
import { getContactsApi } from "src/network/api";

export const fetchContacts = (refreshDataCallback) => async (dispatch) => {
  dispatch(IS_FETCHING_CONTACTS(true));
  try {
    const response = await getContactsApi();
    if (response && response.data.type !== "error") {
      console.log(response.data.data);
      response.data.data.sort((a, b) => {
        const extractLastName = (fullName) => {
          const nameParts = fullName.split(" ");
          return nameParts.length > 1 ? nameParts[nameParts.length - 1] : fullName;
        };
        const lastNameA = extractLastName(a.name).toUpperCase();
        const lastNameB = extractLastName(b.name).toUpperCase();

        if (lastNameA < lastNameB) {
          return -1; // a should come before b
        } else if (lastNameA > lastNameB) {
          return 1; // a should come after b
        } else {
          return 0; // names are equal
        }
      });
      dispatch(SET_CONTACTS(response.data.data));
    }
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(IS_FETCHING_CONTACTS(false));
    if (typeof refreshDataCallback === "function") {
      refreshDataCallback();
    }
  }
};
