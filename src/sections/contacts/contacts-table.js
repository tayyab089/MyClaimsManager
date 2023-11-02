import React, { useState } from "react";
import PropTypes from "prop-types";
import { format, parseISO } from "date-fns";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  SvgIcon,
  Button,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Scrollbar } from "src/components/scrollbar";
import { getInitials } from "src/utils/get-initials";
import TrashIcon from "@heroicons/react/20/solid/TrashIcon";
import useConfirm from "src/hooks/use-confirm";

const ButtonsContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

export const ContactsTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = [],
    handleRowClick,
    deleteContact,
    viewContact,
  } = props;

  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  // const [open, setOpen] = useState(false);
  const [Dialog, confirmDelete] = useConfirm();

  const handleDelete = async (event, contact) => {
    event.stopPropagation();
    const customTitle = "Confirm Delete";
    const customMessage = `Are you sure you want to delete contact: <strong> ${contact.name} </strong> along with their phone numbers, emails and locations? Please note that this process is not reversible.`;

    const ans = await confirmDelete(customTitle, customMessage);
    if (ans) {
      deleteContact(contact);
    } else {
      console.log("dont delete");
    }
  };
  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items.length > 0 && selected.length === items.length;

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 360 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ width: "75%" }}>Name</TableCell>
                {/* <TableCell>View</TableCell>
                <TableCell>Edit</TableCell> */}
                <TableCell style={{ width: "25%" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((contact) => {
                const isSelected = selected.includes(contact.id);
                const lastUpdated = contact.lastUpdated
                  ? format(new Date(contact.lastUpdated), "dd/MM/yyyy")
                  : "N/A";

                return (
                  <TableRow
                    hover
                    key={contact.id}
                    selected={isSelected}
                    // style={{ cursor: "pointer" }}
                  >
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Avatar src={contact.avatar}>{getInitials(contact.name)}</Avatar>
                        <Typography variant="subtitle2">{contact.name}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <ButtonsContainer>
                        <Button
                          onClick={() => viewContact(contact)}
                          variant={!lgUp ? "text" : "contained"}
                          size="small"
                          style={{ marginRight: 10 }}
                        >
                          View
                        </Button>
                        <Button
                          onClick={() => handleRowClick(contact)}
                          variant={!lgUp ? "text" : "outlined"}
                          size="small"
                          color="secondary"
                          style={{ marginRight: 10 }}
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={(event) => handleDelete(event, contact)}
                          color="error"
                          variant={!lgUp ? "text" : "outlined"}
                          size="small"
                          style={{ marginRight: 10 }}
                        >
                          Delete
                        </Button>
                      </ButtonsContainer>
                    </TableCell>
                  </TableRow>
                );
              })}
              <Dialog />
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>

    //  <Card>
    //   <Scrollbar>
    //     <Box sx={{ minWidth: 800 }}>
    //       <Table>
    //         <TableHead>
    //           <TableRow>
    //             {/* <TableCell padding="checkbox">
    //               <Checkbox
    //                 checked={selectedAll}
    //                 indeterminate={selectedSome}
    //                 onChange={(event) => {
    //                   if (event.target.checked) {
    //                     onSelectAll?.();
    //                   } else {
    //                     onDeselectAll?.();
    //                   }
    //                 }}
    //               />
    //             </TableCell> */}
    //             <TableCell>Name</TableCell>
    //             <TableCell>Email</TableCell>
    //             <TableCell>Location</TableCell>
    //             <TableCell>Phone</TableCell>
    //             {/* <TableCell>Last Updated</TableCell> */}
    //             <TableCell>Delete</TableCell>
    //           </TableRow>
    //         </TableHead>
    //         <TableBody>
    //           {items.map((contact) => {
    //             const isSelected = selected.includes(contact.id);
    //             const lastUpdated = contact.lastUpdated
    //               ? format(new Date(contact.lastUpdated), "dd/MM/yyyy")
    //               : "N/A";

    //             return (
    //               <TableRow
    //                 hover
    //                 key={contact.id}
    //                 selected={isSelected}
    //                 onClick={() => handleRowClick(contact)}
    //                 style={{ cursor: "pointer" }}
    //               >
    //                 {/* <TableCell padding="checkbox">
    //                   <Checkbox
    //                     checked={isSelected}
    //                     onChange={(event) => {
    //                       if (event.target.checked) {
    //                         onSelectOne?.(contact.id);
    //                       } else {
    //                         onDeselectOne?.(contact.id);
    //                       }
    //                     }}
    //                   />
    //                 </TableCell> */}
    //                 <TableCell>
    //                   <Stack alignItems="center" direction="row" spacing={2}>
    //                     <Avatar src={contact.avatar}>{getInitials(contact.name)}</Avatar>
    //                     <Typography variant="subtitle2">{contact.name}</Typography>
    //                   </Stack>
    //                 </TableCell>
    //                 <TableCell>
    //                   {contact.email.map((email, ind) => (
    //                     <li key={ind}>{email.email}</li>
    //                   ))}
    //                 </TableCell>
    //                 <TableCell>
    //                   {contact.address.map((address, index) => {
    //                     return (
    //                       <li key={index}>
    //                         {address?.street}
    //                         {address?.city && `, ${address?.city}`}
    //                         {address?.code && `, ${address?.code}`}
    //                       </li>
    //                     );
    //                   })}
    //                 </TableCell>
    //                 <TableCell>
    //                   <ul>
    //                     {contact.phNo?.map((number, ind) => (
    //                       <li key={ind}>{number.no}</li>
    //                     ))}
    //                   </ul>
    //                 </TableCell>
    //                 {/* <TableCell>{lastUpdated}</TableCell> */}
    //                 <TableCell>
    //                   <Button onClick={(event) => handleDelete(event, contact)}>
    //                     <SvgIcon fontSize="small">
    //                       <TrashIcon color="red" />
    //                     </SvgIcon>
    //                   </Button>
    //                 </TableCell>
    //               </TableRow>
    //             );
    //           })}
    //           <Dialog />
    //         </TableBody>
    //       </Table>
    //     </Box>
    //   </Scrollbar>
    //   <TablePagination
    //     component="div"
    //     count={count}
    //     onPageChange={onPageChange}
    //     onRowsPerPageChange={onRowsPerPageChange}
    //     page={page}
    //     rowsPerPage={rowsPerPage}
    //     rowsPerPageOptions={[5, 10, 25]}
    //   />
    // </Card>
  );
};

ContactsTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
};
