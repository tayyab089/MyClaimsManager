import PropTypes from "prop-types";
import { useRouter } from "next/router";
import {
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
import { Scrollbar } from "src/components/scrollbar";
import { styled } from "@mui/material/styles";
import useConfirm from "src/hooks/use-confirm";
import { deleteClaimApi } from "src/network/claims-api";
import { useDispatch } from "react-redux";
import { fetchClaims } from "src/store/reducers/claims/thunks";

const ButtonsContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

export const ClaimsTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    deleteClaim,
    handleEditModalOpen,
    selected = [],
  } = props;

  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const dispatch = useDispatch();
  const router = useRouter();

  // Delete Function =====================================================
  const [Dialog, confirmDelete] = useConfirm();

  const handleDelete = async (claim) => {
    const customTitle = "Confirm Delete";
    const customMessage = `Are you sure you want to delete claim: <strong> ${claim.fileNo} </strong> along with all its data? Please note that this process is not reversible.`;

    const ans = await confirmDelete(customTitle, customMessage);
    if (ans) {
      deleteClaim(claim);
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
                <TableCell style={{ width: "15%" }}>File No</TableCell>
                <TableCell style={{ width: "25%" }}>Insured</TableCell>
                <TableCell style={{ width: "25%" }}>Insurance Co.</TableCell>
                <TableCell style={{ width: "10%" }}>Age</TableCell>
                <TableCell style={{ width: "25%" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((claim) => {
                const isSelected = selected.includes(claim.id);
                const timeDiff = new Date() - new Date(claim.lossDate);
                const age = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

                return (
                  <TableRow
                    hover
                    key={claim.fileNo}
                    selected={isSelected}
                    style={{ cursor: "pointer" }}
                  >
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Typography variant="subtitle2">{claim.fileNo}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {claim.insured.map((insured, ind) => (
                        <div key={ind}>{insured.name}</div>
                      ))}
                    </TableCell>
                    <TableCell>{claim?.insurance?.company}</TableCell>
                    <TableCell> {age} Days</TableCell>
                    <TableCell>
                      <ButtonsContainer>
                        <Button
                          onClick={() => {
                            router.push({
                              pathname: "/claim",
                              query: { fileNo: claim.fileNo },
                            });
                          }}
                          variant={!lgUp ? "text" : "contained"}
                          size="small"
                          style={{ marginRight: 10 }}
                        >
                          View
                        </Button>
                        <Button
                          onClick={() => handleEditModalOpen(claim)}
                          variant={!lgUp ? "text" : "outlined"}
                          size="small"
                          color="secondary"
                          style={{ marginRight: 10 }}
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDelete(claim)}
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
      <Dialog />
    </Card>
  );
};

ClaimsTable.propTypes = {
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
