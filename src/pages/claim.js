import { useState, useEffect } from "react";
import Head from "next/head";
import { Box, Container, Stack, Typography } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { ClaimView } from "src/sections/claims/claim-view";
import { CustomAlert } from "src/components/custom-alert";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { fetchContacts } from "src/store/reducers/contacts/thunks";

const Page = () => {
  const dispatch = useDispatch();
  const [claim, setClaim] = useState({});

  const router = useRouter();
  const { data } = router.query;

  useEffect(() => {
    setClaim(JSON.parse(data));
  }, []);

  useEffect(() => {
    dispatch(fetchContacts());
  }, []);

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
          </Stack>
          <CustomAlert />
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
