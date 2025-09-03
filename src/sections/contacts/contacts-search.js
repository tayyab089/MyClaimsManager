import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { Button, Card, InputAdornment, OutlinedInput, SvgIcon } from "@mui/material";
import { useState } from "react";

export const ContactsSearch = ({ handleSearchClick }) => {
  const [searchTerm, setSearchTerm] = useState("")
  return (
    <Card sx={{ p: 2 }}>
      <OutlinedInput
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        fullWidth
        placeholder="Search Contact By Name"
        startAdornment={
          <InputAdornment position="start">
            <SvgIcon color="action" fontSize="small">
              <MagnifyingGlassIcon />
            </SvgIcon>
          </InputAdornment>
        }
        sx={{ maxWidth: 500 }}
      />
      <Button variant="contained" onClick={() => {
        handleSearchClick(searchTerm)
      }}>Search</Button>
    </Card>
  )
};
