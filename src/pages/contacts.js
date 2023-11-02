import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react";
import Head from "next/head";
import { subDays, subHours } from "date-fns";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
  LinearProgress,
  Alert,
  Collapse,
} from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { ContactsTable } from "src/sections/contacts/contacts-table";
import { ContactsSearch } from "src/sections/contacts/contacts-search";
import { ContactsAdd } from "src/sections/contacts/contacs-add";
import { ContactsView } from "src/sections/contacts/contacts-view";
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
  const [openViewModal, setOpenViewModal] = useState(false);

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
        console.log(response.data.data);
        response.data.data.sort((a, b) => {
          const extractLastName = (fullName) => {
            const nameParts = fullName.split(" ");
            return nameParts.length > 1 ? nameParts[nameParts.length - 1] : fullName;
          };
          const lastNameA = extractLastName(a.name).toUpperCase();
          const lastNameB = extractLastName(b.name).toUpperCase();

          if (lastNameA < lastNameB) {
            return -1; // a should come before b
          } else if (lastNameA > lastNameB) {
            return 1; // a should come after b
          } else {
            return 0; // names are equal
          }
        });
        setContactsData(response.data.data);
      } else {
        // alert(`${response.data.message}`);
        setAlertData({ open: true, message: response.data.message, type: response.data.type });
        setTimeout(() => {
          setAlertData({ open: false, message: "", type: "" });
        }, 3000);
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
        // alert(`${response.data.message}`);
        setAlertData({ open: true, message: response.data.message, type: response.data.type });
        setTimeout(() => {
          setAlertData({ open: false, message: "", type: "" });
        }, 3000);
      } else {
        // alert(`${response.data.message}`);
        setAlertData({ open: true, message: response.data.message, type: response.data.type });
        setTimeout(() => {
          setAlertData({ open: false, message: "", type: "" });
        }, 3000);
      }
      fetchContacts();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Edit Modal Functions ----------------------------------------------
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

  // View Modal Functions ----------------------------------------------
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

  // Search Functions and State-------------------------------------
  const [searchValue, setSearchValue] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);

  const filterData = (val) => {
    const lowercaseVal = val.toLowerCase();
    const filteredData = contacts.filter((obj) => obj.name.toLowerCase().includes(lowercaseVal));
    console.log(filteredData);
    setSearchValue(val);
    setFilteredContacts(filteredData);
  };

  const [alertData, setAlertData] = useState({
    open: false,
    message: "",
    type: "",
  });

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
            fetchContacts={fetchContacts}
            setAlertData={setAlertData}
          />
          <ContactsView
            open={openViewModal}
            handleClose={handleViewClose}
            item={contactItem}
            handleViewEdit={handleViewEdit}
          />
        </Container>
        <div style={{ position: "absolute", top: 10, right: 10, zIndex: 9999 }}>
          <Collapse in={alertData.open}>
            <Alert
              action={
                <SvgIcon
                  fontSize="small"
                  onClick={() => {
                    setAlertData({ open: false, message: "", type: "" });
                  }}
                  style={{ marginTop: 4.5, cursor: "pointer" }}
                >
                  <XMarkIcon fontSize="inherit" />
                </SvgIcon>
              }
              sx={{ mb: 2 }}
              severity={alertData.type}
            >
              {alertData.message}
            </Alert>
          </Collapse>
        </div>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
