import { useCallback, useMemo, useState, useEffect } from "react";
import Head from "next/head";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography, LinearProgress } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { ClaimsAdd } from "src/sections/claims/claims-add";
import { ClaimsTable } from "src/sections/claims/claims-table";
import { ClaimsSearch } from "src/sections/claims/claims-search";
import { applyPagination } from "src/utils/apply-pagination";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "src/store/reducers/contacts/thunks";
import { ContactsAdd } from "src/sections/contacts/contacs-add";
import { CustomAlert } from "src/components/custom-alert";
import { fetchClaims } from "src/store/reducers/claims/thunks";
import { setAlertData } from "src/store/reducers/alert/thunks";
import { deleteClaimApi } from "src/network/claims-api";

const claim = {
  id: "5e887ac47eed25309112fvcb",
  fileNo: "223021",
  insured: [
    { name: "Dan Roussis", id: "970249f1-cb29-44ba-9d6a-bd3363e5774a" },
    { name: "Anika Viser", id: "99235a6d-b99a-4d74-b477-2dda8b06635f" },
  ],
  lossLocation: "1038 Boston Rd, The Bronx, NY 10456, USA",
  lossType: "Fire",
  lossDate: new Date(),
  insurance: {
    company: "State Farm Insurance Co.",
    fileNo: "549123",
    policyNo: "NYP2005065-11",
    claimNo: "P13 2602",
    issueDate: new Date(),
    expiryDate: new Date(),
  },
  policyCoverage: [{ category: "Property Damage", amount: "23000" }],
  contacts: [
    {
      category: "Adjuster",
      contact: { name: "Howard Guttman", id: "20441dae-40dc-49a5-85fa-e570706b912b" },
    },
    {
      category: "Adjuster",
      contact: { name: "Anika Viser", id: "99235a6d-b99a-4d74-b477-2dda8b06635f" },
    },
  ],
  docs: ["", "", ""],
  tasks: ["", "", ""],
  forms: ["", "", ""],
};

const data = Array.from({ length: 10 }, () => claim);

const useClaims = (claimsData, page, rowsPerPage) => {
  return useMemo(() => {
    return applyPagination(claimsData, page, rowsPerPage);
  }, [claimsData, page, rowsPerPage]);
};

const useClaimIds = (claims) => {
  return useMemo(() => {
    return claims.map((claim) => claim.id);
  }, [claims]);
};

const Page = () => {
  // State Variables======================================
  const dispatch = useDispatch();
  const { contactsData } = useSelector((state) => state.contacts);
  const {
    claimsData,
    meta: { isClaimLoading },
  } = useSelector((state) => state.claims);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const claims = useClaims(claimsData, page, rowsPerPage);
  const claimsIds = useClaimIds(claims);
  const claimsSelection = useSelection(claimsIds);
  const [openModal, setOpenModal] = useState(false);
  const [claimsModalData, setClaimsModalData] = useState();

  const [openContactsModal, setOpenContactsModal] = useState(false);
  const [contactsModalData, setContactsModalData] = useState();
  const [isEdit, setIsEdit] = useState(false);

  // API Functions====================================================
  const deleteClaim = async (claim) => {
    try {
      const response = await deleteClaimApi({ claim: claim });
      if (response && response.data.type !== "error") {
        dispatch(
          setAlertData({ open: true, message: response.data.message, type: response.data.type })
        );
      } else {
        dispatch(
          setAlertData({ open: true, message: response.data.message, type: response.data.type })
        );
      }
      dispatch(fetchClaims());
    } catch (e) {
      console.log(e);
    }
  };

  // Modal Functions======================================
  const handleClose = () => {
    setClaimsModalData({});
    setOpenModal(false);
  };

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  const handleEditModalOpen = (item) => {
    setClaimsModalData(item);
  };

  // Contact Modal================================
  const handleContactClick = (item) => {
    const foundContact = contactsData.find((x) => x.id === item);
    if (foundContact) {
      setContactsModalData(foundContact);
      setIsEdit(true);
    } else {
      console.log("Contact Not Found, You might have deleted it");
    }
  };

  const handleContactsModalClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setIsEdit(false);
      setContactsModalData(null);
      setOpenContactsModal(false);
    }
  };

  // UseEffect Calls=======================================

  useEffect(() => {
    if (isEdit) {
      setOpenContactsModal(true);
    }
  }, [isEdit]);

  useEffect(() => {
    if (claimsModalData?.fileNo) {
      setOpenModal(true);
    }
  }, [claimsModalData]);

  useEffect(() => {
    dispatch(fetchClaims());
    dispatch(fetchContacts());
  }, []);

  return (
    <>
      <Head>
        <title>Claims | MCM</title>
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
                <Typography variant="h4">Claims</Typography>
              </Stack>
              <div>
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                  onClick={() => setOpenModal(true)}
                >
                  New Claim
                </Button>
              </div>
            </Stack>
            <ClaimsSearch />
            {isClaimLoading ? (
              <Box sx={{ width: "100%" }}>
                <LinearProgress />
              </Box>
            ) : (
              <ClaimsTable
                count={data.length}
                items={claims}
                onDeselectAll={claimsSelection.handleDeselectAll}
                onDeselectOne={claimsSelection.handleDeselectOne}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                onSelectAll={claimsSelection.handleSelectAll}
                onSelectOne={claimsSelection.handleSelectOne}
                page={page}
                rowsPerPage={rowsPerPage}
                selected={claimsSelection.selected}
                deleteClaim={deleteClaim}
                handleEditModalOpen={handleEditModalOpen}
              />
            )}
          </Stack>
          <ClaimsAdd
            open={openModal}
            handleClose={handleClose}
            editContact={handleContactClick}
            item={claimsModalData}
          />
          <ContactsAdd
            open={openContactsModal}
            handleClose={handleContactsModalClose}
            item={contactsModalData}
            isEdit={isEdit}
          />
        </Container>
        <CustomAlert />
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
