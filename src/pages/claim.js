import { useState, useEffect } from "react";
import Head from "next/head";
import { Box, Container, Stack, Typography, Button, SvgIcon } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";

import { ClaimView } from "src/sections/claims/claim-view";
import { InsuraceForms } from "src/sections/claims/insurance-forms";

import { CustomAlert } from "src/components/custom-alert";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { fetchForms } from "src/store/reducers/forms/thunks";
import { fetchClaims } from "src/store/reducers/claims/thunks";

const Page = () => {
  const [claim, setClaim] = useState({});
  const { claimsData } = useSelector((state) => state.claims);
  const {
    formsData,
    meta: { isFormLoading },
  } = useSelector((state) => state.forms);

  const dispatch = useDispatch();

  const router = useRouter();
  const { fileNo } = router.query;

  useEffect(() => {
    if (claim?.fileNo) {
      const isValuePresent = formsData.some((obj) => obj.claimfileNo === claim?.fileNo);
      if (formsData.length == 0 || !isValuePresent) {
        dispatch(fetchForms(claim?.fileNo));
        console.log("Forms Fetched");
      } else {
        console.log("Forms Not Fetched");
      }
    }
  }, [claim, dispatch]);

  useEffect(() => {
    if (claimsData.length == 0) {
      dispatch(fetchClaims());
      console.log("Claims Fetched");
    } else {
      console.log("Claims Not Fetched");
    }
  }, []);

  useEffect(() => {
    setClaim(claimsData.filter((i) => i.fileNo == fileNo)[0]);
  }, [claimsData, fileNo]);

  return (
    <>
      <Head>
        <title>{claim?.fileNo} | MCM</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">{`Claim ${claim?.fileNo}/${claim?.insurance?.fileNo}`}</Typography>
              </Stack>
            </Stack>
            <ClaimView item={claim} />
            <InsuraceForms item={claim} formsData={formsData} isFormLoading={isFormLoading} />
          </Stack>
          <CustomAlert />
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
