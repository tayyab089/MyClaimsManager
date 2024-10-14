import PropTypes from "prop-types";
import BellIcon from "@heroicons/react/24/solid/BellIcon";
import UsersIcon from "@heroicons/react/24/solid/UsersIcon";
import Bars3Icon from "@heroicons/react/24/solid/Bars3Icon";
import HomeIcon from "@heroicons/react/24/solid/HomeIcon";
import ChevronLeftIcon from "@heroicons/react/20/solid/ChevronLeftIcon";
import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import {
  Avatar,
  Button,
  Badge,
  Box,
  IconButton,
  Stack,
  SvgIcon,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { usePopover } from "src/hooks/use-popover";
import { AccountPopover } from "./account-popover";
import { useRouter } from "next/router";
import { getInitials } from "src/utils/get-initials";
import { useContext } from "react";
import { AuthContext } from "src/contexts/auth-context";
import useConfirm from "src/hooks/use-confirm";

const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;

export const TopNav = (props) => {
  const { onNavOpen } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const accountPopover = usePopover();
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [Dialog, confirmDialog] = useConfirm();
  const is_home =
    router.pathname === "/" || router.pathname === "/claims" || router.pathname === "/contacts";
  const is_forms = router.pathname === "/forms";

  const handleClose = async () => {
    router.back();
  };

  return (
    <>
      <Box
        component="header"
        sx={{
          backdropFilter: "blur(6px)",
          backgroundColor: (theme) => alpha(theme.palette.background.default, 0.8),
          position: "sticky",
          left: {
            lg: `${SIDE_NAV_WIDTH}px`,
          },
          top: 0,
          width: {
            lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`,
          },
          zIndex: (theme) => theme.zIndex.appBar,
        }}
      >
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={2}
          sx={{
            minHeight: TOP_NAV_HEIGHT,
            px: 2,
          }}
        >
          <Stack alignItems="center" direction="row" spacing={2}>
            {!lgUp && (
              <IconButton onClick={onNavOpen}>
                <SvgIcon fontSize="small">
                  <Bars3Icon />
                </SvgIcon>
              </IconButton>
            )}
            {!is_home && (
              <Button
                startIcon={
                  <SvgIcon fontSize="small">
                    <ChevronLeftIcon />
                  </SvgIcon>
                }
                variant="contained"
                color="primary"
                size="small"
                onClick={() => handleClose()}
              >
                Back
              </Button>
            )}
          </Stack>
          <Stack alignItems="center" direction="row" spacing={2}>
            <Tooltip title="Home">
              <IconButton onClick={() => router.push("/")}>
                <SvgIcon fontSize="small">
                  <HomeIcon />
                </SvgIcon>
              </IconButton>
            </Tooltip>
            {/* <Tooltip title="Notifications">
              <IconButton>
                <Badge badgeContent={4} color="success" variant="dot">
                  <SvgIcon fontSize="small">
                    <BellIcon />
                  </SvgIcon>
                </Badge>
              </IconButton>
            </Tooltip> */}
            <Avatar
              onClick={accountPopover.handleOpen}
              ref={accountPopover.anchorRef}
              sx={{
                cursor: "pointer",
                height: 40,
                width: 40,
              }}
              src=""
            >
              {getInitials(user?.email)}
            </Avatar>
          </Stack>
        </Stack>
      </Box>
      <AccountPopover
        anchorEl={accountPopover.anchorRef.current}
        open={accountPopover.open}
        onClose={accountPopover.handleClose}
      />
      <Dialog />
    </>
  );
};

TopNav.propTypes = {
  onNavOpen: PropTypes.func,
};
