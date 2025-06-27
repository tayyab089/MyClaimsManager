/* eslint-disable react/jsx-key */
import { Grid, Box, Typography, Stack } from "@mui/material";
import format from "date-fns/format";
import { useEffect } from "react";

export const ClaimPrintView = ({ claim, insuredContacts, otherContacts }) => {
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @media print {
        @page {
          margin: 10mm;
          margin-top: 20mm;
        }
        .print-container {
          display: block;
          margin: 0;
          padding: 0;
          width: 100%;
          box-sizing: border-box;
          background-color: white;
        }
      }
      @media screen {
        .print-container {
        display: none;
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const formatDate = (date) => {
    return date ? format(new Date(date), "MM-dd-yyyy") : "";
  };

  const content = [
    <div>
      <Typography
        variant="claimPrintTitle"
        sx={{ marginTop: 0 }}
      >{`Claim ${claim?.fileNo}`}</Typography>
      <hr style={{ marginTop: 0, marginBottom: "0.5rem" }} />
      <Typography variant="claimPrintSectionTitle">Insured</Typography>
      <hr style={{ marginTop: 0, marginBottom: "0.5rem" }} />
      <Stack direction="row" justifyContent="flex-start" alignItems="flex-start" flexWrap="wrap">
        {insuredContacts?.map((item, index) => {
          return (
            <Stack
              key={index}
              direction="column"
              justifyContent="space-between"
              alignItems="flex-start"
              spacing={1}
              sx={{ minWidth: "50%", flex: 1 }}
            >
              <Typography variant="claimPrintSectionTitle">{item?.name}</Typography>
              <Stack>
                <Typography variant="claimPrintText" sx={{ wordBreak: "break-word" }}>
                  {item?.businessName}
                </Typography>
                {item?.address?.map((it, ix) => {
                  return (
                    <Stack key={ix}>
                      <Typography variant="claimPrintItalicLabel" sx={{ wordBreak: "break-word" }}>
                        {it?.type ? it?.type : "address"}:
                      </Typography>
                      <Typography variant="claimPrintText" sx={{ wordBreak: "break-word" }}>
                        {it?.street}
                      </Typography>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ flexWrap: "wrap" }}
                      >
                        <Typography variant="claimPrintText" sx={{ wordBreak: "break-word" }}>
                          {it?.city}
                        </Typography>
                        <Typography variant="claimPrintText" sx={{ wordBreak: "break-word" }}>
                          {it?.state}
                        </Typography>
                        <Typography variant="claimPrintText" sx={{ wordBreak: "break-word" }}>
                          {it?.zip}
                        </Typography>
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
                      sx={{ flexWrap: "wrap" }}
                    >
                      <Typography variant="claimPrintItalicLabel" sx={{ wordBreak: "break-word" }}>
                        {it?.type ? it?.type : "email"}:
                      </Typography>
                      <Typography variant="claimPrintText" sx={{ wordBreak: "break-word" }}>
                        {it?.email}
                      </Typography>
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
                      sx={{ flexWrap: "wrap" }}
                    >
                      <Typography variant="claimPrintItalicLabel" sx={{ wordBreak: "break-word" }}>
                        {it?.type ? it?.type : "phone"}:
                      </Typography>
                      <Typography variant="claimPrintText" sx={{ wordBreak: "break-word" }}>
                        {it?.no}
                      </Typography>
                      {it?.ext && (
                        <Typography variant="claimPrintText" sx={{ wordBreak: "break-word" }}>
                          x{it?.ext}
                        </Typography>
                      )}
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
      <Grid container sx={{ marginTop: 1, marginBottom: 1, padding: 0 }}>
        <Grid xs={3} sm={3} md={3}>
          <Typography variant="claimPrintLabel">Loss Location:</Typography>
        </Grid>
        <Grid xs={9} sm={9} md={9}>
          <Typography variant="claimPrintText">{claim?.lossLocation}</Typography>
        </Grid>
        <Grid xs={3} sm={3} md={3}>
          <Typography variant="claimPrintLabel">Type of Loss:</Typography>
        </Grid>
        <Grid xs={9} sm={9} md={9}>
          <Typography variant="claimPrintText">{claim?.lossType}</Typography>
        </Grid>
        <Grid xs={3} sm={3} md={3}>
          <Typography variant="claimPrintLabel">Date of Loss:</Typography>
        </Grid>
        <Grid xs={9} sm={9} md={9}>
          <Typography variant="claimPrintText">{formatDate(claim?.lossDate)}</Typography>
        </Grid>
      </Grid>

      <Typography variant="claimPrintSectionTitle" sx={{ marginTop: "10px" }}>
        Insurance
      </Typography>
      <hr style={{ marginTop: 0, marginBottom: "0.5rem" }} />
      <Grid container sx={{ marginTop: 1, marginBottom: 1, padding: 0 }}>
        <Grid xs={3} sm={3} md={3}>
          <Typography variant="claimPrintLabel">Company:</Typography>
        </Grid>
        <Grid xs={9} sm={9} md={9}>
          <Typography variant="claimPrintText">{claim?.insurance?.company}</Typography>
        </Grid>
        <Grid xs={3} sm={3} md={3}>
          <Typography variant="claimPrintLabel">Policy #:</Typography>
        </Grid>
        <Grid xs={9} sm={9} md={9}>
          <Typography variant="claimPrintText">{claim?.insurance?.policyNo}</Typography>
        </Grid>
        <Grid xs={3} sm={3} md={3}>
          <Typography variant="claimPrintLabel">Claim #:</Typography>
        </Grid>
        <Grid xs={3} sm={3} md={3}>
          <Typography variant="claimPrintText">{claim?.insurance?.claimNo}</Typography>
        </Grid>
        <Grid xs={3} sm={3} md={3}>
          <Typography variant="claimPrintLabel">File #:</Typography>
        </Grid>
        <Grid xs={3} sm={3} md={3}>
          <Typography variant="claimPrintText" sx={{ wordWrap: "break-word" }}>
            {claim?.insurance?.fileNo}
          </Typography>
        </Grid>
        <Grid xs={3} sm={3} md={3}>
          <Typography variant="claimPrintLabel">Issued:</Typography>
        </Grid>
        <Grid xs={3} sm={3} md={3}>
          <Typography variant="claimPrintText">
            {formatDate(claim?.insurance?.issueDate, true)}
          </Typography>
        </Grid>
        <Grid xs={3} sm={3} md={3}>
          <Typography variant="claimPrintLabel">Expires:</Typography>
        </Grid>
        <Grid xs={3} sm={3} md={3}>
          <Typography variant="claimPrintText">
            {formatDate(claim?.insurance?.expiryDate, true)}
          </Typography>
        </Grid>
      </Grid>

      <Typography variant="claimPrintSectionTitle" sx={{ marginTop: 2 }}>
        Policy Coverages
      </Typography>
      <hr style={{ marginTop: 0, marginBottom: "0.5rem" }} />
      <Stack direction="column" spacing={1}>
        {claim?.policyCoverage?.map((coverage, ix) => {
          return (
            <Stack key={ix} direction="column" justifyContent="flex-start" alignItems="flex-start">
              <Typography variant="claimPrintLabel">{coverage.category}:</Typography>
              <Typography variant="claimPrintText">${coverage.amount}</Typography>
            </Stack>
          );
        })}
      </Stack>
    </div>,
    <div style={{ marginTop: "0.5rem" }}>
      <Typography variant="claimPrintSectionTitle">Contacts</Typography>
      <hr style={{ marginTop: 0, marginBottom: "0.5rem" }} />
      <Stack direction="row" justifyContent="flex-start" alignItems="flex-start" flexWrap="wrap">
        {otherContacts?.map((item, index) => {
          return (
            <Stack
              key={index}
              direction="column"
              justifyContent="space-between"
              alignItems="flex-start"
              spacing={1}
              sx={{ marginBottom: "1rem", minWidth: "50%" }}
            >
              <Typography variant="claimPrintLabel">{item?.category}</Typography>
              <Typography variant="claimPrintLabel">{item?.name}</Typography>
              <Stack>
                <Typography variant="claimPrintText">{item?.businessName}</Typography>
                {item?.address?.map((it, ix) => {
                  return (
                    <Stack key={ix}>
                      <Typography variant="claimPrintItalicLabel">
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
                      <Typography variant="claimPrintItalicLabel">
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
                      <Typography variant="claimPrintItalicLabel">
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
    <div className="print-container">
      {content.map((section, index) => (
        <div key={index} className="print-section">
          {section}
        </div>
      ))}
    </div>
  );
};
