import React, { useState } from "react";
import {
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Button,
  Paper,
  Stack,
} from "@mui/material";
import { FormsPopover } from "./forms-popover";
import { usePopover } from "src/hooks/use-popover";
import { useSelector } from "react-redux";
import { deleteFormApi } from "src/network/forms-api";

import { styled } from "@mui/material/styles";

const ButtonsContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

export const InsuraceForms = ({ item, formsData }) => {
  // Style Objects =============================
  const style = {
    boxShadow: 24,
    p: 1,
    overflow: "auto",
    maxHeight: "90%",
    padding: "20px",
  };

  const formPopover = usePopover();

  console.log(item?.forms, formsData);
  // const [formsArray, setFormsArray] = useState([{}]);

  const handleDelete = async (form) => {
    const response = await deleteFormApi({ form: form });
  };

  return (
    <Stack sx={style} spacing={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={4}>
        <Typography variant="h6">Insurance Forms</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={formPopover.handleOpen}
          ref={formPopover.anchorRef}
        >
          New Form
        </Button>
        <FormsPopover
          claimFileNo={item?.fileNo}
          anchorEl={formPopover.anchorRef.current}
          open={formPopover.open}
          onClose={formPopover.handleClose}
        />
      </Stack>

      <TableContainer component={Paper}>
        <Table aria-label="insurance forms table">
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>Updated</TableCell>
              <TableCell>Created By</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {formsData?.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item?.type}</TableCell>
                <TableCell>{new Date(item?.lastUpdated)?.toLocaleString()}</TableCell>
                <TableCell>Howie Guttman</TableCell>
                <TableCell>
                  <ButtonsContainer>
                    <Button
                      onClick={() => handleDelete(item)}
                      color="primary"
                      variant="contained"
                      size="small"
                    >
                      View
                    </Button>
                    <Button
                      onClick={() => handleDelete(item)}
                      color="error"
                      variant="contained"
                      size="small"
                    >
                      Delete
                    </Button>
                  </ButtonsContainer>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};
