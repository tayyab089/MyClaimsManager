import { Grid, Box, Typography, Button, useMediaQuery, Stack } from "@mui/material";
import { ClaimsAdd } from "./claims-add";
import { ContactsAdd } from "../contacts/contacs-add";
import { useEffect, useState, useRef, Fragment, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAlertData } from "src/store/reducers/alert/thunks";
import useConfirm from "src/hooks/use-confirm";
import { deleteClaimApi } from "src/network/claims-api";
import { useRouter } from "next/router";
import { useReactToPrint } from "react-to-print";
import format from "date-fns/format";
import { ClaimPrintView } from "./claim-print-view";

const useInsured = (contacts, claim) => {
  return useMemo(() => {
    const insuredContacts = new Set();
    claim?.insured?.forEach((item) => {
      var filteredContacts = contacts?.filter((contact) => contact.id == item?.id);
      filteredContacts?.length > 0 && insuredContacts.add(...filteredContacts);
    });
    return Array.from(insuredContacts);
  }, [contacts, claim]);
};

const useOther = (contacts, claim) => {
  return useMemo(() => {
    const otherContacts = new Map();

    claim?.contacts?.forEach((item) => {
      const match = contacts?.find((contact) => contact.id === item?.id);
      if (match) {
        // Copy the matched contact and override the category from claim
        otherContacts.set(match.id, {
          ...match,
          category: item.category
        });
      }
    });

    return Array.from(otherContacts.values());
  }, [contacts, claim]);
};


export const ClaimView = ({ item }) => {
  const formatDate = (date) => {
    return date ? format(new Date(date), "MM-dd-yyyy") : "";
  };
  const dispatch = useDispatch();
  const { contactsData } = useSelector((state) => state.contacts);
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState();

  const [openContactsModal, setOpenContactsModal] = useState(false);
  const [contactsModalData, setContactsModalData] = useState();
  const [isEdit, setIsEdit] = useState(false);

  const insuredContacts = useInsured(contactsData, item);
  const otherContacts = useOther(contactsData, item);

  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const componentRef = useRef();

  const router = useRouter();

  // Style Objects =============================
  const style = {
    boxShadow: 24,
    p: 1,
    overflow: "auto",
    height: "90%",
    padding: "20px",
  };
  const subheaderStyles = {
    marginTop: "20px",
    borderTop: "1px solid #ccc",
    padding: "10px",
  };

  // Claim Modal ================================
  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setModalData([]);
      setOpenModal(false);
    }
  };

  useEffect(() => {
    if (modalData?.fileNo) {
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

  // Delete Function =====================================================
  const [Dialog, confirmDelete] = useConfirm();

  const handleDelete = async (claim) => {
    const customTitle = "Confirm Delete";
    const customMessage = `Are you sure you want to delete claim: <strong> ${claim.fileNo} </strong> along with all its data? Please note that this process is not reversible.`;

    const ans = await confirmDelete(customTitle, customMessage);
    if (ans) {
      await deleteClaimApi({ claim: claim });
      router.push("/");
    } else {
    }
  };

  const handleContactsModalClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setIsEdit(false);
      setContactsModalData(null);
      setOpenContactsModal(false);
    }
  };

  // Print Function ==============================
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // Useffect Calls ==============================

  useEffect(() => {
    if (isEdit) {
      setOpenContactsModal(true);
    }
  }, [isEdit]);

  const insuranceDetails = [
    { label: "Insurance Company", value: item?.insurance?.company },
    { label: "File #", value: item?.insurance?.fileNo },
    { label: "Claim #", value: item?.insurance?.claimNo },
    { label: "Policy #", value: item?.insurance?.policyNo },
    { label: "Issued", value: formatDate(item?.insurance?.issueDate) },
    { label: "Expiration", value: formatDate(item?.insurance?.expiryDate) },
  ];

  return (
    <Box sx={style} ref={componentRef}>
      <ClaimPrintView
        claim={item}
        insuredContacts={insuredContacts}
        otherContacts={otherContacts}
      />
      <Grid
        container
        spacing={1}
        sx={{
          "@media print": {
            display: "none",
          },
        }}
      >
        {/* Insured Section */}
        <Grid xs={6} sm={7.5} md={9}>
          <Typography variant="formTag">Insured</Typography>
        </Grid>
        <Grid xs={2} sm={1.5} md={1}>
          <Button
            variant={!lgUp ? "text" : "contained"}
            size="small"
            color="secondary"
            onClick={handlePrint}
            sx={{
              "@media print": {
                display: "none",
              },
            }}
          >
            Print
          </Button>
        </Grid>
        <Grid xs={2} sm={1.5} md={1}>
          <Button
            variant={!lgUp ? "text" : "contained"}
            size="small"
            onClick={() => setModalData(item)}
            sx={{
              "@media print": {
                display: "none",
              },
            }}
          >
            Edit
          </Button>
        </Grid>
        <Grid xs={2} sm={1.5} md={1}>
          <Button
            variant={!lgUp ? "text" : "contained"}
            size="small"
            color="error"
            onClick={() => handleDelete(item)}
            sx={{
              "@media print": {
                display: "none",
              },
            }}
          >
            Delete
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
          <Typography variant="formText">Loss Location: </Typography>
        </Grid>
        <Grid xs={10} md={8}>
          <Typography variant="formText">{item?.lossLocation}</Typography>
        </Grid>
        <Grid xs={10} md={4}>
          <Typography variant="formText">Type of Loss: </Typography>
        </Grid>
        <Grid xs={10} md={8}>
          <Typography variant="formText">{item?.lossType}</Typography>
        </Grid>
        <Grid xs={10} md={4}>
          <Typography variant="formText">Date of Loss: </Typography>
        </Grid>
        <Grid xs={10} md={8}>
          <Typography variant="formText">{formatDate(item?.lossDate)}</Typography>
        </Grid>

        {/* Insurance Company Data */}
        <Grid xs={10} md={12} sx={subheaderStyles}></Grid>
        <Grid xs={10} md={12}>
          <Typography variant="formTag">Insurance</Typography>
        </Grid>

        <Grid xs={10} md={4}>
          <Typography variant="formText">Company: </Typography>
        </Grid>
        <Grid xs={10} md={8}>
          <Typography variant="formText">{item?.insurance?.company}</Typography>
        </Grid>

        <Grid xs={10} md={4}>
          <Typography variant="formText">Policy #: </Typography>
        </Grid>
        <Grid xs={10} md={8}>
          <Typography variant="formText">{item?.insurance?.policyNo}</Typography>
        </Grid>

        <Grid xs={10} md={4}>
          <Typography variant="formText">Claim #: </Typography>
        </Grid>
        <Grid xs={10} md={8}>
          <Typography variant="formText">{item?.insurance?.claimNo}</Typography>
        </Grid>

        <Grid xs={10} md={4}>
          <Typography variant="formText">Issued: </Typography>
        </Grid>
        <Grid xs={10} md={8}>
          <Typography variant="formText">{formatDate(item?.insurance?.issueDate)}</Typography>
        </Grid>

        <Grid xs={10} md={4}>
          <Typography variant="formText">Flie #: </Typography>
        </Grid>
        <Grid xs={10} md={8}>
          <Typography variant="formText">{item?.insurance?.fileNo}</Typography>
        </Grid>

        <Grid xs={10} md={4}>
          <Typography variant="formText">Expiration: </Typography>
        </Grid>
        <Grid xs={10} md={8}>
          <Typography variant="formText">{formatDate(item?.insurance?.expiryDate)}</Typography>
        </Grid>

        {/* Policy Coverages */}
        <Grid xs={10} md={12} sx={subheaderStyles}></Grid>
        <Grid xs={10} md={12}>
          <Typography variant="formTag">Policy Coverages </Typography>
        </Grid>
        {item?.policyCoverage?.map((coverage, index) => (
          <Fragment key={index}>
            <Grid xs={10} md={4}>
              <Typography variant="formText">{coverage?.category}: </Typography>
            </Grid>
            <Grid xs={10} md={8}>
              <Typography variant="formText">${coverage?.amount}</Typography>
            </Grid>
          </Fragment>
        ))}

        {/* Contacts */}
        <Grid xs={10} md={12} sx={subheaderStyles}></Grid>
        <Grid xs={10} md={12}>
          <Typography variant="formTag">Contacts </Typography>
        </Grid>
        {item?.contacts?.map((contact, index) => {
          return (
          <Fragment key={index}>
            <Grid xs={10} md={4}>
              <Typography variant="formText">{contact?.category}: </Typography>
            </Grid>
            <Grid xs={10} md={8}>
              <Typography variant="link" onClick={() => handleContactClick(contact.id)}>
                {contact?.name}
              </Typography>
            </Grid>
          </Fragment>
        )}
        
        )}
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
      <Dialog />
    </Box>
  );
};
