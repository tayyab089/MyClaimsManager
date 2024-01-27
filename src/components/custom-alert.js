import { Collapse, SvgIcon, useMediaQuery } from "@mui/material";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useSelector, useDispatch } from "react-redux";
import { setAlertData } from "src/store/reducers/alert/thunks";
import { Alert } from "@mui/material";

export const CustomAlert = () => {
  const dispatch = useDispatch();
  const { alertData } = useSelector((state) => state.alert);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  return (
    <div
      style={{
        position: "fixed",
        top: 10,
        right: 10,
        zIndex: 9999,
        width: lgUp ? window.innerWidth - 300 : window.innerWidth - 20,
      }}
    >
      <Collapse in={alertData.open}>
        <Alert
          action={
            <SvgIcon
              fontSize="small"
              onClick={() => {
                dispatch(setAlertData({ open: false, message: "", type: "success" }));
              }}
              style={{ marginTop: 4.5, cursor: "pointer" }}
            >
              <XMarkIcon fontSize="inherit" />
            </SvgIcon>
          }
          sx={{ mb: 2 }}
          severity={alertData.type}
        >
          {alertData.message}
        </Alert>
      </Collapse>
    </div>
  );
};
