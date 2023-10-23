import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { Card, InputAdornment, OutlinedInput, SvgIcon } from "@mui/material";

export const ContactsSearch = ({ searchTerm, setSearchTerm, filterData }) => (
  <Card sx={{ p: 2 }}>
    <OutlinedInput
      onChange={(event) => filterData(event.target.value)}
      fullWidth
      placeholder="Search Contact"
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
