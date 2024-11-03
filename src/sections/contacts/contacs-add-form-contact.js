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
  Stack,
  Autocomplete,
} from "@mui/material";
import { FieldArray, Formik } from "formik";
import { TrashIcon, PlusCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { saveContactApi, updateContactApi } from "src/network/claims-api";
import { addContactToStore, updateContactInStore } from "src/store/reducers/contacts/thunks";

import { useDispatch } from "react-redux";
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
import { insuredObject } from "../claims/claims-static-data";

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

export const ContactsAddFormContact = ({
  item,
  isEdit,
  setFieldValue,
  ix,
  values,
  contactList,
  contactCategoryList,
  contactsData,
}) => {
  // State Variables =================================================
  const dispatch = useDispatch();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const smUp = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const [initialValues, setInitialValues] = useState(emptyValues);
  const [expand, setExpand] = useState(false);
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
      if (isEdit) {
        const response = await updateContactApi({ contact: values });
        if (response && response.data.type !== "error") {
          showAlert(response, dispatch);
          dispatch(updateContactInStore(values));
        } else {
          showAlert(response, dispatch);
        }
      } else {
        const response = await saveContactApi({ contact: values });
        if (response && response.data.type !== "error") {
          showAlert(response, dispatch);
          dispatch(addContactToStore(response?.data?.value));
          setFieldValue(`contacts.${ix}.contact.name`, response?.data?.value?.name);
          setFieldValue(`contacts.${ix}.contact.id`, response?.data?.value?.id);
          setFieldValue(`contacts.${ix}.category`, response?.data?.value?.category);
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
    <Fragment>
      {!expand ? (
        <>
          <Stack
            direction="row"
            justifyContent="space-between"
            spacing={!smUp ? 0 : 1}
            flexWrap={!smUp && "wrap"}
          >
            <Autocomplete
              sx={{ width: "25%", minWidth: "250px" }}
              disablePortal
              id={`contacts.${ix}.category`}
              name={`contacts.${ix}.category`}
              onInputChange={(e, v) => {
                setFieldValue(`contacts.${ix}.category`, v);
              }}
              value={values.contacts[ix].category}
              options={contactCategoryList ? contactCategoryList : []}
              freeSolo
              renderInput={(params) => <TextField {...params} label="Category" size="small" />}
            />
            {/* {!smUp && <Button onClick={() => setExpand(true)}>Expand</Button>} */}
            <Autocomplete
              sx={{ width: "65%", minWidth: "170px", marginTop: !smUp ? 1 : 0 }}
              disablePortal
              id="Contacts"
              name={`contacts.${ix}.contact.name`}
              onChange={(e, v) => {
                if (v) {
                  if (v?.id !== "") {
                    const category = contactsData.find((x) => x.id === v?.id).category;
                    setFieldValue(`contacts.${ix}.contact.name`, v?.label);
                    setFieldValue(`contacts.${ix}.contact.id`, v?.id);
                    setFieldValue(`contacts.${ix}.category`, category);
                  }
                } else {
                  setFieldValue(`contacts.${ix}.contact`, { name: "", id: "" });
                }
              }}
              onInputChange={(e, v) => {
                setFieldValue(`contacts.${ix}.contact.name`, v);
                setFieldValue(`contacts.${ix}.contact.id`, "");
              }}
              // value={{
              //   label: values.insured[ix].name,
              //   id: values.insured[ix].id,
              // }}
              inputValue={values?.contacts[ix]?.contact?.name}
              freeSolo
              options={contactList ? contactList : []}
              getOptionLabel={(option) => option.label || ""}
              renderInput={(params) => <TextField {...params} label="Name" size="small" />}
            />
            {/* </Grid>
         <Grid xs={2} sm={2} md={2}> */}
            <Button onClick={() => setExpand(true)} sx={{ marginTop: !smUp ? 1 : 0 }}>
              Expand
            </Button>
          </Stack>
        </>
      ) : (
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
              <Card sx={{ pt: 0, backgroundColor: "#ECFDFF", border: "2px solid black" }}>
                {/* <CardHeader
                subheader=""
                title={isEdit ? "Edit Existing Contact" : "Add New Contact"}
                style={{ marginBottom: 20 }}
              /> */}
                <CardContent>
                  <Box sx={{ m: -1.5 }}>
                    <Grid container spacing={2}>
                      <Grid xs={2} md={1.5}>
                        <Button>
                          <Avatar src={values.avatar} alt="Selected Avatar" />
                        </Button>
                      </Grid>
                      {!smUp && (
                        <>
                          <Grid xs={3} md={2}></Grid>
                          <Grid xs={7} md={2}>
                            <Button onClick={() => setExpand(false)}>Collapse</Button>
                          </Grid>
                        </>
                      )}
                      <Grid xs={12} md={4}>
                        <Autocomplete
                          id="Category"
                          name="category"
                          // disablePortal
                          onChange={handleChange}
                          onInputChange={(e, v) => {
                            setFieldValue("category", v);
                          }}
                          inputValue={values.category}
                          value={values.category}
                          options={contactCategoryList ? contactCategoryList : []}
                          freeSolo
                          renderInput={(params) => (
                            <TextField {...params} label="Category" size="small" />
                          )}
                        />
                        {/* <TextField
                          fullWidth
                          label="Category"
                          name="category"
                          onChange={handleChange}
                          required
                          value={values.category}
                          size="small"
                        /> */}
                      </Grid>
                      <Grid xs={12} md={4}>
                        <TextField
                          fullWidth
                          label="Name"
                          name="name"
                          onChange={handleChange}
                          required
                          value={values.name}
                          size="small"
                        />
                        <FormHelperText error>{errors.name}</FormHelperText>
                      </Grid>

                      {smUp && (
                        <Grid xs={2} md={2}>
                          <Button onClick={() => setExpand(false)}>Collapse</Button>
                        </Grid>
                      )}

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
                              {values.address && values.address?.length > 0 ? (
                                values.address.map((item, index) => (
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
                              {values.address?.length > 0 && (
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
                              {values.email && values.email?.length > 0 ? (
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
                              {values.email?.length > 0 && (
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
                              {values.phNo && values.phNo?.length > 0 ? (
                                values.phNo.map((item, index) => (
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
                                    <Grid xs={12} md={6}>
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
                                    <Grid xs={10} md={2}>
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
                              {values.phNo?.length > 0 && (
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
                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={isSubmitting || !isValid}
                  >
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
      )}
    </Fragment>
  );
};
