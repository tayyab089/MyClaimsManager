import { styled } from "@mui/material/styles";

const FlexContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

export const ButtonsContainer = ({ children }) => <FlexContainer>{children}</FlexContainer>;
