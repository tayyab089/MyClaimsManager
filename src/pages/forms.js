import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { Box, Container, Stack, Button, TextField, CircularProgress } from "@mui/material";
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

import { EmailToModal } from "src/sections/forms/email-modal";

import {
  TrashIcon,
  PrinterIcon,
  DocumentIcon,
  EnvelopeIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/outline";

import { deleteFormFromStore } from "src/store/reducers/forms/thunks";

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
import { deleteFormApi, emailFormApi } from "src/network/forms-api";
import { CustomAlert } from "src/components/custom-alert";
import { setAlertData } from "src/store/reducers/alert/thunks";
import { getSingleClaimApi } from "src/network/claims-api";

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { formType, fileNo, formId } = router.query;
  const { formsData } = useSelector((state) => state.forms);
  const [claim, setClaim] = useState({});
  const [form, setForm] = useState({});
  const [formName, setFormName] = useState(formType);

  // Loader Variables
  const [savingForm, setSavingForm] = useState(false);
  const [deletingForm, setDeletingForm] = useState(false);
  const [generatingPDF, setGeneratingPDF] = useState(false);
  const [emailingPDF, setEmailingPDF] = useState(false);
  const [Dialog, confirmDialog] = useConfirm();

  // Email Modal Variables
  const [email, setEmail] = useState("");
  const [eBody, setEBody] = useState("");
  const [eSubject, setESubject] = useState("");
  const [openEmailModal, setOpenEmailModal] = useState(false);

  const componentRef = useRef();

  const handleClose = async () => {
    router.back();
  };

  // Print Function ==============================
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // PDF Generation ==============================
  const generatePDF = async () => {
    setGeneratingPDF(true);
    try {
      const html2pdf = (await import("html2pdf.js")).default;
      const element = document.getElementById(formType);
      var opt = {
        margin: [0.2, 0],
        filename: formName,
        image: { type: "jpeg", quality: 1 },
        html2canvas: { scale: 1 },
        jsPDF: { unit: "in", format: "legal", orientation: "portrait" },
      };
      html2pdf().from(element).set(opt).save();
    } catch (e) {
    } finally {
      setGeneratingPDF(false);
    }
  };

  const emailPDF = async () => {
    setEmailingPDF(true);
    const html2pdf = (await import("html2pdf.js")).default;
    const element = document.getElementById(formType);
    const formData = new FormData();
    const jsonData = { emailTo: email, subject: eSubject, eBody: eBody, formName: formName };

    var opt = {
      margin: [0.2, 0],
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "legal", orientation: "portrait" },
    };

    try {
      const blob = await html2pdf().from(element).set(opt).output("blob");
      formData.append("pdfFile", blob, "document.pdf");
      formData.append("jsonData", JSON.stringify(jsonData));
      const response = await emailFormApi(formData);
      if (response && response.data.type !== "error") {
        dispatch(
          setAlertData({ open: true, message: response.data.message, type: response.data.type })
        );
        setEmail("");
        setEBody("");
        setOpenEmailModal(false);
      } else {
        dispatch(
          setAlertData({ open: true, message: response.data.message, type: response.data.type })
        );
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setEmailingPDF(false);
    }
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
    try {
      switch (formType) {
        case "ProofOfLoss":
          if (ProofOfLossformRef.current) {
            await ProofOfLossformRef.current.handleSubmit();
          }
          break;
        case "Regulation10":
          if (reg10formRef.current) {
            await reg10formRef.current.handleSubmit();
          }
          break;
        case "CompensationAgreement":
          if (compensationAgreementformRef.current) {
            await compensationAgreementformRef.current.handleSubmit();
          }
          break;
        case "DisclosureStatement":
          if (disclosureStatementformRef.current) {
            await disclosureStatementformRef.current.handleSubmit();
          }
          break;
        case "CancellationNotice":
          if (cancellationNoticeformRef.current) {
            await cancellationNoticeformRef.current.handleSubmit();
          }
          break;
        default:
          if (subrogationformRef.current) {
            subrogationformRef.current.handleSubmit();
          }
          break;
      }
    } catch (e) {
    } finally {
      setSavingForm(false);
    }
  };

  // Delete Function =====================================================
  const handleDelete = async () => {
    try {
      const customTitle = "Confirm Delete";
      const customMessage = `Are you sure you want to delete form: <strong> ${form?.type} </strong> along with all its data? Please note that this process is not reversible.`;
      if (form) {
        const ans = await confirmDialog(customTitle, customMessage);
        if (ans) {
          setDeletingForm(true);
          const response = await deleteFormApi({
            form: form,
          });
          if (response && response.data.type !== "error") {
            dispatch(deleteFormFromStore(form));
            router.back();
          } else {
            dispatch(
              setAlertData({
                open: true,
                message: response?.data?.message,
                type: response?.data?.type,
              })
            );
            setDeletingForm(false);
          }
        }
      }
    } catch (e) {
    } finally {
      // setDeletingForm(false);
    }
  };

  // Form Selector

  const formSelector = () => {
    switch (formType) {
      case "ProofOfLoss":
        return (
          <ProofOfLoss
            formRef={ProofOfLossformRef}
            claim={claim}
            form={form}
            formName={formName}
            setSavingForm={setSavingForm}
            setForm={setForm}
          />
        );
      case "Regulation10":
        return (
          <Regulation10
            formRef={reg10formRef}
            claim={claim}
            form={form}
            formName={formName}
            setForm={setForm}
            setSavingForm={setSavingForm}
          />
        );
      case "CompensationAgreement":
        return (
          <CompensationAgreement
            formRef={compensationAgreementformRef}
            claim={claim}
            form={form}
            formName={formName}
            setSavingForm={setSavingForm}
            setForm={setForm}
          />
        );
      case "DisclosureStatement":
        return (
          <DisclosureStatement
            formRef={disclosureStatementformRef}
            claim={claim}
            form={form}
            formName={formName}
            setSavingForm={setSavingForm}
            setForm={setForm}
          />
        );
      case "CancellationNotice":
        return (
          <CancellationNotice
            formRef={cancellationNoticeformRef}
            claim={claim}
            form={form}
            formName={formName}
            setSavingForm={setSavingForm}
            setForm={setForm}
          />
        );
      default:
        return (
          <SubrogationReceipt
            formRef={subrogationformRef}
            claim={claim}
            form={form}
            formName={formName}
            setSavingForm={setSavingForm}
            setForm={setForm}
          />
        );
    }
  };

  useEffect(() => {
    const fetchClaim = async () => {
      if (fileNo) {
        try {
          const { data } = await getSingleClaimApi(fileNo);
          setClaim(data);
        } catch (error) {
        } finally {
        }
      }
    };
    fetchClaim();
  }, [fileNo]);

  useEffect(() => {
    setForm(formsData.filter((item) => item.formId == formId)[0]);
  }, [claim]);

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
              <Button
                variant="outlined"
                size="small"
                color="primary"
                sx={{ marginLeft: "20px" }}
                startIcon={<DocumentIcon style={{ height: 20, width: 20 }} />}
                onClick={() => generatePDF()}
                disabled={generatingPDF}
              >
                {generatingPDF ? (
                  <CircularProgress style={{ width: 24, height: 24, color: "primary" }} />
                ) : (
                  "PDF"
                )}
              </Button>
              <Button
                variant="outlined"
                size="small"
                color="primary"
                sx={{ marginLeft: "20px" }}
                startIcon={<EnvelopeIcon style={{ height: 20, width: 20 }} />}
                onClick={() => setOpenEmailModal(true)}
                disabled={emailingPDF}
              >
                {emailingPDF ? (
                  <CircularProgress style={{ width: 24, height: 24, color: "primary" }} />
                ) : (
                  "EMAIL"
                )}
              </Button>
            </Stack>
          </Stack>
          <div ref={componentRef}>{formSelector()}</div>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={4}
            sx={footerStyles}
          >
            <Stack direction="row" justifyContent="flex-start" alignItems="center">
              {!savingForm && (
                <Button
                  variant="outlined"
                  size="small"
                  color="primary"
                  startIcon={<TrashIcon style={{ height: 20, width: 20 }} />}
                  onClick={() => handleDelete()}
                  disabled={deletingForm}
                >
                  {deletingForm ? (
                    <CircularProgress style={{ width: 24, height: 24, color: "primary" }} />
                  ) : (
                    "DELETE"
                  )}
                </Button>
              )}
            </Stack>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              {!savingForm && (
                <Button
                  variant="contained"
                  size="small"
                  color="neutral"
                  sx={{ marginLeft: "20px" }}
                  onClick={() => handleClose()}
                >
                  CLOSE
                </Button>
              )}
              <Button
                variant="contained"
                size="small"
                color="primary"
                sx={{ marginLeft: "20px" }}
                onClick={handleSubmit}
                disabled={savingForm}
              >
                {savingForm ? (
                  <CircularProgress style={{ width: 24, height: 24, color: "white" }} />
                ) : (
                  "SAVE"
                )}
              </Button>
            </Stack>
          </Stack>
        </Container>
        <CustomAlert />
        <Dialog />
        <EmailToModal
          email={email}
          setEmail={setEmail}
          eBody={eBody}
          setEBody={setEBody}
          eSubject={eSubject}
          setESubject={setESubject}
          openEmailModal={openEmailModal}
          setOpenEmailModal={setOpenEmailModal}
          emailPDF={emailPDF}
          emailingPDF={emailingPDF}
        />
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
