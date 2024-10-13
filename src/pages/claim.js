import { useState, useEffect } from "react";
import Head from "next/head";
import {
  Box,
  Container,
  Stack,
  Typography,
  Button,
  SvgIcon,
  CircularProgress,
} from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";

import { ClaimView } from "src/sections/claims/claim-view";
import { InsuraceForms } from "src/sections/claims/insurance-forms";

import { CustomAlert } from "src/components/custom-alert";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { fetchForms } from "src/store/reducers/forms/thunks";
import { fetchClaims } from "src/store/reducers/claims/thunks";
import { getSingleClaimApi } from "src/network/claims-api";

const Page = () => {
  const dispatch = useDispatch();
  const [claim, setClaim] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const {
    formsData,
    meta: { isFormLoading },
  } = useSelector((state) => state.forms);

  const router = useRouter();
  const { fileNo } = router.query;

  useEffect(() => {
    const fetchClaim = async () => {
      if (fileNo) {
        setIsLoading(true);
        setIsError(false);
        try {
          const { data } = await getSingleClaimApi(fileNo);
          console.log(data);
          setClaim(data);
        } catch (error) {
          setIsError(true);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchClaim();
  }, [fileNo]);
  

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
                {claim?.fileNo && (
                  <Typography variant="h4">
                    {`Claim ${claim.fileNo}${
                      claim?.insurance?.fileNo ? `/${claim.insurance.fileNo}` : ""
                    }`}
                  </Typography>
                )}{" "}
              </Stack>
            </Stack>
            {isLoading ? (
              <div className="flex items-center justify-center h-screen w-screen bg-gray-100">
                <CircularProgress size={60} thickness={4} />
              </div>
            ) : (
              <>
                {isError ? (
                  <div className="flex items-center justify-center h-screen w-screen bg-red-50">
                    <Typography variant="h5" color="error" className="font-semibold">
                      Claim Not Found
                    </Typography>
                    <Typography variant="body1" className="mt-2 text-gray-700">
                      Please ensure you are on the correct page or check the claim number you
                      entered.
                    </Typography>
                  </div>
                ) : (
                  <>
                    <ClaimView item={claim} />
                    <InsuraceForms
                      item={claim}
                      formsData={formsData}
                      isFormLoading={isFormLoading}
                    />
                  </>
                )}
              </>
            )}
          </Stack>
          <CustomAlert />
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
