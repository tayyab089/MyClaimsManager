import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react";
import Head from "next/head";
import { subDays, subHours } from "date-fns";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { ContactsTable } from "src/sections/contacts/contacts-table";
import { ContactsSearch } from "src/sections/contacts/contacts-search";
import { ContactsAdd } from "src/sections/contacts/contacs-add";
import { applyPagination } from "src/utils/apply-pagination";
import { getContactsApi } from "src/network/api";

const now = new Date();

const data = [
  {
    id: "5e887ac47eed253091be10cb",
    address: [
      {
        type: "work",
        city: "Cleveland",
        code: "US",
        zip: "2500",
        street: "2849 Fulton Street",
      },
    ],
    avatar: "/assets/avatars/avatar-carson-darrin.png",
    lastUpdated: subDays(subHours(now, 7), 1).getTime(),
    email: [
      { type: "work", email: "carson.darrin@devias.io" },
      { type: "work", email: "tayyab.darrin@devias.io" },
    ],
    name: "Carson Darrin",
    phNo: [
      { type: "work", no: "309-432-123" },
      { type: "work", no: "309-432-157" },
    ],
  },
  {
    id: "5e887b209c28ac3dd97f6db5",
    address: [
      {
        city: "Atlanta",
        country: "USA",
        state: "Georgia",
        street: "1865  Pleasant Hill Road",
      },
    ],
    avatar: "/assets/avatars/avatar-fran-perez.png",
    lastUpdated: subDays(subHours(now, 1), 2).getTime(),
    email: [{ type: "work", email: "carson.darrin@devias.io" }],
    name: "Fran Perez",
    phNo: [{ type: "work", no: "309-432-123" }],
  },
  {
    id: "5e887b7602bdbc4dbb234b27",
    address: [
      {
        city: "North Canton",
        country: "USA",
        state: "Ohio",
        street: "4894  Lakeland Park Drive",
      },
    ],
    avatar: "/assets/avatars/avatar-jie-yan-song.png",
    lastUpdated: subDays(subHours(now, 4), 2).getTime(),
    email: [
      { type: "work", email: "carson.darrin@devias.io" },
      { type: "work", email: "tayyab.darrin@devias.io" },
    ],
    name: "Jie Yan Song",
    phNo: [
      { type: "work", no: "309-432-123" },
      { type: "work", no: "309-432-157" },
    ],
  },
  {
    id: "5e86809283e28b96d2d38537",
    address: [
      {
        city: "Madrid",
        country: "Spain",
        name: "Anika Visser",
        street: "4158  Hedge Street",
      },
    ],
    avatar: "/assets/avatars/avatar-anika-visser.png",
    lastUpdated: subDays(subHours(now, 11), 2).getTime(),
    email: [{ type: "work", email: "carson.darrin@devias.io" }],
    name: "Anika Visser",
    phone: [
      { type: "work", no: "309-432-123" },
      { type: "work", no: "309-432-157" },
    ],
  },
  {
    id: "5e86805e2bafd54f66cc95c3",
    address: [
      {
        city: "San Diego",
        country: "USA",
        state: "California",
        street: "75247",
      },
    ],
    avatar: "/assets/avatars/avatar-miron-vitold.png",
    lastUpdated: subDays(subHours(now, 7), 3).getTime(),
    email: [
      { type: "work", email: "carson.darrin@devias.io" },
      { type: "work", email: "tayyab.darrin@devias.io" },
    ],
    name: "Miron Vitold",
    phNo: [
      { type: "work", no: "309-432-123" },
      { type: "work", no: "309-432-157" },
    ],
  },
  {
    id: "5e887a1fbefd7938eea9c981",
    address: [
      {
        city: "Berkeley",
        country: "USA",
        state: "California",
        street: "317 Angus Road",
      },
    ],
    avatar: "/assets/avatars/avatar-penjani-inyene.png",
    lastUpdated: subDays(subHours(now, 5), 4).getTime(),
    email: [{ type: "work", email: "carson.darrin@devias.io" }],
    name: "Penjani Inyene",
    phNo: [
      { type: "work", no: "309-432-123" },
      { type: "work", no: "309-432-157" },
    ],
  },
  {
    id: "5e887d0b3d090c1b8f162003",
    address: [
      {
        city: "Carson City",
        country: "USA",
        state: "Nevada",
        street: "2188  Armbrester Drive",
      },
    ],
    avatar: "/assets/avatars/avatar-omar-darboe.png",
    lastUpdated: subDays(subHours(now, 15), 4).getTime(),
    email: [{ type: "work", email: "carson.darrin@devias.io" }],
    name: "Omar Darobe",
    phNo: [
      { type: "work", no: "309-432-123" },
      { type: "work", no: "309-432-157" },
    ],
  },
  {
    id: "5e88792be2d4cfb4bf0971d9",
    address: [
      {
        city: "Los Angeles",
        country: "USA",
        state: "California",
        street: "1798  Hickory Ridge Drive",
      },
    ],
    avatar: "/assets/avatars/avatar-siegbert-gottfried.png",
    lastUpdated: subDays(subHours(now, 2), 5).getTime(),
    email: [
      { type: "work", email: "carson.darrin@devias.io" },
      { type: "work", email: "tayyab.darrin@devias.io" },
    ],
    name: "Siegbert Gottfried",
    phNo: [
      { type: "work", no: "309-432-123" },
      { type: "work", no: "309-432-157" },
    ],
  },
  {
    id: "5e8877da9a65442b11551975",
    address: [
      {
        city: "Murray",
        country: "USA",
        state: "Utah",
        street: "3934  Wildrose Lane",
      },
    ],
    avatar: "/assets/avatars/avatar-iulia-albu.png",
    lastUpdated: subDays(subHours(now, 8), 6).getTime(),
    email: [
      { type: "work", email: "carson.darrin@devias.io" },
      { type: "work", email: "tayyab.darrin@devias.io" },
    ],
    name: "Iulia Albu",
    phNo: [
      { type: "work", no: "309-432-123" },
      { type: "work", no: "309-432-157" },
    ],
  },
  {
    id: "5e8680e60cba5019c5ca6fda",
    address: [
      {
        city: "Salt Lake City",
        country: "USA",
        state: "Utah",
        street: "368 Lamberts Branch Road",
      },
    ],
    avatar: "/assets/avatars/avatar-nasimiyu-danai.png",
    lastUpdated: subDays(subHours(now, 1), 9).getTime(),
    email: [
      { type: "work", email: "carson.darrin@devias.io" },
      { type: "work", email: "tayyab.darrin@devias.io" },
    ],
    name: "Nasimiyu Danai",
    phNo: [
      { type: "work", no: "309-432-123" },
      { type: "work", no: "309-432-157" },
    ],
  },
];

const Page = () => {
  const [contactsData, setContactsData] = useState(data);
  const [contactItem, setContactItem] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const useCustomers = (page, rowsPerPage) => {
    return useMemo(() => {
      return applyPagination(contactsData, page, rowsPerPage);
    }, [contactsData, page, rowsPerPage]);
  };

  const useCustomerIds = (customers) => {
    return useMemo(() => {
      return customers.map((customer) => customer.id);
    }, [customers]);
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const contacts = useCustomers(page, rowsPerPage);
  const contactIds = useCustomerIds(contacts);
  const contactsSelection = useSelection(contactIds);
  const [openModal, setOpenModal] = useState(false);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  const fetchContacts = async () => {
    const response = await getContactsApi();
    setContactsData(response.data);
  };

  // Modal Functions ----------------------------------------------
  const handleRowClick = (item) => {
    setContactItem(item);
    setIsEdit(true);
  };

  const handleClose = () => {
    setIsEdit(false);
    setContactItem(null);
    setOpenModal(false);
  };

  const handleOpen = () => {
    setOpenModal(true);
  };

  useEffect(() => {
    if (isEdit) {
      setOpenModal(true);
    }
  }, [isEdit]);

  // =================================================================

  useEffect(() => {
    fetchContacts();
  }, []);

  // useEffect(() => {
  //   console.log(contactsData);
  // }, [contactsData]);

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
            <ContactsSearch />
            <ContactsTable
              count={contactsData.length}
              items={contacts}
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
            />
          </Stack>
          <ContactsAdd
            open={openModal}
            handleClose={handleClose}
            item={contactItem}
            isEdit={isEdit}
          />
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
