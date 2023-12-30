import { useState, useEffect } from "react";
import Head from "next/head";
import { Box, Container, Stack, Typography, Button, SvgIcon } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";

import { ClaimView } from "src/sections/claims/claim-view";
import { InsuraceForms } from "src/sections/claims/insurance-forms";

import { CustomAlert } from "src/components/custom-alert";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import { ChevronLeftIcon } from "@heroicons/react/20/solid";

const Page = () => {
  const [claim, setClaim] = useState({});
  const { claimsData } = useSelector((state) => state.claims);

  const router = useRouter();
  const { fileNo } = router.query;

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
              <div>
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <ChevronLeftIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                  onClick={() => router.back()}
                >
                  Back
                </Button>
              </div>
            </Stack>
            <ClaimView item={claim} />
            <InsuraceForms item={claim} />
          </Stack>
          <CustomAlert />
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
