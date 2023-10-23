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
  Avatar,
} from "@mui/material";
import { getInitials } from "src/utils/get-initials";
import React, { useState, useCallback, Fragment, useEffect } from "react";

export const ContactsView = ({ item, handleClose, open, handleViewEdit }) => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

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

  const headerStyle = {
    backgroundColor: "#f0f0f0",
    borderBottom: "1px solid #ccc",
    padding: "10px",
  };

  const emptyValues = {
    id: "",
    userId: "",
    address: [
      {
        type: "work",
        city: "",
        code: "",
        zip: "",
        street: "",
      },
    ],
    avatar: "",
    email: [{ type: "work", email: "" }],
    name: "",
    businessName: "",
    jobTitle: "",
    phNo: [{ type: "work", no: "" }],
  };

  const [contact, setContact] = useState(emptyValues);

  useEffect(() => {
    setContact(item ? item : emptyValues);
  }, [item]);

  console.log(item);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      //   disableEscapeKeyDown
    >
      <Box sx={style}>
        <Card>
          {/* <CardHeader subheader="" title="Contact Info">
            <Avatar src={item?.avatar}>{getInitials(item?.name)}</Avatar>
          </CardHeader> */}
          <CardContent>
            <Grid container spacing={1}>
              <Grid xs={10} md={12} sx={headerStyle}>
                <Typography variant="oerline">Basic Info</Typography>
              </Grid>
              <Grid xs={10} md={3}>
                <Typography variant="subtitle1">Name :</Typography>
              </Grid>
              <Grid xs={10} md={9}>
                <Typography>{item?.name}</Typography>
              </Grid>
              <Grid xs={10} md={3}>
                <Typography variant="subtitle1">Business Name :</Typography>
              </Grid>
              <Grid xs={10} md={9}>
                <Typography>{item?.businessName}</Typography>
              </Grid>
              <Grid xs={10} md={3}>
                <Typography variant="subtitle1">Job Title :</Typography>
              </Grid>
              <Grid xs={10} md={9}>
                <Typography>{item?.jobTitle}</Typography>
              </Grid>
              <Grid xs={10} md={12} sx={headerStyle}>
                <Typography variant="oerline">Address</Typography>
              </Grid>
              {contact.address.map((address, index) => {
                return (
                  <Fragment key={index}>
                    <Grid xs={10} md={3}>
                      <Typography variant="subtitle1">{address.type} :</Typography>
                    </Grid>
                    <Grid xs={10} md={9}>
                      {address?.street}
                      {address?.city && `, ${address?.city}`}
                      {address?.state && `, ${address?.state}`}
                      {address?.zip && `, ${address?.zip}`}
                    </Grid>
                  </Fragment>
                );
              })}
              <Grid xs={10} md={12} sx={headerStyle}>
                <Typography variant="oerline">Emails</Typography>
              </Grid>
              {contact.email.map((email, index) => {
                return (
                  <Fragment key={index}>
                    <Grid xs={10} md={3}>
                      <Typography variant="subtitle1">{email.type} :</Typography>
                    </Grid>
                    <Grid xs={10} md={9}>
                      <Typography>{email?.email}</Typography>
                    </Grid>
                  </Fragment>
                );
              })}
              <Grid xs={10} md={12} sx={headerStyle}>
                <Typography variant="oerline">Phone Numbers</Typography>
              </Grid>
              {contact.phNo.map((phNo, index) => {
                return (
                  <Fragment key={index}>
                    <Grid xs={10} md={3}>
                      <Typography variant="subtitle1">{phNo.type} :</Typography>
                    </Grid>
                    <Grid xs={10} md={9}>
                      <Typography>{phNo?.no}</Typography>
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
