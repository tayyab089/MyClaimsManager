import { useState, useEffect } from "react";
import Head from "next/head";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { ClaimsAdd } from "src/sections/claims/claims-add";
import { ClaimView } from "src/sections/claims/claim-view";
import { useRouter } from "next/router";

const Page = () => {
  const [claim, setClaim] = useState({});
  const [openModal, setOpenModal] = useState(false);

  const handleClose = () => {
    setOpenModal(false);
  };

  const router = useRouter();
  const { data } = router.query;

  useEffect(() => {
    setClaim(JSON.parse(data));
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
          <ClaimsAdd open={openModal} handleClose={handleClose} />
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
