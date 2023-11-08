import { useCallback, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography, LinearProgress } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { ContactsTable } from "src/sections/contacts/contacts-table";
import { ContactsSearch } from "src/sections/contacts/contacts-search";
import { ContactsAdd } from "src/sections/contacts/contacs-add";
import { ContactsView } from "src/sections/contacts/contacts-view";
import { applyPagination } from "src/utils/apply-pagination";
import { deleteContactApi } from "src/network/api";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "src/store/reducers/contacts/thunks";
import { CustomAlert } from "src/components/custom-alert";
import { setAlertData } from "src/store/reducers/alert/thunks";

const useContacts = (contactsData, page, rowsPerPage) => {
  return useMemo(() => {
    return applyPagination(contactsData, page, rowsPerPage);
  }, [contactsData, page, rowsPerPage]);
};

const useContactIds = (contacts) => {
  return useMemo(() => {
    return contacts?.map((contact) => contact.id);
  }, [contacts]);
};

const Page = () => {
  // State Variables ===============================================
  const dispatch = useDispatch();
  const {
    contactsData,
    meta: { isLoading },
  } = useSelector((state) => state.contacts);

  const [contactItem, setContactItem] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const contacts = useContacts(contactsData, page, rowsPerPage);
  const contactIds = useContactIds(contacts);
  const contactsSelection = useSelection(contactIds);
  const [openModal, setOpenModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);

  // Table Functions ================================================
  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  // API Functions====================================================
  const deleteContact = async (contact) => {
    try {
      const response = await deleteContactApi({ contact: contact });
      if (response && response.data.type !== "error") {
        dispatch(
          setAlertData({ open: true, message: response.data.message, type: response.data.type })
        );
      } else {
        dispatch(
          setAlertData({ open: true, message: response.data.message, type: response.data.type })
        );
      }
      dispatch(fetchContacts());
    } catch (e) {
      console.log(e);
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
  const [searchValue, setSearchValue] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);

  const filterData = (val) => {
    const lowercaseVal = val.toLowerCase();
    const filteredData = contacts.filter((obj) => obj.name.toLowerCase().includes(lowercaseVal));
    console.log(filteredData);
    setSearchValue(val);
    setFilteredContacts(filteredData);
  };

  // Useffect Calls =====================================================
  useEffect(() => {
    dispatch(fetchContacts());
  }, []);

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
            <ContactsSearch filterData={filterData} />
            {isLoading ? (
              <Box sx={{ width: "100%" }}>
                <LinearProgress />
              </Box>
            ) : filteredContacts.length > 0 || !searchValue ? (
              <ContactsTable
                count={filteredContacts.length > 0 ? filteredContacts.length : contactsData.length}
                items={filteredContacts.length > 0 ? filteredContacts : contacts}
                onDeselectAll={contactsSelection.handleDeselectAll}
                onDeselectOne={contactsSelection.handleDeselectOne}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                onSelectAll={contactsSelection.handleSelectAll}
                onSelectOne={contactsSelection.handleSelectOne}
                page={page}
                rowsPerPage={rowsPerPage}
                selected={contactsSelection.selected}
                handleRowClick={handleRowClick}
                deleteContact={deleteContact}
                viewContact={handleViewOpen}
              />
            ) : (
              <Typography variant="h6">No contact found</Typography>
            )}
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
