export const showAlert = (response) => {
  if (response && response.data.type !== "error") {
    dispatch(
      setAlertData({ open: true, message: response.data.message, type: response.data.type })
    );
    handleClose();
    dispatch(updateContactInStore(values));
  } else {
    alert(response.data.message);
  }
};
