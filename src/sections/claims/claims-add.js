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
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FieldArray, Formik } from "formik";
import React, { useState, useCallback, useEffect, Fragment } from "react";
import { TrashIcon, PlusCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";

const policyCoverageCategories = [
  {
    value: "Work",
    label: "Work",
  },
  {
    value: "Personal",
    label: "Personal",
  },
];

export const ClaimsAdd = ({ open, handleClose, item }) => {
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

  const subheaderStyles = {
    marginTop: "20px",
    borderTop: "1px solid #ccc",
    padding: "10px",
  };

  const emptyValues = {
    fileNo: "",
    insured: [],
    lossLocation: "",
    lossType: "",
    lossDate: new Date(),
    insurance: {
      company: "",
      fileNo: "",
      policyNo: "",
      claimNo: "",
      issueDate: new Date(),
      expiryDate: new Date(),
    },
    policyCoverage: [],
    contacts: [],
    docs: ["", "", ""],
    tasks: ["", "", ""],
    forms: ["", "", ""],
  };

  const [initialValues, setInitialValues] = useState(emptyValues);

  useEffect(() => {
    setInitialValues(item?.id ? item : emptyValues);
  }, [item]);

  const policyCoverageObject = { category: "Work", amount: "" };
  const contactsObject = { category: "Work", contact: "" };
  const insuredObject = { name: "", id: "" };

  const handleSubmit = useCallback((values) => {
    alert(JSON.stringify(values, null, 2));
  }, []);

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
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));

              setSubmitting(false);
            }, 400);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue,
          }) => (
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
                      <Grid
                        xs={2}
                        md={2}
                        sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}
                      >
                        <Typography variant="overline">File No:</Typography>
                      </Grid>
                      <Grid xs={10} md={10}>
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
                                    <Grid
                                      xs={2}
                                      md={2}
                                      sx={{
                                        display: "flex",
                                        justifyContent: "flex-end",
                                        alignItems: "center",
                                      }}
                                    >
                                      <Typography variant="overline">Insured:</Typography>
                                    </Grid>
                                    <Grid xs={2} md={8}>
                                      <TextField
                                        fullWidth
                                        size="small"
                                        label="Insured"
                                        name={`insured.${index}.name`}
                                        onChange={handleChange}
                                        value={values.insured[index].name}
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
                                  <Grid xs={2} md={1}>
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

                      <Grid
                        xs={2}
                        md={2}
                        sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}
                      >
                        <Typography variant="overline">Loss Location:</Typography>
                      </Grid>
                      <Grid xs={10} md={10}>
                        <TextField
                          fullWidth
                          label="Address,City,State,Zip,Country"
                          name="lossLocation"
                          onChange={handleChange}
                          required
                          value={values.lossLocation}
                        />
                      </Grid>
                      <Grid
                        xs={2}
                        md={2}
                        sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}
                      >
                        <Typography variant="overline">Type of Loss:</Typography>
                      </Grid>
                      <Grid xs={10} md={4}>
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
                        xs={2}
                        md={2}
                        sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}
                      >
                        <Typography variant="overline">Date of Loss:</Typography>
                      </Grid>
                      <Grid xs={10} md={4}>
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

                      <Grid xs={10} md={12} sx={subheaderStyles}>
                        <Typography variant="formSubHeading">Insurance</Typography>
                      </Grid>
                      <Grid
                        xs={2}
                        md={2}
                        sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}
                      >
                        <Typography variant="overline">Company:</Typography>
                      </Grid>
                      <Grid xs={10} md={4}>
                        <TextField
                          fullWidth
                          label="Company"
                          name="insurance.company"
                          onChange={handleChange}
                          required
                          value={values.insurance.company}
                        />
                      </Grid>
                      <Grid
                        xs={2}
                        md={2}
                        sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}
                      >
                        <Typography variant="overline">File #:</Typography>
                      </Grid>
                      <Grid xs={10} md={4}>
                        <TextField
                          fullWidth
                          label="File No."
                          name="insurance.fileNo"
                          onChange={handleChange}
                          required
                          value={values.insurance.fileNo}
                        />
                      </Grid>
                      <Grid
                        xs={2}
                        md={2}
                        sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}
                      >
                        <Typography variant="overline">Policy #:</Typography>
                      </Grid>
                      <Grid xs={10} md={4}>
                        <TextField
                          fullWidth
                          label="Policy No."
                          name="insurance.policyNo"
                          onChange={handleChange}
                          required
                          value={values.insurance.policyNo}
                        />
                      </Grid>
                      <Grid
                        xs={2}
                        md={2}
                        sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}
                      >
                        <Typography variant="overline">Claim #:</Typography>
                      </Grid>
                      <Grid xs={10} md={4}>
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
                        xs={2}
                        md={2}
                        sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}
                      >
                        <Typography variant="overline">Date Issued:</Typography>
                      </Grid>
                      <Grid xs={10} md={4}>
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
                        xs={2}
                        md={2}
                        sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}
                      >
                        <Typography variant="overline">Expiry Date:</Typography>
                      </Grid>
                      <Grid xs={10} md={4}>
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

                      <Grid xs={10} md={12} sx={subheaderStyles}>
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
                                    <Grid xs={12} md={4}>
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
                                    <Grid xs={2} md={6}>
                                      <TextField
                                        fullWidth
                                        size="small"
                                        label="$"
                                        name={`policyCoverage.${index}.amount`}
                                        onChange={handleChange}
                                        value={values.policyCoverage[index].amount}
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
                                  <Grid xs={2} md={1}>
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

                      <Grid xs={10} md={12} sx={subheaderStyles}>
                        <Typography variant="formSubHeading">Contacts</Typography>
                      </Grid>

                      <Grid xs={12} md={12}>
                        <FieldArray
                          name="contacts"
                          render={(arrayHelpers) => (
                            <Grid container spacing={1}>
                              {values.contacts && values.contacts.length > 0 ? (
                                values.contacts.map((item, index) => (
                                  <>
                                    <Grid xs={12} md={4}>
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
                                        {policyCoverageCategories.map((option) => (
                                          <option key={option.value} value={option.value}>
                                            {option.label}
                                          </option>
                                        ))}
                                      </TextField>
                                    </Grid>
                                    <Grid xs={2} md={6}>
                                      <TextField
                                        fullWidth
                                        size="small"
                                        label="Name"
                                        name={`contacts.${index}.contact`}
                                        onChange={handleChange}
                                        value={values.contacts[index].contact}
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
                                  <Grid xs={2} md={1}>
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
