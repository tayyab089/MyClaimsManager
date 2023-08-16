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
  useMediaQuery,
  Avatar,
  Menu,
  MenuItem,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { FieldArray, Formik } from "formik";
import React, { useState, useCallback, Fragment, useEffect } from "react";
import { TrashIcon, PlusCircleIcon } from "@heroicons/react/20/solid";
import { saveContactApi, updateContactApi } from "src/network/api";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { neutral, indigo } from "src/theme/colors";
import contactSchema from "./contacts-schema";

const AvatarDropdown = ({ avatars, selectedAvatar, onSelectAvatar }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAvatarSelect = (avatar) => {
    onSelectAvatar(avatar);
    handleClose();
  };

  return (
    <div>
      <Button onClick={handleClick}>
        <Avatar src={selectedAvatar} alt="Selected Avatar" />
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {avatars.map((avatar, index) => (
          <MenuItem key={index} onClick={() => handleAvatarSelect(avatar)}>
            <Avatar src={avatar} alt={`Avatar ${index}`} />
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

const avatars = [
  "",
  "/assets/avatars/avatar-carson-darrin.png",
  "/assets/avatars/avatar-fran-perez.png",
  "/assets/avatars/avatar-jie-yan-song.png",
  "/assets/avatars/avatar-anika-visser.png",
  "/assets/avatars/avatar-miron-vitold.png",
  "/assets/avatars/avatar-penjani-inyene.png",
  "/assets/avatars/avatar-omar-darboe.png",
  "/assets/avatars/avatar-siegbert-gottfried.png",
  "/assets/avatars/avatar-iulia-albu.png",
  "/assets/avatars/avatar-nasimiyu-danai.png",
];

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

export const ContactsAdd = ({ open, handleClose, item, isEdit, fetchContacts }) => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: lgUp ? 800 : 400,
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
    code: "",
    zip: "",
    street: "",
  };

  const phNoObject = { type: "work", no: "" };
  const emailObject = { type: "work", email: "" };

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

  const [initialValues, setInitialValues] = useState(emptyValues);

  useEffect(() => {
    setInitialValues(item ? item : emptyValues);
  }, [item]);

  const handleSubmit = useCallback(
    async (values, setSubmitting) => {
      if (isEdit) {
        const response = await updateContactApi({ contact: values });
        if (response && response.data.type !== "error") {
          alert(response.data.message);
          handleClose();
          fetchContacts();
        } else {
          alert(response.data.message);
        }
      } else {
        const response = await saveContactApi({ contact: values });
        if (response && response.data.type !== "error") {
          alert(response.data.message);
          handleClose();
          fetchContacts();
        } else {
          alert(response.data.message);
        }
      }
      // alert(JSON.stringify(response.data, null, 2));
      setSubmitting(false);
    },
    [isEdit]
  );

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      // style={{ overflow: "scroll", height: "100%" }}
      disableEscapeKeyDown
    >
      <Box sx={style}>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting }) => handleSubmit(values, setSubmitting)}
          validationSchema={contactSchema}
          enableReinitialize
          validateOnMount
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            isSubmitting,
            setFieldValue,
            isValid,
          }) => (
            <form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Card>
                <CardHeader subheader="The information can be edited" title="Contact" />
                <CardContent sx={{ pt: 0 }}>
                  <Box sx={{ m: -1.5 }}>
                    <Grid container spacing={2}>
                      <Grid xs={2} md={2}>
                        <AvatarDropdown
                          avatars={avatars}
                          selectedAvatar={values.avatar}
                          onSelectAvatar={(avatar) => setFieldValue("avatar", avatar)}
                        />
                      </Grid>
                      <Grid xs={10} md={10}>
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
                                        name={`address.${index}.code`}
                                        onChange={handleChange}
                                        value={values?.address[index]?.code}
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
                                        required
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
                          name="phNo"
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
                              {values.phNo && values.phNo.length > 0 ? (
                                values.phNo.map((item, index) => (
                                  <>
                                    <Grid xs={12} md={4}>
                                      <TextField
                                        fullWidth
                                        size="small"
                                        label="Type"
                                        name={`phNo.${index}.type`}
                                        onChange={handleChange}
                                        select
                                        SelectProps={{ native: true }}
                                        value={values.phNo[index].type}
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
                                        required
                                        name={`phNo.${index}.no`}
                                        onChange={handleChange}
                                        value={values.phNo[index].no}
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
                                    onClick={() => arrayHelpers.push(phNoObject)}
                                  >
                                    Add a phNo Number
                                  </Button>
                                </Grid>
                              )}
                              {values.phNo.length > 0 && (
                                <Fragment>
                                  <Grid xs={10} md={11}></Grid>
                                  <Grid xs={2} md={1}>
                                    <Button
                                      type="button"
                                      onClick={() => arrayHelpers.push(phNoObject)}
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
                  <Button variant="contained" type="submit" disabled={isSubmitting || !isValid}>
                    {isEdit ? "Update" : "Save details"}
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
