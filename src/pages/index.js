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
import { fetchClaims, deleteClaimFromStore } from "src/store/reducers/claims/thunks";
import { setAlertData } from "src/store/reducers/alert/thunks";
import { deleteClaimApi } from "src/network/claims-api";

import { emptyValues } from "src/sections/contacts/contacts-static-data";

const useClaims = (claimsData, page, rowsPerPage) => {
  return useMemo(() => {
    return applyPagination(claimsData, page, rowsPerPage);
  }, [claimsData, page, rowsPerPage]);
};

const useClaimIds = (claims) => {
  return useMemo(() => {
    return claims.map((claim) => claim?.id);
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
      if (response && response?.data?.type !== "error") {
        dispatch(deleteClaimFromStore(claim));
        dispatch(
          setAlertData({ open: true, message: response?.data?.message, type: "success"})
        );
      } else {
        dispatch(
          setAlertData({ open: true, message: response?.data?.message || "Network error: Please check your connection and try again.", type: "error" })
        );
      }
    } catch (e) {
      dispatch(setAlertData({ open: true, message: e?.data?.message || "Network error: Please check your connection and try again.", type: "error" }));
    }
  };

  // Modal Functions======================================
  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setClaimsModalData({});
      setOpenModal(false);
    }
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
    const foundContact = contactsData.find((x) => x.id === item.id);
    if (foundContact) {
      setContactsModalData(foundContact);
      setIsEdit(true);
    } else {
      setContactsModalData({ ...emptyValues, name: item.name });
      setOpenContactsModal(true);
    }
  };

  const handleContactsModalClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setIsEdit(false);
      setContactsModalData(null);
      setOpenContactsModal(false);
    }
  };

  // Search Functions and State=========================================
  const [searchValue, setSearchValue] = useState("");
  const [filteredClaims, setFilteredClaims] = useState([]);

  const filterData = useCallback((val) => {
    const lowercaseVal = val.toLowerCase();
    const filteredData = claims.filter(
      (obj) =>
        obj?.fileNo?.toLowerCase().includes(lowercaseVal) ||
        obj?.lossLocation?.toLowerCase().includes(lowercaseVal) ||
        obj?.insured?.some((insured) => insured.name.toLowerCase().includes(lowercaseVal))
    );
    setSearchValue(val);
    setFilteredClaims(filteredData);
  }, [claims])

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
    if (claimsData.length == 0 || contactsData.length == 0) {
      dispatch(fetchClaims());
      dispatch(fetchContacts());
    } else {
    }
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
            <ClaimsSearch filterData={filterData} />
            {isClaimLoading ? (
              <Box sx={{ width: "100%" }}>
                <LinearProgress />
              </Box>
            ) : filteredClaims.length > 0 || !searchValue ? (
              <ClaimsTable
                count={filteredClaims.length > 0 ? filteredClaims.length : claims.length}
                items={filteredClaims.length > 0 ? filteredClaims : claims}
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
            ) : (
              <Typography variant="h6">No claim found</Typography>
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
