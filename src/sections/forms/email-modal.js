import {
  Modal,
  Box,
  Stack,
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
  CardHeader,
  CircularProgress,
} from "@mui/material";
import { TrashIcon, PlusCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";

export const EmailToModal = ({
  openEmailModal,
  setOpenEmailModal,
  email,
  setEmail,
  eBody,
  setEBody,
  eSubject,
  setESubject,
  emailPDF,
  emailingPDF,
}) => {
  // Style Objects ===================================================
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    boxShadow: 24,
    p: 1,
    overflow: "auto",
    // height: 700,
    maxHeight: "90%",
    // backgroundColor: "white",
  };

  const handleClose = () => {
    setEmail("");
    setEBody("");
    setOpenEmailModal(false);
  };

  return (
    <Modal
      open={openEmailModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Button
          type="button"
          onClick={handleClose}
          style={{ position: "absolute", top: 20, right: 10, zIndex: 99 }}
        >
          <XMarkIcon />
        </Button>
        <Card>
          <CardHeader title="Receiver Details" />
          <CardContent>
            <Stack direction="column" justifyContent="space-between" spacing={1}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={(event) => setEmail(event.target.value)}
                value={email}
              />
              <TextField
                fullWidth
                label="Email Subject"
                name="eSubject"
                onChange={(event) => setESubject(event.target.value)}
                value={eSubject}
              />
              <TextField
                fullWidth
                label="Email Body"
                name="eBody"
                multiline
                onChange={(event) => setEBody(event.target.value)}
                value={eBody}
              />
            </Stack>
          </CardContent>
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Button variant="contained" onClick={() => emailPDF()} disabled={emailingPDF}>
              {emailingPDF ? (
                <Fragment>
                  <CircularProgress
                    style={{ width: 24, height: 24, color: "white", marginRight: 10 }}
                  />
                  SENDING
                </Fragment>
              ) : (
                "SEND EMAIL"
              )}
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Modal>
  );
};
