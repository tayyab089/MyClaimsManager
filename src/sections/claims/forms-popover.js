import PropTypes from "prop-types";
import { Box, Divider, MenuItem, MenuList, Popover, Typography } from "@mui/material";
import { useRouter } from "next/router";

export const FormsPopover = (props) => {
  const { anchorEl, onClose, open, claimFileNo } = props;
  const router = useRouter();

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "left",
        vertical: "bottom",
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 200 } }}
    >
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: "8px",
          "& > *": {
            borderRadius: 1,
          },
        }}
      >
        <MenuItem
          onClick={() =>
            router.push({
              pathname: "/forms",
              query: { formName: "ProofOfLoss", fileNo: claimFileNo },
            })
          }
        >
          Proof of Loss
        </MenuItem>
        <MenuItem
          onClick={() =>
            router.push({
              pathname: "/forms",
              query: { formName: "Regulation10", fileNo: claimFileNo },
            })
          }
        >
          Regulation 10
        </MenuItem>
        <MenuItem
          onClick={() =>
            router.push({
              pathname: "/forms",
              query: { formName: "SubrogationReceipt", fileNo: claimFileNo },
            })
          }
        >
          Subrogation Recipt
        </MenuItem>
      </MenuList>
    </Popover>
  );
};

FormsPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
};
