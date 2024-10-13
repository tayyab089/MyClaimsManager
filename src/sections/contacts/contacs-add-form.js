import React, { useState, useCallback, Fragment, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  Autocomplete,
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
  Stack,
  FormHelperText,
  CircularProgress,
} from "@mui/material";
import { FieldArray, Formik } from "formik";
import { TrashIcon, PlusCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { saveContactApi, updateContactApi } from "src/network/contacts-api";
import { addContactToStore, updateContactInStore } from "src/store/reducers/contacts/thunks";

import { useDispatch } from "react-redux";

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

import { insuredObject } from "../claims/claims-static-data";
import { showAlert } from "src/utils/show-alert";

export const ContactsAddForm = ({
  item,
  isEdit,
  // setExpand,
  handleBlur,
  values,
  ix,
  handleChange,
  errors,
  setFieldValue,
  contactList,
  contactsData,
}) => {
  // State Variables =================================================
  const [expand, setExpand] = useState(false);

  console.log("What is happening???");

  return (
    <Fragment>
      {!expand ? (
        <>
          <Stack direction="row" justifyContent="space-arround" spacing={1}>
            <Autocomplete
              sx={{ width: "80%" }}
              disablePortal
              id="Insured"
              name={`insured.${ix}.name`}
              onChange={(e, v) => {
                console.log("I Ran");
                console.log(v);
                if (v) {
                  if (v?.id !== "") {
                    const foundContact = contactsData.find((x) => x.id === v?.id);
                    if (foundContact) {
                      setFieldValue(`insured.${ix}`, foundContact);
                    } else {
                      setFieldValue(`insured.${ix}.name`, v?.label);
                      setFieldValue(`insured.${ix}.id`, v?.id);
                    }
                  }
                } else {
                  setFieldValue(`insured.${ix}`, emptyValues);
                }
              }}
              onInputChange={(e, v) => {
                console.log(v);
                setFieldValue(`insured.${ix}.name`, v);
                setFieldValue(`insured.${ix}.id`, "");
              }}
              // value={{
              //   label: values.insured[ix].name,
              //   id: values.insured[ix].id,
              // }}
              inputValue={values.insured[ix].name}
              freeSolo
              options={contactList ? contactList : []}
              getOptionLabel={(option) => option.label || ""}
              renderInput={(params) => <TextField {...params} label="Name" size="small" />}
            />
            {/* </Grid>
          <Grid xs={2} sm={2} md={2}> */}
            <Button onClick={() => setExpand(true)}>Expand</Button>
          </Stack>
        </>
      ) : (
        <Card sx={{ pt: 0, backgroundColor: "#ECFDFF", border: "2px solid black" }}>
          <CardContent>
            <Box sx={{ m: -1.5 }}>
              <Grid container spacing={2}>
                <Grid xs={2} md={1.5}>
                  <Button>
                    <Avatar src={values.avatar} alt="Selected Avatar" />
                  </Button>
                </Grid>
                <Grid xs={8} md={8}>
                  <Autocomplete
                    disablePortal
                    id="Insured"
                    name={`insured.${ix}.name`}
                    onChange={(e, v) => {
                      console.log("I Ran");
                      console.log(v);
                      if (v) {
                        if (v?.id !== "") {
                          const foundContact = contactsData.find((x) => x.id === v?.id);
                          if (foundContact) {
                            setFieldValue(`insured.${ix}`, foundContact);
                          } else {
                            setFieldValue(`insured.${ix}.name`, v?.label);
                            setFieldValue(`insured.${ix}.id`, v?.id);
                          }
                        }
                      } else {
                        setFieldValue(`insured.${ix}`, emptyValues);
                      }
                    }}
                    onInputChange={(e, v) => {
                      console.log(v);
                      setFieldValue(`insured.${ix}.name`, v);
                      setFieldValue(`insured.${ix}.id`, "");
                    }}
                    inputValue={values.insured[ix].name}
                    freeSolo
                    options={contactList ? contactList : []}
                    getOptionLabel={(option) => option.label || ""}
                    renderInput={(params) => <TextField {...params} label="Name" size="small" />}
                  />
                </Grid>
                <Grid xs={2} md={2}>
                  <Button onClick={() => setExpand(false)}>Collapse</Button>
                </Grid>

                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Business Name"
                    name={`insured.${ix}.businessName`}
                    onChange={handleChange}
                    value={values.insured[ix].businessName}
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Job Title"
                    name={`insured.${ix}.jobTitle`}
                    onChange={handleChange}
                    value={values.insured[ix].jobTitle}
                  />
                </Grid>

                <Grid xs={12} md={12}>
                  <FieldArray
                    name={`insured.${ix}.address`}
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
                        {values?.insured[ix]?.address &&
                        values?.insured[ix]?.address?.length > 0 ? (
                          values?.insured[ix]?.address?.map((item, index) => (
                            <Fragment key={index}>
                              <Grid xs={12} md={2}>
                                <TextField
                                  fullWidth
                                  size="small"
                                  label="Type"
                                  name={`insured.${ix}.address.${index}.type`}
                                  onChange={handleChange}
                                  select
                                  SelectProps={{ native: true }}
                                  value={values?.insured[ix]?.address[index]?.type}
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
                                  name={`insured.${ix}.address.${index}.street`}
                                  onChange={handleChange}
                                  value={values?.insured[ix]?.address[index]?.street}
                                />
                              </Grid>
                              <Grid xs={12} md={3.66}>
                                <TextField
                                  fullWidth
                                  size="small"
                                  label="City"
                                  name={`insured.${ix}.address.${index}.city`}
                                  onChange={handleChange}
                                  value={values?.insured[ix]?.address[index]?.city}
                                />
                              </Grid>
                              <Grid xs={12} md={3.66}>
                                <TextField
                                  fullWidth
                                  size="small"
                                  label="State"
                                  name={`insured.${ix}.address.${index}.state`}
                                  onChange={handleChange}
                                  value={values?.insured[ix]?.address[index]?.state}
                                />
                              </Grid>
                              <Grid xs={10} md={3.66}>
                                <TextField
                                  fullWidth
                                  size="small"
                                  label="Zip"
                                  name={`insured.${ix}.address.${index}.zip`}
                                  onChange={handleChange}
                                  value={values?.insured[ix]?.address[index]?.zip}
                                />
                              </Grid>
                              <Grid xs={2} md={1}>
                                <Button type="button" onClick={() => arrayHelpers.remove(index)}>
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
                            <Button type="button" onClick={() => arrayHelpers.push(addressObject)}>
                              Add an Address
                            </Button>
                          </Grid>
                        )}
                        {values?.insured[ix]?.address?.length > 0 && (
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
                    name={`insured.${ix}.email`}
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
                        {values?.insured[ix]?.email && values?.insured[ix]?.email?.length > 0 ? (
                          values?.insured[ix]?.email.map((item, index) => (
                            <Fragment key={index}>
                              <Grid xs={12} md={4}>
                                <TextField
                                  fullWidth
                                  size="small"
                                  label="Type"
                                  name={`insured.${ix}.email.${index}.type`}
                                  onChange={handleChange}
                                  select
                                  SelectProps={{ native: true }}
                                  value={values?.insured[ix]?.email[index].type}
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
                                  name={`insured.${ix}.email.${index}.email`}
                                  onChange={handleChange}
                                  value={values?.insured[ix]?.email[index].email}
                                />
                                {errors.email && (
                                  <FormHelperText error>
                                    {errors?.email[index]?.email}
                                  </FormHelperText>
                                )}
                              </Grid>
                              <Grid xs={2} md={1}>
                                <Button type="button" onClick={() => arrayHelpers.remove(index)}>
                                  <TrashIcon color="red" />
                                </Button>
                              </Grid>
                            </Fragment>
                          ))
                        ) : (
                          <Grid xs={12} md={12}>
                            <Button type="button" onClick={() => arrayHelpers.push(emailObject)}>
                              Add an Email
                            </Button>
                          </Grid>
                        )}
                        {values?.insured[ix]?.email?.length > 0 && (
                          <Fragment>
                            <Grid xs={10} md={11}></Grid>
                            <Grid xs={2} md={1}>
                              <Button type="button" onClick={() => arrayHelpers.push(emailObject)}>
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
                    name={`insured.${ix}.phNo`}
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
                        {values?.insured[ix]?.phNo && values?.insured[ix]?.phNo?.length > 0 ? (
                          values?.insured[ix]?.phNo.map((item, index) => (
                            <Fragment key={index}>
                              <Grid xs={12} md={3}>
                                <TextField
                                  fullWidth
                                  size="small"
                                  label="Type"
                                  name={`insured.${ix}.phNo.${index}.type`}
                                  onChange={handleChange}
                                  select
                                  SelectProps={{ native: true }}
                                  value={values?.insured[ix]?.phNo[index].type}
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
                                  value={values?.insured[ix]?.phNo[index].no}
                                >
                                  <TextField
                                    fullWidth
                                    size="small"
                                    label="Phone No."
                                    required
                                    name={`insured.${ix}.phNo.${index}.no`}
                                  />
                                </InputMask>
                                {errors.phNo && (
                                  <FormHelperText error>{errors?.phNo[index]?.no}</FormHelperText>
                                )}
                              </Grid>
                              <Grid xs={2} md={2}>
                                <TextField
                                  fullWidth
                                  size="small"
                                  label="Ext"
                                  name={`insured.${ix}.phNo.${index}.ext`}
                                  onChange={handleChange}
                                  value={values?.insured[ix]?.phNo[index].ext}
                                />
                              </Grid>
                              <Grid xs={2} md={1}>
                                <Button type="button" onClick={() => arrayHelpers.remove(index)}>
                                  <TrashIcon color="red" />
                                </Button>
                              </Grid>
                            </Fragment>
                          ))
                        ) : (
                          <Grid xs={12} md={12}>
                            <Button type="button" onClick={() => arrayHelpers.push(phNoObject)}>
                              Add a Phone Number
                            </Button>
                          </Grid>
                        )}
                        {values?.insured[ix]?.phNo?.length > 0 && (
                          <Fragment>
                            <Grid xs={10} md={11}></Grid>
                            <Grid xs={2} md={1}>
                              <Button type="button" onClick={() => arrayHelpers.push(phNoObject)}>
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
          {/* <CardActions sx={{ justifyContent: "flex-end" }}>
            <Button variant="contained" type="submit" disabled={false || false}>
              {false ? (
                <CircularProgress style={{ width: 24, height: 24, color: "white" }} />
              ) : isEdit ? (
                "Update"
              ) : (
                "Save details"
              )}
            </Button>
          </CardActions> */}
        </Card>
      )}
    </Fragment>
  );
};
