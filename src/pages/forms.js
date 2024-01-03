import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { Box, Container, Stack, Typography, Button, TextField } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { useReactToPrint } from "react-to-print";

import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import { ProofOfLoss } from "src/sections/forms/proof-of-loss";
import { SubrogationReceipt } from "src/sections/forms/subrogation-receipt";
import { Regulation10 } from "src/sections/forms/regulation-10";

import {
  TrashIcon,
  PrinterIcon,
  DocumentIcon,
  EnvelopeIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/outline";

import { addFormsDataToClaim } from "src/store/reducers/claims/thunks";

const headerStyles = {
  backgroundColor: "white",
  height: 100,
  padding: "10px",
  marginBottom: "20px",
  borderWidth: "1px",
  borderBottomStyle: "solid",
  borderColor: "neutral.400",
};

const footerStyles = {
  backgroundColor: "white",
  height: 100,
  padding: "10px",
  marginTop: "20px",
  borderWidth: "1px",
  borderTopStyle: "solid",
  borderColor: "neutral.400",
};

import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { deleteFormApi } from "src/network/forms-api";

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { formName, fileNo } = router.query;
  const { claimsData } = useSelector((state) => state.claims);
  const [claim, setClaim] = useState({});

  const componentRef = useRef();

  const handleSave = async () => {
    console.log(formName, fileNo);
    dispatch(addFormsDataToClaim(fileNo, formName));
    router.back();
  };

  // Print Function ==============================
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // Formik functions
  const reg10formRef = useRef();
  const subrogationformRef = useRef();

  const handleSubmit = async () => {
    if (formName == "ProofOfLoss") {
      console.log("Form Not Setup Yet");
    } else if (formName == "Regulation10") {
      if (reg10formRef.current) {
        await reg10formRef.current.handleSubmit();
        router.back();
      }
    } else {
      if (subrogationformRef.current) {
        subrogationformRef.current.handleSubmit();
      }
    }
  };

  const handleDelete = async (form) => {
    if (formName == "ProofOfLoss") {
      console.log("Form Not Setup Yet");
    } else if (formName == "Regulation10") {
      if (reg10formRef.current) {
        const response = await deleteFormApi({ form: reg10formRef.current.values });
      }
    } else {
      if (subrogationformRef.current) {
        subrogationformRef.current.handleSubmit();
      }
    }
  };

  // useEffect Hooks
  useEffect(() => {
    setClaim(claimsData.filter((item) => item.fileNo == fileNo)[0]);
  }, []);

  return (
    <>
      <Head>
        <title> forms| MCM</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <Container maxWidth="xl">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={4}
            sx={headerStyles}
          >
            <Stack direction="row" justifyContent="flex-start" alignItems="center">
              <DocumentTextIcon style={{ height: 24, width: 24 }} />
              <TextField
                id="outlined-basic"
                label=""
                variant="outlined"
                defaultValue={formName}
                sx={{ marginLeft: "20px" }}
              />
            </Stack>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Button
                variant="outlined"
                size="small"
                color="primary"
                sx={{ marginLeft: "20px" }}
                startIcon={<PrinterIcon style={{ height: 20, width: 20 }} />}
                onClick={() => handlePrint()}
              >
                PRINT
              </Button>
              <Button
                variant="outlined"
                size="small"
                color="primary"
                sx={{ marginLeft: "20px" }}
                startIcon={<DocumentIcon style={{ height: 20, width: 20 }} />}
              >
                PDF
              </Button>
              <Button
                variant="outlined"
                size="small"
                color="primary"
                sx={{ marginLeft: "20px" }}
                startIcon={<EnvelopeIcon style={{ height: 20, width: 20 }} />}
              >
                EMAIL
              </Button>
              <Button
                startIcon={<ChevronLeftIcon style={{ height: 20, width: 20 }} />}
                variant="contained"
                sx={{ marginLeft: "20px" }}
                onClick={() => router.back()}
              >
                BACK
              </Button>
            </Stack>
          </Stack>
          <div ref={componentRef}>
            {formName == "ProofOfLoss" ? (
              <ProofOfLoss claim={claim} />
            ) : formName == "Regulation10" ? (
              <Regulation10 formRef={reg10formRef} claim={claim} />
            ) : (
              <SubrogationReceipt formRef={subrogationformRef} claim={claim} />
            )}
          </div>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={4}
            sx={footerStyles}
          >
            <Stack direction="row" justifyContent="flex-start" alignItems="center">
              <Button
                variant="outlined"
                size="small"
                color="primary"
                startIcon={<TrashIcon style={{ height: 20, width: 20 }} />}
              >
                DELETE
              </Button>
            </Stack>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Button
                variant="contained"
                size="small"
                color="neutral"
                sx={{ marginLeft: "20px" }}
                onClick={() => handleSave()}
              >
                CLOSE
              </Button>
              <Button
                variant="contained"
                size="small"
                color="primary"
                sx={{ marginLeft: "20px" }}
                onClick={() => handleSubmit()}
              >
                SAVE
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
