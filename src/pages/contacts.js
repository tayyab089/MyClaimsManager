import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react";
import Head from "next/head";
import { subDays, subHours } from "date-fns";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography, LinearProgress } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { ContactsTable } from "src/sections/contacts/contacts-table";
import { ContactsSearch } from "src/sections/contacts/contacts-search";
import { ContactsAdd } from "src/sections/contacts/contacs-add";
import { applyPagination } from "src/utils/apply-pagination";
import { getContactsApi, deleteContactApi } from "src/network/api";

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
  const [contactsData, setContactsData] = useState([]);
  const [contactItem, setContactItem] = useState(null);
  const [isLoading, setIsloading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const contacts = useContacts(contactsData, page, rowsPerPage);
  const contactIds = useContactIds(contacts);
  const contactsSelection = useSelection(contactIds);
  const [openModal, setOpenModal] = useState(false);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  // API Functions----------------------------------------------
  const fetchContacts = async () => {
    setIsloading(true);
    try {
      const response = await getContactsApi();
      if (response && response.data.type !== "error") {
        setContactsData(response.data.data);
      } else {
        alert(`${response.data.message}`);
      }
    } catch (e) {
      console.log(e);
    }
    setIsloading(false);
  };

  const deleteContact = async (contact) => {
    try {
      const response = await deleteContactApi({ contact: contact });
      if (response && response.data.type !== "error") {
        alert(`${response.data.message}`);
      } else {
        alert(`${response.data.message}`);
      }
      fetchContacts();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Modal Functions ----------------------------------------------
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

  // Search Functions and State-------------------------------------

  const [filteredContacts, setFilteredContacts] = useState([]);

  const filterData = (val) => {
    const filteredData = contacts.filter((obj) => obj.name.includes(val));
    console.log(filteredData);
    setFilteredContacts(filteredData);
  };

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
                  Add
                </Button>
              </div>
            </Stack>
            <ContactsSearch filterData={filterData} />
            {isLoading ? (
              <Box sx={{ width: "100%" }}>
                <LinearProgress />
              </Box>
            ) : (
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
              />
            )}
          </Stack>
          <ContactsAdd
            open={openModal}
            handleClose={handleClose}
            item={contactItem}
            isEdit={isEdit}
            fetchContacts={fetchContacts}
          />
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
