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
      PaperProps={{ sx: { width: 300 } }}
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
              query: { formType: "CompensationAgreement", fileNo: claimFileNo, isEdit: false },
            })
          }
        >
          Compensation Agreement
        </MenuItem>
        <MenuItem
          onClick={() =>
            router.push({
              pathname: "/forms",
              query: { formType: "CancellationNotice", fileNo: claimFileNo, isEdit: false },
            })
          }
        >
          Cancellation Notice
        </MenuItem>
        <MenuItem
          onClick={() =>
            router.push({
              pathname: "/forms",
              query: { formType: "DisclosureStatement", fileNo: claimFileNo, isEdit: false },
            })
          }
        >
          Disclosure Statement
        </MenuItem>
        <MenuItem
          onClick={() =>
            router.push({
              pathname: "/forms",
              query: { formType: "ProofOfLoss", fileNo: claimFileNo, isEdit: false },
            })
          }
        >
          Proof of Loss
        </MenuItem>
        <MenuItem
          onClick={() =>
            router.push({
              pathname: "/forms",
              query: { formType: "Regulation10", fileNo: claimFileNo, isEdit: false },
            })
          }
        >
          Regulation 10
        </MenuItem>
        <MenuItem
          onClick={() =>
            router.push({
              pathname: "/forms",
              query: { formType: "SubrogationReceipt", fileNo: claimFileNo, isEdit: false },
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
