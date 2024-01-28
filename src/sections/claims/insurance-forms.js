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
  Box,
  LinearProgress,
  useMediaQuery,
} from "@mui/material";
import { FormsPopover } from "./forms-popover";
import { usePopover } from "src/hooks/use-popover";
import { useDispatch } from "react-redux";
import { deleteFormApi } from "src/network/forms-api";
import useConfirm from "src/hooks/use-confirm";
import { setAlertData } from "src/store/reducers/alert/thunks";
import { deleteFormFromStore } from "src/store/reducers/forms/thunks";

import { ButtonsContainer } from "src/components/styled-components";
import { useRouter } from "next/router";

export const InsuraceForms = ({ item, formsData, isFormLoading }) => {
  // Style Objects =============================
  const style = {
    boxShadow: 24,
    p: 1,
    overflow: "auto",
    maxHeight: "90%",
    padding: "20px",
  };

  const router = useRouter();

  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const formPopover = usePopover();

  const dispatch = useDispatch();

  // Delete Function =====================================================
  const [Dialog, confirmDelete] = useConfirm();

  const handleDelete = async (form) => {
    const customTitle = "Confirm Delete";
    const customMessage = `Are you sure you want to delete form: <strong> ${form?.type} </strong> along with all its data? Please note that this process is not reversible.`;

    const ans = await confirmDelete(customTitle, customMessage);
    if (ans) {
      const response = await deleteFormApi({ form: form });
      if (response && response.data.type !== "error") {
        dispatch(
          setAlertData({ open: true, message: response.data.message, type: response.data.type })
        );
        dispatch(deleteFormFromStore(form));
      } else {
        dispatch(
          setAlertData({ open: true, message: response.data.message, type: response.data.type })
        );
      }
    } else {
      console.log("dont delete");
    }
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

      {isFormLoading ? (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="insurance forms table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Updated</TableCell>
                <TableCell>Created By</TableCell>
                <TableCell style={{ width: "15%" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {formsData?.map((form, index) => (
                <TableRow key={index}>
                  <TableCell>{form?.name}</TableCell>
                  <TableCell>{new Date(form?.lastUpdated)?.toLocaleString()}</TableCell>
                  <TableCell>Howie Guttman</TableCell>
                  <TableCell>
                    <ButtonsContainer>
                      <Button
                        onClick={() =>
                          router.push({
                            pathname: "/forms",
                            query: {
                              formType: form?.type,
                              fileNo: form?.claimfileNo,
                              isEdit: true,
                              formId: form?.formId,
                            },
                          })
                        }
                        color="primary"
                        variant={!lgUp ? "text" : "contained"}
                        size="small"
                        style={{ marginRight: 5 }}
                      >
                        View
                      </Button>
                      <Button
                        onClick={() => handleDelete(form)}
                        color="error"
                        variant={!lgUp ? "text" : "outlined"}
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
      )}
      <Dialog />
    </Stack>
  );
};
