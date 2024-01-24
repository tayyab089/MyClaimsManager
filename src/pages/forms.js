import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { Box, Container, Stack, Typography, Button, TextField } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { useReactToPrint } from "react-to-print";

import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import useConfirm from "src/hooks/use-confirm";

import { ProofOfLoss } from "src/sections/forms/proof-of-loss";
import { SubrogationReceipt } from "src/sections/forms/subrogation-receipt";
import { Regulation10 } from "src/sections/forms/regulation-10";
import { CompensationAgreement } from "src/sections/forms/compensation-agreement";
import { DisclosureStatement } from "src/sections/forms/disclosure-statement";
import { CancellationNotice } from "src/sections/forms/cancellation-notice";

import {
  TrashIcon,
  PrinterIcon,
  DocumentIcon,
  EnvelopeIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/outline";

// import { addFormsDataToClaim } from "src/store/reducers/claims/thunks";

// import { PDFDownloadLink, BlobProvider, pdf } from "@react-pdf/renderer";
import html2pdf from "html2pdf.js";
import { saveAs } from "file-saver";
// import { emailFormApi } from "src/network/forms-api";

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
import { CustomAlert } from "src/components/custom-alert";

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { formType, fileNo, formId } = router.query;
  const { claimsData } = useSelector((state) => state.claims);
  const { formsData } = useSelector((state) => state.forms);
  const [claim, setClaim] = useState({});
  const [form, setForm] = useState({});
  const [formName, setFormName] = useState(formType);

  const componentRef = useRef();

  const handleClose = async () => {
    const customTitle = "Confirm Back";
    const customMessage = `Are you sure? Any Unsaved Changes will be lost`;

    const ans = await confirmDelete(customTitle, customMessage);

    ans ? router.back() : console.log("Back Canceled");
  };

  // Print Function ==============================
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // PDF Generation ==============================
  const generatePDF = () => {
    console.log("I ran");
    console.log(formType);
    // const blob = pdf(Regulation10Print).toBlob();
    const element = document.getElementById(formType);
    html2pdf()
      .from(element)
      .output("blob")
      .then((blob) => saveAs(blob, formName));

    console.log(element);
  };

  // Formik functions
  const reg10formRef = useRef();
  const subrogationformRef = useRef();
  const ProofOfLossformRef = useRef();
  const compensationAgreementformRef = useRef();
  const disclosureStatementformRef = useRef();
  const cancellationNoticeformRef = useRef();

  // Submit Function ===================================================
  const handleSubmit = async () => {
    if (formType == "ProofOfLoss") {
      console.log("Form Not Setup Yet");
    } else if (formType == "Regulation10") {
      if (reg10formRef.current) {
        await reg10formRef.current.handleSubmit();
      }
    } else {
      if (subrogationformRef.current) {
        subrogationformRef.current.handleSubmit();
      }
    }
  };

  // Delete Function =====================================================
  const [Dialog, confirmDelete] = useConfirm();

  const handleDelete = async () => {
    const customTitle = "Confirm Delete";
    const customMessage = `Are you sure you want to delete form: <strong> ${form?.type} </strong> along with all its data? Please note that this process is not reversible.`;
    if (form) {
      const ans = await confirmDelete(customTitle, customMessage);
      if (ans) {
        if (formType == "ProofOfLoss") {
          console.log("Form Not Setup Yet");
        } else if (formType == "Regulation10") {
          await deleteFormApi({
            form: { claimfileNo: fileNo, formId: formId, userId: form?.userId },
          });
          router.push("/claim");
        } else {
          console.log("Form Not Setup Yet");
        }
      }
    }
  };

  // Form Selector

  const formSelector = () => {
    switch (formType) {
      case "ProofOfLoss":
        return (
          <ProofOfLoss formRef={ProofOfLossformRef} claim={claim} form={form} formName={formName} />
        );
      case "Regulation10":
        return (
          <Regulation10 formRef={reg10formRef} claim={claim} form={form} formName={formName} />
        );
      case "CompensationAgreement":
        return (
          <CompensationAgreement
            formRef={compensationAgreementformRef}
            claim={claim}
            form={form}
            formName={formName}
          />
        );
      case "DisclosureStatement":
        return (
          <DisclosureStatement
            formRef={disclosureStatementformRef}
            claim={claim}
            form={form}
            formName={formName}
          />
        );
      case "CancellationNotice":
        return (
          <CancellationNotice
            formRef={cancellationNoticeformRef}
            claim={claim}
            form={form}
            formName={formName}
          />
        );
      default:
        return (
          <SubrogationReceipt
            formRef={subrogationformRef}
            claim={claim}
            form={form}
            formName={formName}
          />
        );
    }
  };

  // useEffect Hooks
  useEffect(() => {
    setClaim(claimsData.filter((item) => item.fileNo == fileNo)[0]);
    setForm(formsData.filter((item) => item.formId == formId)[0]);
  }, [claimsData, formsData, fileNo, formId]);

  useEffect(() => {
    setFormName(form?.name ? form.name : formType);
  }, [form]);

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
                value={formName}
                onChange={(event) => setFormName(event.target.value)}
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
              {/* <PDFDownloadLink document={<Regulation10Print />} fileName="MyFile">
                {({ blob, url, loading, error }) => {
                  console.log(blob);
                  return loading ? "Loading..." : "Download";
                }}
              </PDFDownloadLink> */}
              {/* <BlobProvider document={Regulation10Print}>
                {({ blob, url, loading, error }) => {
                  console.log(blob);
                  return <div>There's something going on on the fly</div>;
                }}
              </BlobProvider> */}
              <Button
                variant="outlined"
                size="small"
                color="primary"
                sx={{ marginLeft: "20px" }}
                startIcon={<DocumentIcon style={{ height: 20, width: 20 }} />}
                onClick={() => generatePDF()}
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
            {formSelector()}
            {/* {formType == "ProofOfLoss" ? (
              <ProofOfLoss
                formRef={ProofOfLossformRef}
                claim={claim}
                form={form}
                formName={formName}
              />
            ) : formType == "Regulation10" ? (
              <Regulation10 formRef={reg10formRef} claim={claim} form={form} formName={formName} />
            ) : (
              <SubrogationReceipt
                formRef={subrogationformRef}
                claim={claim}
                form={form}
                formName={formName}
              />
            )} */}
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
                onClick={() => handleDelete()}
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
                onClick={() => handleClose()}
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
        <CustomAlert />
        <Dialog />
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
