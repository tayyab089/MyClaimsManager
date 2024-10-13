import React, { useState, useCallback, Fragment, useEffect, useMemo } from "react";
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
  Unstable_Grid2 as Grid,
  FormHelperText,
  CircularProgress,
  Autocomplete,
} from "@mui/material";
import { FieldArray, Formik } from "formik";
import { TrashIcon, PlusCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { saveContactApi, updateContactApi } from "src/network/contacts-api";
import { addContactToStore, updateContactInStore } from "src/store/reducers/contacts/thunks";

import { useDispatch, useSelector } from "react-redux";
import { setAlertData } from "src/store/reducers/alert/thunks";

import InputMask from "react-input-mask";
import contactSchema from "./contacts-schema";

import {
  emptyValues,
  addressTypes,
  phEmailTypes,
  addressObject,
  phNoObject,
  emailObject,
} from "./contacts-static-data";
import { showAlert } from "src/utils/show-alert";

const useTypes = (contacts) => {
  return useMemo(() => {
    const typeSet = new Set();
    contacts?.forEach((contact) => {
      contact?.address?.forEach((address) => {
        typeSet.add(address?.type);
      });
      contact?.email?.forEach((email) => {
        typeSet.add(email?.type);
      });
      contact?.phNo?.forEach((phNo) => {
        typeSet.add(phNo?.type);
      });
    });
    return Array.from(typeSet);
  }, [contacts]);
};

export const ContactsAdd = ({ open, handleClose, item, isEdit }) => {
  // State Variables =================================================
  const dispatch = useDispatch();
  const { contactsData } = useSelector((state) => state.contacts);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const [initialValues, setInitialValues] = useState(emptyValues);
  const types = useTypes(contactsData);

  // Style Objects ===================================================
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

  // Submit Function ==================================================
  const handleSubmit = useCallback(
    async (values, setSubmitting) => {
      console.log(values);
      if (isEdit) {
        const response = await updateContactApi({ contact: values });
        if (response && response.data.type !== "error") {
          showAlert(response, dispatch);
          handleClose();
          dispatch(updateContactInStore(values));
        } else {
          showAlert(response, dispatch);
        }
      } else {
        const response = await saveContactApi({ contact: values });
        if (response && response.data.type !== "error") {
          showAlert(response, dispatch);
          handleClose();
          dispatch(addContactToStore(response.data.value));
        } else {
          showAlert(response, dispatch);
        }
      }
      setSubmitting(false);
    },
    [isEdit]
  );

  // UseEffect Calls ========================================================
  useEffect(() => {
    setInitialValues(item ? item : emptyValues);
  }, [item]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
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
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            isValid,
            setFieldValue,
          }) => (
            <form autoComplete="off" noValidate onSubmit={handleSubmit}>
              {console.log(errors)}
              <Card>
                <CardHeader
                  subheader=""
                  title={isEdit ? "Edit Existing Contact" : "Add New Contact"}
                  style={{ marginBottom: 20 }}
                />
                <CardContent sx={{ pt: 0 }}>
                  <Box sx={{ m: -1.5 }}>
                    <Button
                      type="button"
                      onClick={handleClose}
                      style={{ position: "absolute", top: 20, right: 10, zIndex: 99 }}
                    >
                      <XMarkIcon />
                    </Button>
                    <Grid container spacing={2}>
                      <Grid xs={2} md={1.5}>
                        <Button>
                          <Avatar src={values.avatar} alt="Selected Avatar" />
                        </Button>
                      </Grid>
                      <Grid xs={10} md={10.5}>
                        <TextField
                          fullWidth
                          label="Name"
                          name="name"
                          onChange={handleChange}
                          required
                          value={values.name}
                        />
                        <FormHelperText error>{errors.name}</FormHelperText>
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
                            <Grid container spacing={1}>
                              <Grid xs={12} md={12}>
                                <Typography
                                  style={{
                                    alignItems: "center",
                                    display: "flex",
                                    height: "100%",
                                  }}
                                  variant="formSubHeading"
                                >
                                  Address
                                </Typography>
                              </Grid>
                              {values?.address && values?.address?.length > 0 ? (
                                values?.address?.map((item, index) => (
                                  <Fragment key={index}>
                                    <Grid xs={12} md={3}>
                                      <Autocomplete
                                        disablePortal
                                        id={`address.${index}.type`}
                                        name={`address.${index}.type`}
                                        // onChange={handleChange}
                                        onInputChange={(e, v) => {
                                          setFieldValue(`address.${index}.type`, v);
                                        }}
                                        value={values?.address[index]?.type}
                                        options={types ? types : []}
                                        freeSolo
                                        renderInput={(params) => (
                                          <TextField {...params} label="Type" size="small" />
                                        )}
                                      />
                                      {/* <TextField
                                        fullWidth
                                        size="small"
                                        label="Type"
                                        name={`address.${index}.type`}
                                        onChange={handleChange}
                                        select
                                        SelectProps={{ native: true }}
                                        value={values?.address[index]?.type}
                                      >
                                        {addressTypes.map((option) => (
                                          <option key={option.value} value={option.value}>
                                            {option.label}
                                          </option>
                                        ))}
                                      </TextField> */}
                                    </Grid>
                                    <Grid xs={12} md={9}>
                                      <TextField
                                        fullWidth
                                        size="small"
                                        label="Appartmet No, Street"
                                        name={`address.${index}.street`}
                                        onChange={handleChange}
                                        value={values?.address[index]?.street}
                                      />
                                    </Grid>
                                    <Grid xs={12} md={3.66}>
                                      <TextField
                                        fullWidth
                                        size="small"
                                        label="City"
                                        name={`address.${index}.city`}
                                        onChange={handleChange}
                                        value={values?.address[index]?.city}
                                      />
                                    </Grid>
                                    <Grid xs={12} md={3.66}>
                                      <TextField
                                        fullWidth
                                        size="small"
                                        label="State"
                                        name={`address.${index}.state`}
                                        onChange={handleChange}
                                        value={values?.address[index]?.state}
                                      />
                                    </Grid>
                                    <Grid xs={10} md={3.66}>
                                      <TextField
                                        fullWidth
                                        size="small"
                                        label="Zip"
                                        name={`address.${index}.zip`}
                                        onChange={handleChange}
                                        value={values?.address[index]?.zip}
                                      />
                                    </Grid>
                                    <Grid xs={2} md={1}>
                                      <Button
                                        type="button"
                                        onClick={() => arrayHelpers.remove(index)}
                                      >
                                        <TrashIcon color="red" />
                                      </Button>
                                    </Grid>
                                    <Grid xs={12} md={12}>
                                      <Divider />
                                    </Grid>
                                  </Fragment>
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
                              {values?.address?.length > 0 && (
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
                                  variant="formSubHeading"
                                >
                                  Email
                                </Typography>
                              </Grid>
                              {values?.email && values?.email?.length > 0 ? (
                                values.email.map((item, index) => (
                                  <Fragment key={index}>
                                    <Grid xs={12} md={4}>
                                      <Autocomplete
                                        disablePortal
                                        id={`email.${index}.type`}
                                        name={`email.${index}.type`}
                                        // onChange={handleChange}
                                        onInputChange={(e, v) => {
                                          setFieldValue(`email.${index}.type`, v);
                                        }}
                                        value={values?.email[index]?.type}
                                        options={types ? types : []}
                                        freeSolo
                                        renderInput={(params) => (
                                          <TextField {...params} label="Type" size="small" />
                                        )}
                                      />
                                      {/* <TextField
                                        fullWidth
                                        size="small"
                                        label="Type"
                                        name={`email.${index}.type`}
                                        onChange={handleChange}
                                        select
                                        SelectProps={{ native: true }}
                                        value={values.email[index].type}
                                      >
                                        {phEmailTypes.map((option) => (
                                          <option key={option.value} value={option.value}>
                                            {option.label}
                                          </option>
                                        ))}
                                      </TextField> */}
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
                                      {errors.email && (
                                        <FormHelperText error>
                                          {errors?.email[index]?.email}
                                        </FormHelperText>
                                      )}
                                    </Grid>
                                    <Grid xs={2} md={1}>
                                      <Button
                                        type="button"
                                        onClick={() => arrayHelpers.remove(index)}
                                      >
                                        <TrashIcon color="red" />
                                      </Button>
                                    </Grid>
                                  </Fragment>
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
                              {values?.email?.length > 0 && (
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
                                  variant="formSubHeading"
                                >
                                  Phone Number
                                </Typography>
                              </Grid>
                              {values?.phNo && values?.phNo?.length > 0 ? (
                                values?.phNo?.map((item, index) => (
                                  <Fragment key={index}>
                                    <Grid xs={12} md={3}>
                                      <Autocomplete
                                        disablePortal
                                        id={`phNo.${index}.type`}
                                        name={`phNo.${index}.type`}
                                        // onChange={handleChange}
                                        onInputChange={(e, v) => {
                                          setFieldValue(`phNo.${index}.type`, v);
                                        }}
                                        value={values?.phNo[index]?.type}
                                        options={types ? types : []}
                                        freeSolo
                                        renderInput={(params) => (
                                          <TextField {...params} label="Type" size="small" />
                                        )}
                                      />
                                      {/* <TextField
                                        fullWidth
                                        size="small"
                                        label="Type"
                                        name={`phNo.${index}.type`}
                                        onChange={handleChange}
                                        select
                                        SelectProps={{ native: true }}
                                        value={values.phNo[index].type}
                                      >
                                        {phEmailTypes.map((option) => (
                                          <option key={option.value} value={option.value}>
                                            {option.label}
                                          </option>
                                        ))}
                                      </TextField> */}
                                    </Grid>
                                    <Grid xs={8} md={6}>
                                      <InputMask
                                        mask="999-999-9999"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.phNo[index].no}
                                      >
                                        <TextField
                                          fullWidth
                                          size="small"
                                          label="Phone No."
                                          required
                                          name={`phNo.${index}.no`}
                                        />
                                      </InputMask>
                                      {errors.phNo && (
                                        <FormHelperText error>
                                          {errors?.phNo[index]?.no}
                                        </FormHelperText>
                                      )}
                                    </Grid>
                                    <Grid xs={2} md={2}>
                                      <TextField
                                        fullWidth
                                        size="small"
                                        label="Ext"
                                        name={`phNo.${index}.ext`}
                                        onChange={handleChange}
                                        value={values.phNo[index].ext}
                                      />
                                    </Grid>
                                    <Grid xs={2} md={1}>
                                      <Button
                                        type="button"
                                        onClick={() => arrayHelpers.remove(index)}
                                      >
                                        <TrashIcon color="red" />
                                      </Button>
                                    </Grid>
                                  </Fragment>
                                ))
                              ) : (
                                <Grid xs={12} md={12}>
                                  <Button
                                    type="button"
                                    onClick={() => arrayHelpers.push(phNoObject)}
                                  >
                                    Add a Phone Number
                                  </Button>
                                </Grid>
                              )}
                              {values?.phNo?.length > 0 && (
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
                    {isSubmitting ? (
                      <CircularProgress style={{ width: 24, height: 24, color: "white" }} />
                    ) : isEdit ? (
                      "Update"
                    ) : (
                      "Save details"
                    )}
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
