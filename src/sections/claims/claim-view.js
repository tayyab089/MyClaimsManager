import { Grid, Box, Typography, Stack, Button, Link } from "@mui/material";
import { ClaimsAdd } from "./claims-add";
import { useEffect, useState } from "react";

export const ClaimView = ({ item }) => {
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState();

  // Styles======================
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
  //   ===========================

  const handleClose = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    if (modalData?.id) {
      setOpenModal(true);
    }
  }, [modalData]);

  return (
    <Box sx={style}>
      <Grid container spacing={1}>
        {/* Insured Section */}
        <Grid xs={10} md={11}>
          <Typography variant="formTag">Insured</Typography>
        </Grid>
        <Grid xs={10} md={1}>
          <Button variant="contained" size="small" onClick={() => setModalData(item)}>
            Edit
          </Button>
        </Grid>
        {item?.insured?.map((contact, index) => (
          <Grid xs={10} md={4} key={index}>
            <Link href="#" color="inherit">
              <Typography variant="formText">{contact.name} </Typography>
            </Link>
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
        <Grid xs={10} md={4}>
          <Typography variant="formTag">Policy Coverages: </Typography>
        </Grid>
        <Grid xs={10} md={8}></Grid>

        {/* Contacts */}
        <Grid xs={10} md={12} sx={subheaderStyles}></Grid>
        <Grid xs={10} md={4}>
          <Typography variant="formTag">Contacts: </Typography>
        </Grid>
        <Grid xs={10} md={8}></Grid>
      </Grid>
      <ClaimsAdd open={openModal} handleClose={handleClose} item={modalData} />
    </Box>
  );
};
