import { Grid, Box, Typography, Stack, Button, Link } from "@mui/material";
import { ClaimsAdd } from "./claims-add";
import { ContactsAdd } from "../contacts/contacs-add";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAlertData } from "src/store/reducers/alert/thunks";

export const ClaimView = ({ item }) => {
  const dispatch = useDispatch();
  const { contactsData } = useSelector((state) => state.contacts);
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState();

  const [openContactsModal, setOpenContactsModal] = useState(false);
  const [contactsModalData, setContactsModalData] = useState();
  const [isEdit, setIsEdit] = useState(false);

  // Style Objects =============================
  const style = {
    boxShadow: 24,
    p: 1,
    overflow: "auto",
    maxHeight: "90%",
    padding: "20px",
  };
  const subheaderStyles = {
    marginTop: "20px",
    borderTop: "1px solid #ccc",
    padding: "10px",
  };

  // Claim Modal ================================
  const handleClose = () => {
    setModalData([]);
    setOpenModal(false);
  };

  useEffect(() => {
    if (modalData?.id) {
      setOpenModal(true);
    }
  }, [modalData]);

  // Contact Modal================================
  const handleContactClick = (item) => {
    const foundContact = contactsData.find((x) => x.id === item);
    if (foundContact) {
      setContactsModalData(foundContact);
      setIsEdit(true);
    } else {
      dispatch(
        setAlertData({
          open: true,
          message: "Contact Not Found, Make Sure it exists in the database",
          type: "warning",
        })
      );
    }
  };

  const handleContactsModalClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setIsEdit(false);
      setContactsModalData(null);
      setOpenContactsModal(false);
    }
  };

  // Useffect Calls ==============================

  useEffect(() => {
    if (isEdit) {
      setOpenContactsModal(true);
    }
  }, [isEdit]);

  return (
    <Box sx={style}>
      <Grid container spacing={1}>
        {/* Insured Section */}
        <Grid xs={10} sm={11} md={11}>
          <Typography variant="formTag">Insured</Typography>
        </Grid>
        <Grid xs={2} sm={1} md={1}>
          <Button variant="contained" size="small" onClick={() => setModalData(item)}>
            Edit
          </Button>
        </Grid>
        {item?.insured?.map((contact, index) => (
          <Grid xs={10} md={2} key={index}>
            <Typography variant="link" onClick={() => handleContactClick(contact.id)}>
              {contact.name}{" "}
            </Typography>
          </Grid>
        ))}

        {/* Loss Data */}
        <Grid xs={10} md={12} sx={subheaderStyles}></Grid>
        <Grid xs={10} md={4}>
          <Typography variant="formTag">Loss Location: </Typography>
        </Grid>
        <Grid xs={10} md={8}>
          <Typography variant="formText">{item?.lossLocation}</Typography>
        </Grid>
        <Grid xs={10} md={4}>
          <Typography variant="formTag">Type of Loss: </Typography>
        </Grid>
        <Grid xs={10} md={8}>
          <Typography variant="formText">{item?.lossType}</Typography>
        </Grid>
        <Grid xs={10} md={4}>
          <Typography variant="formTag">Date of Loss: </Typography>
        </Grid>
        <Grid xs={10} md={8}>
          <Typography variant="formText">{item?.lossDate}</Typography>
        </Grid>

        {/* Insurance Company Data */}
        <Grid xs={10} md={12} sx={subheaderStyles}></Grid>
        <Grid xs={10} md={4}>
          <Typography variant="formTag">Insurance Company: </Typography>
        </Grid>
        <Grid xs={10} md={8}>
          <Typography variant="formText">{item?.insurance?.company}</Typography>
        </Grid>
        <Grid xs={10} md={4}>
          <Typography variant="formTag">Flie #: </Typography>
        </Grid>
        <Grid xs={10} md={8}>
          <Typography variant="formText">{item?.insurance?.fileNo}</Typography>
        </Grid>
        <Grid xs={10} md={4}>
          <Typography variant="formTag">Claim #: </Typography>
        </Grid>
        <Grid xs={10} md={8}>
          <Typography variant="formText">{item?.insurance?.claimNo}</Typography>
        </Grid>
        <Grid xs={10} md={4}>
          <Typography variant="formTag">Policy #: </Typography>
        </Grid>
        <Grid xs={10} md={8}>
          <Typography variant="formText">{item?.insurance?.policyNo}</Typography>
        </Grid>
        <Grid xs={10} md={4}>
          <Typography variant="formTag">Issued: </Typography>
        </Grid>
        <Grid xs={10} md={8}>
          <Typography variant="formText">{item?.insurance?.issueDate}</Typography>
        </Grid>
        <Grid xs={10} md={4}>
          <Typography variant="formTag">Expiry: </Typography>
        </Grid>
        <Grid xs={10} md={8}>
          <Typography variant="formText">{item?.insurance?.expiryDate}</Typography>
        </Grid>

        {/* Policy Coverages */}
        <Grid xs={10} md={12} sx={subheaderStyles}></Grid>
        <Grid xs={10} md={12}>
          <Typography variant="formTag">Policy Coverages: </Typography>
        </Grid>
        {item?.policyCoverage?.map((coverage, index) => (
          <>
            <Grid xs={10} md={4}>
              <Typography variant="formText">{coverage?.category}: </Typography>
            </Grid>
            <Grid xs={10} md={8}>
              <Typography variant="formText">${coverage?.amount}</Typography>
            </Grid>
          </>
        ))}

        {/* Contacts */}
        <Grid xs={10} md={12} sx={subheaderStyles}></Grid>
        <Grid xs={10} md={12}>
          <Typography variant="formTag">Contacts: </Typography>
        </Grid>
        {item?.contacts?.map((contact, index) => (
          <>
            <Grid xs={10} md={4}>
              <Typography variant="formText">{contact?.category}: </Typography>
            </Grid>
            <Grid xs={10} md={8}>
              <Typography variant="link" onClick={() => handleContactClick(contact.contact.id)}>
                {contact?.contact?.name}
              </Typography>
            </Grid>
          </>
        ))}
      </Grid>
      <ClaimsAdd
        open={openModal}
        handleClose={handleClose}
        item={modalData}
        editContact={handleContactClick}
      />
      <ContactsAdd
        open={openContactsModal}
        handleClose={handleContactsModalClose}
        item={contactsModalData}
        isEdit={isEdit}
      />
    </Box>
  );
};
