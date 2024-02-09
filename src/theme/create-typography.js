const normal = "1.1rem";
const small = "0.9rem";
const large = "1.1rem";
const printText = "1.3rem";
const printFontFamily = "Inter";

export const createTypography = () => {
  return {
    fontFamily:
      '"Lato", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
    fontSize: 16,
    body1: {
      fontSize: large,
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: normal,
      fontWeight: 400,
      lineHeight: 1.57,
    },
    button: {
      fontWeight: 600,
    },
    caption: {
      fontSize: small,
      fontWeight: 500,
      lineHeight: 1.66,
    },
    subtitle1: {
      fontSize: large,
      fontWeight: 500,
      lineHeight: 1.57,
    },
    subtitle2: {
      fontSize: normal,
      fontWeight: 500,
      lineHeight: 1.57,
    },
    formSubHeading: {
      fontSize: large,
      fontWeight: 700,
      lineHeight: 1.57,
    },
    overline: {
      fontSize: small,
      fontWeight: 600,
      letterSpacing: "0.5px",
      lineHeight: 2.5,
      textTransform: "capitalize",
    },
    formTag: {
      fontSize: small,
      fontWeight: 600,
      lineHeight: 1.57,
      letterSpacing: "0.5px",
      // textTransform: "uppercase",
    },
    formText: {
      fontSize: small,
      fontWeight: 400,
      lineHeight: 1.57,
      letterSpacing: "0.5px",
    },
    link: {
      fontSize: small,
      fontWeight: 400,
      lineHeight: 1.57,
      letterSpacing: "0.5px",
      cursor: "pointer",
      textDecoration: "underline",
    },
    h1: {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 700,
      fontSize: "3.5rem",
      lineHeight: 1.2,
    },
    h2: {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 700,
      fontSize: "3rem",
      lineHeight: 1.2,
    },
    h3: {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 700,
      fontSize: "2.25rem",
      lineHeight: 1.2,
    },
    h4: {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 700,
      fontSize: "2rem",
      lineHeight: 1.2,
    },
    h5: {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 700,
      fontSize: "1.5rem",
      lineHeight: 1.2,
    },
    h6: {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 700,
      fontSize: "1.125rem",
      lineHeight: 1.2,
    },
    claimPrintHeading: {
      // fontFamily: printFontFamily,
      fontSize: printText,
      fontWeight: 700,
      lineHeight: 1.1,
      // letterSpacing: "0.5px",
      marginRight: 5,
    },
    claimPrintType: {
      // fontFamily: printFontFamily,
      fontSize: printText,
      fontWeight: 400,
      lineHeight: 1.1,
      // letterSpacing: "0.5px",
      fontStyle: "italic",
      // textDecoration: "underline",
      marginRight: 5,
    },
    claimPrintText: {
      // fontFamily: printFontFamily,
      fontSize: printText,
      fontWeight: 400,
      lineHeight: 1.1,
      // letterSpacing: "0.5px",
    },
    claimPrintTextBold: {
      // fontFamily: printFontFamily,
      fontSize: printText,
      fontWeight: 600,
      lineHeight: 1.1,
      marginRight: 5,
      // letterSpacing: "0.5px",
    },
  };
};
