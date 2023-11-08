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
} from "@mui/material";
import InputMask from "react-input-mask";
import { FieldArray, Formik } from "formik";
import React, { useState, useCallback, Fragment, useEffect } from "react";
import { TrashIcon, PlusCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { saveContactApi, updateContactApi } from "src/network/api";
import contactSchema from "./contacts-schema";
import { fetchContacts } from "src/store/reducers/contacts/thunks";
import { useDispatch } from "react-redux";
import { setAlertData } from "src/store/reducers/alert/thunks";
import {
  emptyValues,
  addressTypes,
  phEmailTypes,
  addressObject,
  phNoObject,
  emailObject,
} from "./contacts-static-data";

export const ContactsEdit = ({ open, handleClose, item, isEdit, setExpand }) => {
  // State Variables =================================================
  const dispatch = useDispatch();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const [initialValues, setInitialValues] = useState(emptyValues);

  // Style Objects ===================================================
  const style = {
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
          dispatch(
            setAlertData({ open: true, message: response.data.message, type: response.data.type })
          );
          handleClose();
          dispatch(fetchContacts());
          setTimeout(() => {
            dispatch(setAlertData({ open: false, message: "", type: "" }));
          }, 3000);
        } else {
          alert(response.data.message);
        }
      } else {
        const response = await saveContactApi({ contact: values });
        if (response && response.data.type !== "error") {
          dispatch(
            setAlertData({ open: true, message: response.data.message, type: response.data.type })
          );
          handleClose();
          dispatch(fetchContacts());
          setTimeout(() => {
            dispatch(setAlertData({ open: false, message: "", type: "" }));
          }, 3000);
        } else {
          dispatch(
            setAlertData({ open: true, message: response.data.message, type: response.data.type })
          );
          setTimeout(() => {
            dispatch(setAlertData({ open: false, message: "", type: "" }));
          }, 3000);
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
    <Box sx={style}>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => handleSubmit(values, setSubmitting)}
        validationSchema={contactSchema}
        enableReinitialize
        validateOnMount
      >
        {({ values, errors, handleBlur, handleChange, handleSubmit, isSubmitting, isValid }) => (
          <form autoComplete="off" noValidate onSubmit={handleSubmit}>
            {console.log(errors)}
            <Card sx={{ backgroundColor: "#3FC79A" }}>
              <CardHeader />
              <CardContent sx={{ pt: 0 }}>
                <Box sx={{ m: -1 }}>
                  <Grid container spacing={0.5}>
                    <Grid xs={2} md={2}>
                      <Button>
                        <Avatar src={values.avatar} alt="Selected Avatar" />
                      </Button>
                    </Grid>
                    <Grid xs={10} md={8}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Name"
                        name="name"
                        onChange={handleChange}
                        required
                        value={values.name}
                      />
                      <FormHelperText error>{errors.name}</FormHelperText>
                    </Grid>
                    <Grid xs={2} md={2}>
                      <Button type="button" onClick={() => setExpand(false)} style={{ zIndex: 99 }}>
                        Collapse
                      </Button>
                    </Grid>

                    <Grid xs={12} md={6}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Business Name"
                        name="businessName"
                        onChange={handleChange}
                        value={values.businessName}
                      />
                    </Grid>
                    <Grid xs={12} md={6}>
                      <TextField
                        fullWidth
                        size="small"
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
                          <Grid container spacing={2}>
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
                            {values.address && values.address.length > 0 ? (
                              values.address.map((item, index) => (
                                <>
                                  <Grid xs={12} md={2}>
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
                                      {addressTypes.map((option) => (
                                        <option key={option.value} value={option.value}>
                                          {option.label}
                                        </option>
                                      ))}
                                    </TextField>
                                  </Grid>
                                  <Grid xs={12} md={10}>
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
                                variant="formSubHeading"
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
                                      {phEmailTypes.map((option) => (
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
                                variant="formSubHeading"
                              >
                                Phone Number
                              </Typography>
                            </Grid>
                            {values.phNo && values.phNo.length > 0 ? (
                              values.phNo.map((item, index) => (
                                <>
                                  <Grid xs={12} md={3}>
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
                                      {phEmailTypes.map((option) => (
                                        <option key={option.value} value={option.value}>
                                          {option.label}
                                        </option>
                                      ))}
                                    </TextField>
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
                                </>
                              ))
                            ) : (
                              <Grid xs={12} md={12}>
                                <Button type="button" onClick={() => arrayHelpers.push(phNoObject)}>
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
  );
};
