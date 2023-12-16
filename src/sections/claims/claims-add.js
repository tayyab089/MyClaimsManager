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
  Autocomplete,
  useMediaQuery,
  Unstable_Grid2 as Grid,
  CircularProgress,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FieldArray, Formik } from "formik";
import React, { useState, useCallback, useEffect, Fragment } from "react";
import { TrashIcon, PlusCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { saveClaimApi, updateClaimApi } from "src/network/claims-api";
import { fetchClaims } from "src/store/reducers/claims/thunks";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setAlertData } from "src/store/reducers/alert/thunks";

import {
  emptyValues,
  policyCoverageCategories,
  policyCoverageObject,
  contactsObject,
  insuredObject,
  contactCategories,
} from "./claims-static-data";

export const ClaimsAdd = ({ open, handleClose, item, editContact }) => {
  // State Variables ==============================================
  const {
    contactsData,
    meta: { isLoading },
  } = useSelector((state) => state.contacts);
  const dispatch = useDispatch();

  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const smDown = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const smUp = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const [initialValues, setInitialValues] = useState(emptyValues);
  const [contactList, setContactList] = useState([]);
  const [expand, setExpand] = useState(false);

  // Style Objects =================================================
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: lgUp ? 800 : smUp ? "95%" : 400,
    boxShadow: 24,
    p: 1,
    overflow: "auto",
    maxHeight: "90%",
  };

  const subheaderStyles = {
    marginTop: "20px",
    borderTop: "1px solid #ccc",
    padding: "10px",
  };

  // Submit Functions ==============================================

  const handleSubmit = useCallback(
    async (values, setSubmitting) => {
      console.log(values);
      if (item?.fileNo) {
        const response = await updateClaimApi({ claim: values });
        if (response && response.data.type !== "error") {
          dispatch(
            setAlertData({ open: true, message: response.data.message, type: response.data.type })
          );
          handleClose();
          dispatch(fetchClaims());
        } else {
          alert(response.data.message);
        }
      } else {
        const response = await saveClaimApi({ claim: values });
        console.log(response);
        if (response && response.data.type !== "error") {
          dispatch(
            setAlertData({ open: true, message: response.data.message, type: response.data.type })
          );
          handleClose();
          dispatch(fetchClaims());
        } else {
          dispatch(
            setAlertData({ open: true, message: response.data.message, type: response.data.type })
          );
        }
      }
      setSubmitting(false);
    },
    [item?.fileNo]
  );
  // UseEffect Calls ===============================================
  useEffect(() => {
    setContactList(
      contactsData?.map((item) => {
        return {
          label: item.name,
          id: item.id,
        };
      })
    );
  }, []);

  useEffect(() => {
    setInitialValues(item?.fileNo ? item : emptyValues);
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
        >
          {({ values, errors, handleChange, handleSubmit, isSubmitting, setFieldValue }) => (
            <form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Card sx={{ padding: "10px" }}>
                <CardHeader
                  subheader={`${values?.fileNo}/${values?.insurance?.fileNo}`}
                  title="Claim"
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
                      {smUp && (
                        <Grid
                          xs={2}
                          sm={2}
                          md={2}
                          sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}
                        >
                          <Typography variant="overline">File No:</Typography>
                        </Grid>
                      )}
                      <Grid xs={12} sm={10} md={10}>
                        <TextField
                          fullWidth
                          label="File No"
                          name="fileNo"
                          onChange={handleChange}
                          required
                          value={values.fileNo}
                        />
                      </Grid>

                      {/* Insured Part */}
                      <Grid xs={12} md={12}>
                        <FieldArray
                          name="insured"
                          render={(arrayHelpers) => (
                            <Grid container spacing={1}>
                              {values.insured && values.insured.length > 0 ? (
                                values.insured.map((item, index) => (
                                  <>
                                    {smUp && (
                                      <Grid
                                        xs={2}
                                        sm={2}
                                        md={2}
                                        sx={{
                                          display: "flex",
                                          justifyContent: "flex-end",
                                          alignItems: "center",
                                        }}
                                      >
                                        <Typography variant="overline">Insured:</Typography>
                                      </Grid>
                                    )}
                                    <Grid xs={6} sm={6} md={6}>
                                      <Autocomplete
                                        disablePortal
                                        id="Insured"
                                        name={`insured.${index}.name`}
                                        onChange={(e, v) => {
                                          setFieldValue(`insured.${index}.name`, v?.label);
                                          setFieldValue(`insured.${index}.id`, v?.id);
                                        }}
                                        value={{
                                          label: values.insured[index].name,
                                          id: values.insured[index].id,
                                        }}
                                        options={contactList}
                                        getOptionLabel={(option) => option.label || ""}
                                        renderInput={(params) => (
                                          <TextField {...params} label="Insured" size="small" />
                                        )}
                                      />
                                    </Grid>
                                    <Grid xs={2} sm={2} md={2}>
                                      <Button onClick={() => editContact(values.insured[index].id)}>
                                        Edit
                                      </Button>
                                    </Grid>
                                    <Grid xs={2} sm={1} md={1}>
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
                                <>
                                  <Grid xs={12} md={2}></Grid>
                                  <Grid xs={12} md={10}>
                                    <Button
                                      type="button"
                                      onClick={() => arrayHelpers.push(insuredObject)}
                                    >
                                      Add Insured
                                    </Button>
                                  </Grid>
                                </>
                              )}
                              {values.insured.length > 0 && (
                                <Fragment>
                                  {/* <Grid xs={10} md={11}></Grid> */}
                                  <Grid xs={2} sm={1} md={1}>
                                    <Button
                                      type="button"
                                      onClick={() => arrayHelpers.push(insuredObject)}
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
                      {smUp && (
                        <Grid
                          xs={2}
                          sm={2}
                          md={2}
                          sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}
                        >
                          <Typography variant="overline">Loss Location:</Typography>
                        </Grid>
                      )}

                      <Grid xs={12} sm={10} md={10}>
                        <TextField
                          fullWidth
                          label="Address,City,State,Zip,Country"
                          name="lossLocation"
                          onChange={handleChange}
                          required
                          value={values.lossLocation}
                        />
                      </Grid>
                      {smUp && (
                        <Grid
                          xs={2}
                          sm={2}
                          md={2}
                          sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}
                        >
                          <Typography variant="overline">Type of Loss:</Typography>
                        </Grid>
                      )}
                      <Grid xs={12} sm={4} md={4}>
                        <TextField
                          fullWidth
                          label="Type of Loss"
                          name="lossType"
                          onChange={handleChange}
                          required
                          value={values.lossType}
                        />
                      </Grid>
                      <Grid
                        xs={4}
                        sm={2}
                        md={2}
                        sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}
                      >
                        <Typography variant="overline">Date of Loss:</Typography>
                      </Grid>

                      <Grid xs={8} sm={4} md={4}>
                        <DatePicker
                          renderInput={(props) => (
                            <TextField fullWidth variant="outlined" {...props} />
                          )}
                          name="lossDate"
                          value={values.lossDate}
                          onChange={(d) => setFieldValue("lossDate", d)}
                        />
                      </Grid>

                      {/* Insurance part */}

                      <Grid xs={12} sm={12} md={12} sx={subheaderStyles}>
                        <Typography variant="formSubHeading">Insurance</Typography>
                      </Grid>
                      {smUp && (
                        <Grid
                          xs={2}
                          sm={2}
                          md={2}
                          sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}
                        >
                          <Typography variant="overline">Company:</Typography>
                        </Grid>
                      )}
                      <Grid xs={12} sm={4} md={4}>
                        <TextField
                          fullWidth
                          label="Company"
                          name="insurance.company"
                          onChange={handleChange}
                          required
                          value={values.insurance.company}
                        />
                      </Grid>
                      {smUp && (
                        <Grid
                          xs={2}
                          sm={2}
                          md={2}
                          sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}
                        >
                          <Typography variant="overline">File #:</Typography>
                        </Grid>
                      )}
                      <Grid xs={12} sm={4} md={4}>
                        <TextField
                          fullWidth
                          label="File No."
                          name="insurance.fileNo"
                          onChange={handleChange}
                          required
                          value={values.insurance.fileNo}
                        />
                      </Grid>
                      {smUp && (
                        <Grid
                          xs={2}
                          sm={2}
                          md={2}
                          sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}
                        >
                          <Typography variant="overline">Policy #:</Typography>
                        </Grid>
                      )}
                      <Grid xs={12} sm={4} md={4}>
                        <TextField
                          fullWidth
                          label="Policy No."
                          name="insurance.policyNo"
                          onChange={handleChange}
                          required
                          value={values.insurance.policyNo}
                        />
                      </Grid>
                      {smUp && (
                        <Grid
                          xs={2}
                          sm={2}
                          md={2}
                          sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}
                        >
                          <Typography variant="overline">Claim #:</Typography>
                        </Grid>
                      )}

                      <Grid xs={12} sm={4} md={4}>
                        <TextField
                          fullWidth
                          label="Claim No."
                          name="insurance.claimNo"
                          onChange={handleChange}
                          required
                          value={values.insurance.claimNo}
                        />
                      </Grid>

                      <Grid
                        xs={4}
                        sm={2}
                        md={2}
                        sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}
                      >
                        <Typography variant="overline">Date Issued:</Typography>
                      </Grid>
                      <Grid xs={8} sm={4} md={4}>
                        <DatePicker
                          renderInput={(props) => (
                            <TextField fullWidth variant="outlined" {...props} />
                          )}
                          name="insurance.issueDate"
                          value={values.insurance.issueDate}
                          onChange={(d) => setFieldValue("insurance.issueDate", d)}
                        />
                      </Grid>
                      <Grid
                        xs={4}
                        sm={2}
                        md={2}
                        sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}
                      >
                        <Typography variant="overline">Expiry Date:</Typography>
                      </Grid>
                      <Grid xs={8} sm={4} md={4}>
                        <DatePicker
                          renderInput={(props) => (
                            <TextField fullWidth variant="outlined" {...props} />
                          )}
                          name="insurance.expiryDate"
                          value={values.insurance.expiryDate}
                          onChange={(d) => setFieldValue("insurance.expiryDate", d)}
                        />
                      </Grid>

                      {/* Policy Coverages part */}

                      <Grid xs={12} md={12} sx={subheaderStyles}>
                        <Typography variant="formSubHeading">Policy Coverages (Editor)</Typography>
                      </Grid>

                      <Grid xs={12} md={12}>
                        <FieldArray
                          name="policyCoverage"
                          render={(arrayHelpers) => (
                            <Grid container spacing={1}>
                              {values.policyCoverage && values.policyCoverage.length > 0 ? (
                                values.policyCoverage.map((item, index) => (
                                  <>
                                    <Grid xs={12} sm={4} md={4}>
                                      <TextField
                                        fullWidth
                                        size="small"
                                        label="Category"
                                        name={`policyCoverage.${index}.category`}
                                        onChange={handleChange}
                                        select
                                        SelectProps={{ native: true }}
                                        value={values.policyCoverage[index].category}
                                      >
                                        {policyCoverageCategories.map((option) => (
                                          <option key={option.value} value={option.value}>
                                            {option.label}
                                          </option>
                                        ))}
                                      </TextField>
                                    </Grid>
                                    <Grid xs={8} sm={6} md={6}>
                                      <TextField
                                        fullWidth
                                        size="small"
                                        label="$"
                                        name={`policyCoverage.${index}.amount`}
                                        onChange={handleChange}
                                        value={values.policyCoverage[index].amount}
                                      />
                                    </Grid>
                                    <Grid xs={2} sm={1} md={1}>
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
                                <Grid xs={12} sm={12} md={12}>
                                  <Button
                                    type="button"
                                    onClick={() => arrayHelpers.push(policyCoverageObject)}
                                  >
                                    Add
                                  </Button>
                                </Grid>
                              )}
                              {values.policyCoverage.length > 0 && (
                                <Fragment>
                                  {/* <Grid xs={10} md={11}></Grid> */}
                                  <Grid xs={2} sm={1} md={1}>
                                    <Button
                                      type="button"
                                      onClick={() => arrayHelpers.push(policyCoverageObject)}
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

                      {/* Contacts part */}

                      <Grid xs={12} sm={12} md={12} sx={subheaderStyles}>
                        <Typography variant="formSubHeading">Contacts</Typography>
                      </Grid>

                      <Grid xs={12} sm={12} md={12}>
                        <FieldArray
                          name="contacts"
                          render={(arrayHelpers) => (
                            <Grid container spacing={1}>
                              {values.contacts && values.contacts.length > 0 ? (
                                values.contacts.map((item, index) => (
                                  <>
                                    <Grid xs={12} sm={3} md={4}>
                                      <TextField
                                        fullWidth
                                        size="small"
                                        label="Category"
                                        name={`contacts.${index}.category`}
                                        onChange={handleChange}
                                        select
                                        SelectProps={{ native: true }}
                                        value={values.contacts[index].category}
                                      >
                                        {contactCategories.map((option) => (
                                          <option key={option.value} value={option.value}>
                                            {option.label}
                                          </option>
                                        ))}
                                      </TextField>
                                    </Grid>
                                    <Grid xs={6} sm={5} md={4}>
                                      <Autocomplete
                                        disablePortal
                                        id="Contact"
                                        name={`contacts.${index}.contact`}
                                        onChange={(e, v) => {
                                          setFieldValue(`contacts.${index}.contact.name`, v?.label);
                                          setFieldValue(`contacts.${index}.contact.id`, v?.id);
                                        }}
                                        value={{
                                          label: values.contacts[index].contact.name,
                                          id: values.contacts[index].contact.id,
                                        }}
                                        options={contactList}
                                        getOptionLabel={(option) => option.label || ""}
                                        renderInput={(params) => (
                                          <TextField {...params} label="Name" size="small" />
                                        )}
                                      />
                                    </Grid>
                                    <Grid xs={2} sm={2} md={2}>
                                      <Button
                                        onClick={() =>
                                          editContact(values.contacts[index].contact.id)
                                        }
                                      >
                                        Edit
                                      </Button>
                                    </Grid>
                                    <Grid xs={2} sm={1} md={1}>
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
                                <Grid xs={12} sm={12} md={12}>
                                  <Button
                                    type="button"
                                    onClick={() => arrayHelpers.push(contactsObject)}
                                  >
                                    Add
                                  </Button>
                                </Grid>
                              )}
                              {values.contacts.length > 0 && (
                                <Fragment>
                                  {/* <Grid xs={10} md={11}></Grid> */}
                                  <Grid xs={2} sm={1} md={1}>
                                    <Button
                                      type="button"
                                      onClick={() => arrayHelpers.push(contactsObject)}
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
                    {isSubmitting ? (
                      <CircularProgress style={{ width: 24, height: 24, color: "white" }} />
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
