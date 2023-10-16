import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";

const useConfirm = () => {
  const [promise, setPromise] = useState(null);

  const confirm = (title, message) =>
    new Promise((resolve, reject) => {
      setPromise({ resolve, title, message });
    });

  const handleClose = () => {
    setPromise(null);
  };

  const handleConfirm = () => {
    promise?.resolve(true);
    handleClose();
  };

  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
  };

  const ConfirmationDialog = () => (
    <Dialog open={promise !== null} fullWidth>
      <DialogTitle>{promise?.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{promise?.message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleConfirm}>Yes</Button>
      </DialogActions>
    </Dialog>
  );

  return [ConfirmationDialog, confirm];
};

export default useConfirm;
