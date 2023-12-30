export const sortClaims = (claims) =>
  claims.sort((a, b) => {
    // const extractLastName = (fullName) => {
    //   const nameParts = fullName.split(" ");
    //   return nameParts.length > 1 ? nameParts[nameParts.length - 1] : fullName;
    // };
    const fileNoA = a.fileNo.toUpperCase();
    const fileNoB = b.fileNo.toUpperCase();

    if (fileNoA < fileNoB) {
      return -1; // a should come before b
    } else if (fileNoA > fileNoB) {
      return 1; // a should come after b
    } else {
      return 0; // names are equal
    }
  });
