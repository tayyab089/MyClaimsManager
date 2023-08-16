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
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { getInitials } from "src/utils/get-initials";
import TrashIcon from "@heroicons/react/20/solid/TrashIcon";
import useConfirm from "src/hooks/use-confirm";

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
  } = props;

  // const [open, setOpen] = useState(false);
  const [Dialog, confirmDelete] = useConfirm(
    "Are you sure?",
    "The Contact will be permanently deleted from the database"
  );

  const handleDelete = async (event, contact) => {
    event.stopPropagation();
    const ans = await confirmDelete();
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
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Last Updated</TableCell>
                <TableCell>Delete</TableCell>
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
                    onClick={() => handleRowClick(contact)}
                    style={{ cursor: "pointer" }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(contact.id);
                          } else {
                            onDeselectOne?.(contact.id);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Avatar src={contact.avatar}>{getInitials(contact.name)}</Avatar>
                        <Typography variant="subtitle2">{contact.name}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {contact.email.map((email, ind) => (
                        <div key={ind}>{email.email}</div>
                      ))}
                    </TableCell>
                    <TableCell>
                      {contact.address.map((address, index) => {
                        return (
                          <React.Fragment key={index}>
                            {address?.street}
                            {address?.city && `, ${address?.city}`}
                            {address?.code && `, ${address?.code}`}
                          </React.Fragment>
                        );
                      })}
                    </TableCell>
                    <TableCell>
                      {contact.phNo?.map((number, ind) => (
                        <div key={ind}>{number.no}</div>
                      ))}
                    </TableCell>
                    <TableCell>{lastUpdated}</TableCell>
                    <TableCell>
                      <Button onClick={(event) => handleDelete(event, contact)}>
                        <SvgIcon fontSize="small">
                          <TrashIcon />
                        </SvgIcon>
                      </Button>
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
