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
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";

export const ClaimsTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    selected = [],
  } = props;

  const router = useRouter();

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>File No</TableCell>
                <TableCell>Insured</TableCell>
                <TableCell>Insurance Co.</TableCell>
                <TableCell>Age</TableCell>
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
                    onClick={() => {
                      router.push({
                        pathname: "/claim",
                        query: { data: JSON.stringify(claim) },
                      });
                    }}
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
