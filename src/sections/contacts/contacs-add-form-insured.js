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
import { saveContactApi, updateContactApi } from "src/network/contacts-api";
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


export const ContactsAddFormInsured = ({
  item,
  setFieldValue,
  ix,
  values,
  contactList,
  contactsData,
}) => {

  return (
    <Fragment>
      <>
        <Stack direction="row" justifyContent="space-arround" spacing={1}>
          <Autocomplete
            sx={{ width: "80%" }}
            disablePortal
            id="Insured"
            name={`insured.${ix}.name`}
            onChange={(e, v) => {
              if (v) {
                if (v?.id !== "") {
                  setFieldValue(`insured.${ix}.name`, v?.label);
                  setFieldValue(`insured.${ix}.id`, v?.id);
                }
              } else {
                setFieldValue(`insured.${ix}`, insuredObject);
              }
            }}
            onInputChange={(e, v) => {
              setFieldValue(`insured.${ix}.name`, v);
              setFieldValue(`insured.${ix}.id`, "");
            }}
            value={{
              label: values.insured[ix].name || "",
              id: values.insured[ix].id || "",
            }}
            inputValue={values.insured[ix].name || ""}
            options={contactList ? contactList : []}
            getOptionLabel={(option) => option.label || ""}
            renderInput={(params) => <TextField {...params} label="Name" size="small" />}
          />
        </Stack>
      </>

    </Fragment>
  );
};
