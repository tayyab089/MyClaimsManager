import {
  Modal,
  Box,
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { FieldArray, Formik } from "formik";
import React, { useState, useCallback, Fragment } from "react";
import { TrashIcon, PlusCircleIcon } from "@heroicons/react/20/solid";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { neutral, indigo } from "src/theme/colors";

const states = [
  {
    value: "work",
    label: "Work",
  },
  {
    value: "personal",
    label: "Personal",
  },
  {
    value: "mobile",
    label: "Mobile",
  },
  {
    value: "landLine",
    label: "Land Line",
  },
];

export const ContactsAdd = ({ open, handleClose, item }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 1,
    overflow: "auto",
    maxHeight: "90%",
  };

  const addressObject = {
    type: "work",
    city: "",
    countryCode: "",
    zip: "",
    street: "",
  };

  const phoneObject = { type: "work", no: "" };
  const emailObject = { type: "work", email: "" };

  const [initialValues, setInitialValues] = useState({
    id: "5e887ac47eed253091be10cb",
    address: [
      {
        type: "work",
        city: "Cleveland",
        countryCode: "US",
        zip: "2500",
        street: "2849 Fulton Street",
      },
    ],
    avatar: "/assets/avatars/avatar-carson-darrin.png",
    email: [
      { type: "work", email: "carson.darrin@devias.io" },
      { type: "work", email: "tayyab.darrin@devias.io" },
    ],
    name: "Carson Darrin",
    businessName: "Hellasdasd",
    jobTitle: "asdasdsad",
    phone: [
      { type: "work", no: "309-432-123" },
      { type: "work", no: "309-432-157" },
    ],
  });

  const handleSubmit = useCallback((values) => {
    alert(JSON.stringify(values, null, 2));
  }, []);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      // style={{ overflow: "scroll", height: "100%" }}
    >
      <Box sx={style}>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));

              setSubmitting(false);
            }, 400);
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
            <form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Card>
                <CardHeader subheader="The information can be edited" title="Contact" />
                <CardContent sx={{ pt: 0 }}>
                  <Box sx={{ m: -1.5 }}>
                    <Grid container spacing={2}>
                      <Grid xs={12} md={12}>
                        <TextField
                          fullWidth
                          label="Name"
                          name="name"
                          onChange={handleChange}
                          required
                          value={values.name}
                        />
                      </Grid>
                      <Grid xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Business Name"
                          name="businessName"
                          onChange={handleChange}
                          value={values.businessName}
                        />
                      </Grid>
                      <Grid xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Job Title"
                          name="jobTitle"
                          onChange={handleChange}
                          value={values.jobTitle}
                        />
                      </Grid>

                      <Grid xs={12} md={12}>
                        <FieldArray
                          name="address"
                          render={(arrayHelpers) => (
                            <Grid
                              container
                              spacing={1}
                              // style={{ border: "dashed", borderColor: "black" }}
                            >
                              <Grid xs={12} md={12}>
                                <Typography
                                  style={{
                                    alignItems: "center",
                                    display: "flex",
                                    height: "100%",
                                  }}
                                >
                                  Address
                                </Typography>
                              </Grid>
                              {values.address && values.address.length > 0 ? (
                                values.address.map((item, index) => (
                                  <>
                                    <Grid xs={12} md={3}>
                                      <TextField
                                        fullWidth
                                        size="small"
                                        label="Type"
                                        name={`address.${index}.type`}
                                        onChange={handleChange}
                                        select
                                        SelectProps={{ native: true }}
                                        value={values?.address[index]?.type}
                                      >
                                        {states.map((option) => (
                                          <option key={option.value} value={option.value}>
                                            {option.label}
                                          </option>
                                        ))}
                                      </TextField>
                                    </Grid>
                                    <Grid xs={12} md={3}>
                                      <TextField
                                        fullWidth
                                        size="small"
                                        label="City"
                                        name={`address.${index}.city`}
                                        onChange={handleChange}
                                        value={values?.address[index]?.city}
                                      />
                                    </Grid>
                                    <Grid xs={12} md={3}>
                                      <TextField
                                        fullWidth
                                        size="small"
                                        label="Country Code"
                                        name={`address.${index}.countryCode`}
                                        onChange={handleChange}
                                        value={values?.address[index]?.countryCode}
                                      />
                                    </Grid>
                                    <Grid xs={12} md={3}>
                                      <TextField
                                        fullWidth
                                        size="small"
                                        label="Zip"
                                        name={`address.${index}.zip`}
                                        onChange={handleChange}
                                        value={values?.address[index]?.zip}
                                      />
                                    </Grid>
                                    <Grid xs={10} md={11}>
                                      <TextField
                                        fullWidth
                                        size="small"
                                        label="Street"
                                        name={`address.${index}.street`}
                                        onChange={handleChange}
                                        value={values?.address[index]?.street}
                                      />
                                    </Grid>
                                    <Grid xs={2} md={1}>
                                      <Button
                                        type="button"
                                        onClick={() => arrayHelpers.remove(index)}
                                      >
                                        <TrashIcon />
                                      </Button>
                                    </Grid>
                                    <Grid xs={12} md={12}>
                                      <Divider />
                                    </Grid>
                                  </>
                                ))
                              ) : (
                                <Grid xs={12} md={12}>
                                  <Button
                                    type="button"
                                    onClick={() => arrayHelpers.push(addressObject)}
                                  >
                                    Add an Address
                                  </Button>
                                </Grid>
                              )}
                              {values.address.length > 0 && (
                                <Fragment>
                                  <Grid xs={10} md={11}></Grid>
                                  <Grid xs={2} md={1}>
                                    <Button
                                      type="button"
                                      onClick={() => arrayHelpers.push(addressObject)}
                                    >
                                      <PlusCircleIcon />
                                    </Button>
                                  </Grid>
                                </Fragment>
                              )}
                            </Grid>
                          )}
                        />
                      </Grid>

                      <Grid xs={12} md={12} style={{ marginTop: "-32px" }}>
                        <FieldArray
                          name="email"
                          render={(arrayHelpers) => (
                            <Grid container spacing={1}>
                              <Grid xs={12} md={12}>
                                <Typography
                                  style={{
                                    alignItems: "center",
                                    display: "flex",
                                    height: "100%",
                                  }}
                                >
                                  Email
                                </Typography>
                              </Grid>
                              {values.email && values.email.length > 0 ? (
                                values.email.map((item, index) => (
                                  <>
                                    <Grid xs={12} md={4}>
                                      <TextField
                                        fullWidth
                                        size="small"
                                        label="Type"
                                        name={`email.${index}.type`}
                                        onChange={handleChange}
                                        select
                                        SelectProps={{ native: true }}
                                        value={values.email[index].type}
                                      >
                                        {states.map((option) => (
                                          <option key={option.value} value={option.value}>
                                            {option.label}
                                          </option>
                                        ))}
                                      </TextField>
                                    </Grid>
                                    <Grid xs={10} md={7}>
                                      <TextField
                                        fullWidth
                                        size="small"
                                        label="Email"
                                        name={`email.${index}.email`}
                                        onChange={handleChange}
                                        value={values.email[index].email}
                                      />
                                    </Grid>
                                    <Grid xs={2} md={1}>
                                      <Button
                                        type="button"
                                        onClick={() => arrayHelpers.remove(index)}
                                      >
                                        <TrashIcon />
                                      </Button>
                                    </Grid>
                                  </>
                                ))
                              ) : (
                                <Grid xs={12} md={12}>
                                  <Button
                                    type="button"
                                    onClick={() => arrayHelpers.push(emailObject)}
                                  >
                                    Add an Email
                                  </Button>
                                </Grid>
                              )}
                              {values.email.length > 0 && (
                                <Fragment>
                                  <Grid xs={10} md={11}></Grid>
                                  <Grid xs={2} md={1}>
                                    <Button
                                      type="button"
                                      onClick={() => arrayHelpers.push(emailObject)}
                                    >
                                      <PlusCircleIcon />
                                    </Button>
                                  </Grid>
                                </Fragment>
                              )}
                            </Grid>
                          )}
                        />
                      </Grid>

                      <Grid xs={12} md={12} style={{ marginTop: "-32px" }}>
                        <FieldArray
                          name="phone"
                          render={(arrayHelpers) => (
                            <Grid container spacing={1}>
                              <Grid xs={12} md={12}>
                                <Typography
                                  style={{
                                    alignItems: "center",
                                    display: "flex",
                                    height: "100%",
                                  }}
                                >
                                  Phone Number
                                </Typography>
                              </Grid>
                              {values.phone && values.phone.length > 0 ? (
                                values.phone.map((item, index) => (
                                  <>
                                    <Grid xs={12} md={4}>
                                      <TextField
                                        fullWidth
                                        size="small"
                                        label="Type"
                                        name={`phone.${index}.type`}
                                        onChange={handleChange}
                                        select
                                        SelectProps={{ native: true }}
                                        value={values.phone[index].type}
                                      >
                                        {states.map((option) => (
                                          <option key={option.value} value={option.value}>
                                            {option.label}
                                          </option>
                                        ))}
                                      </TextField>
                                    </Grid>
                                    <Grid xs={10} md={7}>
                                      <TextField
                                        fullWidth
                                        size="small"
                                        label="Phone No."
                                        name={`phone.${index}.no`}
                                        onChange={handleChange}
                                        value={values.phone[index].no}
                                      />
                                    </Grid>
                                    <Grid xs={2} md={1}>
                                      <Button
                                        type="button"
                                        onClick={() => arrayHelpers.remove(index)}
                                      >
                                        <TrashIcon />
                                      </Button>
                                    </Grid>
                                  </>
                                ))
                              ) : (
                                <Grid xs={12} md={12}>
                                  <Button
                                    type="button"
                                    onClick={() => arrayHelpers.push(phoneObject)}
                                  >
                                    Add a Phone Number
                                  </Button>
                                </Grid>
                              )}
                              {values.phone.length > 0 && (
                                <Fragment>
                                  <Grid xs={10} md={11}></Grid>
                                  <Grid xs={2} md={1}>
                                    <Button
                                      type="button"
                                      onClick={() => arrayHelpers.push(phoneObject)}
                                    >
                                      <PlusCircleIcon />
                                    </Button>
                                  </Grid>
                                </Fragment>
                              )}
                            </Grid>
                          )}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </CardContent>
                <Divider />
                <CardActions sx={{ justifyContent: "flex-end" }}>
                  <Button variant="contained" color="neutral" onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button variant="contained" type="submit" disabled={isSubmitting}>
                    Save details
                  </Button>
                </CardActions>
              </Card>
            </form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};
