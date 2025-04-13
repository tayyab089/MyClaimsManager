import React, { Fragment, useMemo } from "react";
import {
  Button,
  TextField,
  useMediaQuery,
  Stack,
  Autocomplete,
} from "@mui/material";


export const ContactsAddFormContact = ({
  setFieldValue,
  ix,
  values,
  contactList,
  contactCategoryList,
  contactsData,
}) => {
  // State Variables =================================================
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
          name={`contacts.${ix}.name`}
          onChange={(e, v) => {
            if (v) {
              if (v?.id !== "") {
                const category = contactsData.find((x) => x.id === v?.id).category;
                setFieldValue(`contacts.${ix}.name`, v?.label);
                setFieldValue(`contacts.${ix}.id`, v?.id);
                setFieldValue(`contacts.${ix}.category`, category);
              }
            } else {
              setFieldValue(`contacts.${ix}`, { name: "", id: "" });
            }
          }}
          onInputChange={(e, v) => {
            setFieldValue(`contacts.${ix}.name`, v);
            setFieldValue(`contacts.${ix}.id`, "");
          }}
          value={{
            label: values.contacts[ix].name || "",
            id: values.contacts[ix].id || "",
          }}
          inputValue={values?.contacts[ix]?.name || ""}
          options={contactList ? contactList : []}
          getOptionLabel={(option) => option.label || ""}
          renderInput={(params) => <TextField {...params} label="Name" size="small" />}
        />
      </Stack>

    </Fragment>
  );
};
