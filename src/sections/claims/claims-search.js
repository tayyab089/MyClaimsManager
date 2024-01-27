import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { Card, InputAdornment, OutlinedInput, SvgIcon } from "@mui/material";

export const ClaimsSearch = ({ filterData }) => (
  <Card sx={{ p: 2 }}>
    <OutlinedInput
      onChange={(event) => filterData(event.target.value)}
      defaultValue=""
      fullWidth
      placeholder="Search Claim"
      startAdornment={
        <InputAdornment position="start">
          <SvgIcon color="action" fontSize="small">
            <MagnifyingGlassIcon />
          </SvgIcon>
        </InputAdornment>
      }
      sx={{ maxWidth: 500 }}
    />
  </Card>
);
