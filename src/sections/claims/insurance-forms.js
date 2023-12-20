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

export const InsuraceForms = ({ item }) => {
  // Style Objects =============================
  const style = {
    boxShadow: 24,
    p: 1,
    overflow: "auto",
    maxHeight: "90%",
    padding: "20px",
  };

  const formPopover = usePopover();

  console.log(item?.forms);
  // const [formsArray, setFormsArray] = useState([{}]);

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
            </TableRow>
          </TableHead>
          <TableBody>
            {item?.forms?.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item?.type}</TableCell>
                <TableCell>{item?.updated?.toLocaleString()}</TableCell>
                <TableCell>{item?.createdBy}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};
