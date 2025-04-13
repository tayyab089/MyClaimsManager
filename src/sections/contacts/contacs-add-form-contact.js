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
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const smUp = useMediaQuery((theme) => theme.breakpoints.up("sm"));


  return (
    <Fragment>

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
          value={{
            label: values.insured[ix].name,
            id: values.insured[ix].id,
          }}
          inputValue={values?.contacts[ix]?.contact?.name}
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

    </Fragment>
  );
};
