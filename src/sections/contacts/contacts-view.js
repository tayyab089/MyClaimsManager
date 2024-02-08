import {
  Modal,
  Box,
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  useMediaQuery,
  Unstable_Grid2 as Grid,
  CardHeader,
} from "@mui/material";
import React, { useState, Fragment, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { emptyValues } from "./contacts-static-data";

export const ContactsView = ({ item, handleClose, open, handleViewEdit }) => {
  // State Variables ===============================================
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const [contact, setContact] = useState(emptyValues);

  // Style Objects =================================================
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: lgUp ? 800 : 400,
    boxShadow: 24,
    p: 1,
    overflow: "auto",
    maxHeight: "90%",
  };

  const contentStyle = {
    paddingLeft: "15px",
  };

  const subheaderStyles = {
    marginTop: "20px",
    // borderBottom: "1px solid #ccc",
    borderTop: "1px solid #ccc",
    padding: "10px",
  };

  // UseEffect Calls ===============================================
  useEffect(() => {
    setContact(item ? item : emptyValues);
  }, [item]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Card>
          <CardHeader
            subheader={`${item?.jobTitle} @ ${item?.businessName}`}
            title={item?.name}
            sx={{ marginBottom: "-30px" }}
          />
          <CardContent>
            <Button
              type="button"
              onClick={handleClose}
              style={{ position: "absolute", top: 20, right: 10, zIndex: 99 }}
            >
              <XMarkIcon />
            </Button>
            <Grid container spacing={1}>
              <Grid xs={10} md={12} sx={subheaderStyles}>
                <Typography variant="overline">Address</Typography>
              </Grid>
              {contact?.address?.map((address, index) => {
                return (
                  <Fragment key={index}>
                    <Grid xs={4} md={3} sx={contentStyle}>
                      <Typography variant="subtitle1">{address.type} :</Typography>
                    </Grid>
                    <Grid xs={8} md={9}>
                      {address?.street}
                      {address?.city && `, ${address?.city}`}
                      {address?.state && `, ${address?.state}`}
                      {address?.zip && `, ${address?.zip}`}
                    </Grid>
                  </Fragment>
                );
              })}
              <Grid xs={10} md={12} sx={subheaderStyles}>
                <Typography variant="overline">Emails</Typography>
              </Grid>
              {contact?.email?.map((email, index) => {
                return (
                  <Fragment key={index}>
                    <Grid xs={4} md={3} sx={contentStyle}>
                      <Typography variant="subtitle1">{email.type} :</Typography>
                    </Grid>
                    <Grid xs={8} md={9}>
                      <Typography>{email?.email}</Typography>
                    </Grid>
                  </Fragment>
                );
              })}
              <Grid xs={10} md={12} sx={subheaderStyles}>
                <Typography variant="overline">Phone Numbers</Typography>
              </Grid>
              {contact?.phNo?.map((phNo, index) => {
                return (
                  <Fragment key={index}>
                    <Grid xs={4} md={3} sx={contentStyle}>
                      <Typography variant="subtitle1">{phNo.type} :</Typography>
                    </Grid>
                    <Grid xs={8} md={9}>
                      <Typography>{phNo?.ext ? `${phNo?.no} --${phNo?.ext}` : phNo.no}</Typography>
                    </Grid>
                  </Fragment>
                );
              })}
            </Grid>
          </CardContent>
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Button variant="contained" color="neutral" onClick={handleClose}>
              Close
            </Button>
            <Button variant="contained" onClick={handleViewEdit}>
              Edit
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Modal>
  );
};
