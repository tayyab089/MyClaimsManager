/* eslint-disable react/jsx-key */
import { Grid, Box, Typography, Button, useMediaQuery, Stack } from "@mui/material";
import format from "date-fns/format";
import { useEffect } from 'react';

export const ClaimPrintView = ({ claim, insuredContacts, otherContacts }) => {
  const formatDate = (date) => {
    return date ? format(new Date(date), "MM-dd-yyyy") : "";
  };

  useEffect(()=>{
    console.log(otherContacts)
  }, [otherContacts])

  const content = [
    <div>
      <Typography variant="h4">{`Claim ${claim?.fileNo}`}</Typography>
      <hr />
      <Typography variant="h5">Insured</Typography>
      <hr />
      <Stack direction="row" justifyContent="flex-start" alignItems="flex-start" flexWrap="wrap">
        {insuredContacts?.map((item, index) => {
          return (
            <Stack
              key={index}
              direction="column"
              justifyContent="space-between"
              alignItems="flex-start"
              spacing={2}
              sx={{ marginTop: 4, width: "50%" }}
            >
              <Typography variant="claimPrintText">{item?.category}</Typography>
              <Typography variant="claimPrintHeading">{item?.name}</Typography>
              <Stack>
                <Typography variant="claimPrintText">{item?.businessName}</Typography>
                {item?.address?.map((it, ix) => {
                  return (
                    <Stack key={ix}>
                      <Typography variant="claimPrintType">
                        {it?.type ? it?.type : "address"}:
                      </Typography>
                      <Typography variant="claimPrintText">{it?.street}</Typography>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="claimPrintText">{it?.city}</Typography>
                        <Typography variant="claimPrintText">{it?.state}</Typography>
                        <Typography variant="claimPrintText">{it?.zip}</Typography>
                      </Stack>
                    </Stack>
                  );
                })}
                {item?.email?.map((it, ix) => {
                  return (
                    <Stack
                      key={ix}
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="flex-start"
                    >
                      <Typography variant="claimPrintType">
                        {it?.type ? it?.type : "email"}:
                      </Typography>
                      <Typography variant="claimPrintText">{it?.email}</Typography>
                    </Stack>
                  );
                })}
                {item?.phNo?.map((it, ix) => {
                  return (
                    <Stack
                      key={ix}
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="flex-start"
                    >
                      <Typography variant="claimPrintType">
                        {it?.type ? it?.type : "phone"}:
                      </Typography>
                      <Typography variant="claimPrintText">{it?.no}</Typography>
                      {it?.ext && <Typography variant="claimPrintText">x{it?.ext}</Typography>}
                    </Stack>
                  );
                })}
              </Stack>
            </Stack>
          );
        })}
      </Stack>
    </div>,
    <div>
      <Grid container sx={{ marginTop: 5, padding: 0 }}>
        <Grid xs={3} sm={3} md={3}>
          <Typography variant="claimPrintTextBold">Loss Location:</Typography>
        </Grid>
        <Grid xs={9} sm={9} md={9}>
          <Typography variant="claimPrintText">{claim?.lossLocation}</Typography>
        </Grid>
        <Grid xs={3} sm={3} md={3}>
          <Typography variant="claimPrintTextBold">Type of Loss:</Typography>
        </Grid>
        <Grid xs={9} sm={9} md={9}>
          <Typography variant="claimPrintText">{claim?.lossType}</Typography>
        </Grid>
        <Grid xs={3} sm={3} md={3}>
          <Typography variant="claimPrintTextBold">Date of Loss:</Typography>
        </Grid>
        <Grid xs={9} sm={9} md={9}>
          <Typography variant="claimPrintText">{formatDate(claim?.lossDate)}</Typography>
        </Grid>
      </Grid>

      <Typography variant="h5" sx={{ marginTop: 5 }}>
        Insurance
      </Typography>
      <hr />
      <Grid container sx={{ padding: 0 }}>
        <Grid xs={3} sm={3} md={3}>
          <Typography variant="claimPrintTextBold">Company:</Typography>
        </Grid>
        <Grid xs={9} sm={9} md={9}>
          <Typography variant="claimPrintText">{claim?.insurance?.company}</Typography>
        </Grid>
        <Grid xs={3} sm={3} md={3}>
          <Typography variant="claimPrintTextBold">Policy Number:</Typography>
        </Grid>
        <Grid xs={9} sm={9} md={9}>
          <Typography variant="claimPrintText">{claim?.insurance?.policyNo}</Typography>
        </Grid>
        <Grid xs={3} sm={3} md={3}>
          <Typography variant="claimPrintTextBold">Claim No:</Typography>
        </Grid>
        <Grid xs={3} sm={3} md={3}>
          <Typography variant="claimPrintText">{claim?.insurance?.claimNo}</Typography>
        </Grid>
        <Grid xs={3} sm={3} md={3}>
          <Typography variant="claimPrintTextBold">File No:</Typography>
        </Grid>
        <Grid xs={3} sm={3} md={3}>
          <Typography variant="claimPrintText">{claim?.insurance?.fileNo}</Typography>
        </Grid>
        <Grid xs={3} sm={3} md={3}>
          <Typography variant="claimPrintTextBold">Issued:</Typography>
        </Grid>
        <Grid xs={3} sm={3} md={3}>
          <Typography variant="claimPrintText">
            {formatDate(claim?.insurance?.issueDate, true)}
          </Typography>
        </Grid>
        <Grid xs={3} sm={3} md={3}>
          <Typography variant="claimPrintTextBold">Expires:</Typography>
        </Grid>
        <Grid xs={3} sm={3} md={3}>
          <Typography variant="claimPrintText">
            {formatDate(claim?.insurance?.expiryDate, true)}
          </Typography>
        </Grid>
      </Grid>

      <Typography variant="h5" sx={{ marginTop: 5 }}>
        Policy Coverages
      </Typography>
      <hr />

      <Grid container sx={{}}>
        {claim?.policyCoverage?.map((coverage, ix) => {
          return (
            <Grid key={ix} xs={6} sm={6} md={6}>
              <Stack direction="row" justifyContent="flex-start" alignItems="flex-start">
                <Typography variant="claimPrintTextBold">{coverage.category}:</Typography>
                <Typography variant="claimPrintText">${coverage.amount}</Typography>
              </Stack>
            </Grid>
          );
        })}
      </Grid>
    </div>,
    <div>
      <Typography variant="h5" sx={{ marginTop: 5 }}>
        Contacts
      </Typography>
      <hr />
      <Stack direction="row" justifyContent="flex-start" alignItems="flex-start" flexWrap="wrap">
        {otherContacts?.map((item, index) => {
          return (
            <Stack
              key={index}
              direction="column"
              justifyContent="space-between"
              alignItems="flex-start"
              spacing={2}
              sx={{ marginTop: 4, width: "50%" }}
            >
              <Typography variant="claimPrintText">{item?.category}</Typography>
              <Typography variant="claimPrintHeading">{item?.name}</Typography>
              <Stack>
                <Typography variant="claimPrintText">{item?.businessName}</Typography>
                {item?.address?.map((it, ix) => {
                  return (
                    <Stack key={ix}>
                      <Typography variant="claimPrintType">
                        {it?.type ? it?.type : "address"}:
                      </Typography>
                      <Typography variant="claimPrintText">{it?.street}</Typography>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="claimPrintText">{it?.city}</Typography>
                        <Typography variant="claimPrintText">{it?.state}</Typography>
                        <Typography variant="claimPrintText">{it?.zip}</Typography>
                      </Stack>
                    </Stack>
                  );
                })}
                {item?.email?.map((it, ix) => {
                  return (
                    <Stack
                      key={ix}
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="flex-start"
                    >
                      <Typography variant="claimPrintType">
                        {it?.type ? it?.type : "email"}:
                      </Typography>
                      <Typography variant="claimPrintText">{it?.email}</Typography>
                    </Stack>
                  );
                })}
                {item?.phNo?.map((it, ix) => {
                  return (
                    <Stack
                      key={ix}
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="flex-start"
                    >
                      <Typography variant="claimPrintType">
                        {it?.type ? it?.type : "phone"}:
                      </Typography>
                      <Typography variant="claimPrintText">{it?.no}</Typography>
                      {it?.ext && <Typography variant="claimPrintText">x{it?.ext}</Typography>}
                    </Stack>
                  );
                })}
              </Stack>
            </Stack>
          );
        })}
      </Stack>
    </div>,
  ];

  return (
    <Box
      sx={{
        "@media print": {
          display: "block",
          marginBottom: "100px",
        },
        display: "none",
      }}
    >
      {content.map((section, index) => (
        <div key={index} className="print-section">
          {section}
        </div>
      ))}
    </Box>
  );
};
