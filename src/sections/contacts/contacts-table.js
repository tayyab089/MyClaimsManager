import React from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Avatar,
  Box,
  Card,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Button,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Scrollbar } from "src/components/scrollbar";
import { getInitials } from "src/utils/get-initials";
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
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    selected = [],
    handleRowClick,
    deleteContact,
    viewContact,
  } = props;

  // State Variables =====================================================
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const [Dialog, confirmDelete] = useConfirm();

  // Delete Function =====================================================
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

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 360 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ width: "75%" }}>Name</TableCell>
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
                  <TableRow hover key={contact.id} selected={isSelected}>
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
