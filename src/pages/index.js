import Head from "next/head";
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from "@mui/material";
import { Fragment, useEffect } from "react";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { CompanyCard } from "src/sections/companies/company-card";
import { items } from "src/layouts/dashboard/config";

const Page = () => {
  return (
    <>
      <Head>
        <title>Dashboard | MCM</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
          backgroundColor: "white",
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Container>
                <Stack spacing={1}>
                  {/* <Typography variant="h4">My Claims Manager</Typography> */}
                  <Typography
                    align="center"
                    color="inherit"
                    sx={{
                      fontSize: "24px",
                      lineHeight: "32px",
                      mb: 1,
                    }}
                    variant="h1"
                  >
                    Welcome to{" "}
                    <Box component="a" sx={{ color: "#15B79E" }} target="_blank">
                      My Claims Manager
                    </Box>
                  </Typography>
                  <Typography align="center" sx={{ mb: 3 }} variant="subtitle1">
                    Hey, Howie. What&#39;s on your mind today?
                  </Typography>
                </Stack>
              </Container>
            </Stack>
            <Grid container spacing={3}>
              {items.map((item, index) => (
                <Fragment key={index}>
                  {index !== 0 && (
                    <Grid xs={12} md={6} lg={4} key={item.title}>
                      <CompanyCard company={item} />
                    </Grid>
                  )}
                </Fragment>
              ))}
            </Grid>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
