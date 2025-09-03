import { useCallback, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography, LinearProgress } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { ContactsTable } from "src/sections/contacts/contacts-table";
import { ContactsSearch } from "src/sections/contacts/contacts-search";
import { ContactsAdd } from "src/sections/contacts/contacs-add";
import { ContactsView } from "src/sections/contacts/contacts-view";
import { deleteContactApi } from "src/network/contacts-api";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts, deleteContactFromStore } from "src/store/reducers/contacts/thunks";
import { CustomAlert } from "src/components/custom-alert";
import { setAlertData } from "src/store/reducers/alert/thunks";

const Page = () => {
  // State Variables ===============================================
  const dispatch = useDispatch();
  const {
    contactsData,
    count,
    meta: { isLoading },
  } = useSelector((state) => state.contacts);

  const [contactItem, setContactItem] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [page, setPage] = useState(0);
  const ROWS_PER_PAGE = 5;
  const [openModal, setOpenModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Table Functions ================================================
  const handlePageChange = useCallback((event, value) => {
    setPage(value)
  }, []);

  const handleSearchClick = useCallback((searchTerm) => {
    setPage(0)
    setSearchTerm(searchTerm)
  }, [])


  // API Functions====================================================
  const deleteContact = async (contact) => {
    try {
      const response = await deleteContactApi({ contact: contact });
      if (response && response.data.type !== "error") {
        dispatch(
          setAlertData({ open: true, message: response.data.message, type: response.data.type })
        );
        dispatch(deleteContactFromStore(contact));
      } else {
        dispatch(
          setAlertData({ open: true, message: response.data.message, type: response.data.type })
        );
      }
    } catch (e) {
    }
  };

  // Edit Modal Functions ==============================================
  const handleRowClick = (item) => {
    setContactItem(item);
    setIsEdit(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setIsEdit(false);
      setContactItem(null);
      setOpenModal(false);
    }
  };

  const handleOpen = () => {
    setOpenModal(true);
  };

  useEffect(() => {
    if (isEdit) {
      setOpenModal(true);
    }
  }, [isEdit]);

  // View Modal Functions =============================================
  const handleViewClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setContactItem(null);
      setOpenViewModal(false);
    }
  };

  const handleViewOpen = (item) => {
    setContactItem(item);
    setOpenViewModal(true);
  };

  const handleViewEdit = () => {
    setOpenViewModal(false);
    setIsEdit(true);
  };

  // Search Functions and State=========================================


  useEffect(() => {
    dispatch(fetchContacts({
      page,
      searchTerm,
    }))
  }, [dispatch, page, searchTerm]);

  // Useffect Calls =====================================================

  return (
    <>
      <Head>
        <title>Contacts | MCM</title>
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
                <Typography variant="h4">Contacts</Typography>
              </Stack>
              <div>
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                  onClick={handleOpen}
                >
                  Add New Contact
                </Button>
              </div>
            </Stack>
            <ContactsSearch handleSearchClick={handleSearchClick} />
            {isLoading && (
              <Box sx={{ width: "100%" }}>
                <LinearProgress />
              </Box>
            )}
            <ContactsTable
              count={count}
              items={contactsData.length > 0 ? contactsData : []}
              onPageChange={handlePageChange}
              page={page}
              rowsPerPage={ROWS_PER_PAGE}
              handleRowClick={handleRowClick}
              deleteContact={deleteContact}
              viewContact={handleViewOpen}
            />
          </Stack>
          <ContactsAdd
            open={openModal}
            handleClose={handleClose}
            item={contactItem}
            isEdit={isEdit}
          />
          <ContactsView
            open={openViewModal}
            handleClose={handleViewClose}
            item={contactItem}
            handleViewEdit={handleViewEdit}
          />
        </Container>
        <CustomAlert />
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
