import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { useAuthContext } from "src/contexts/auth-context";
import { Box, CircularProgress, Typography } from '@mui/material';


export const AuthGuard = (props) => {
  const { children } = props;
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuthContext();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      // Check if we are still loading
      if (isLoading) return;

      if (!isAuthenticated) {
        await router.replace({
          pathname: "/auth/login",
          query: router.asPath !== "/" ? { continueUrl: router.asPath } : undefined,
        });
      } else {
        setChecked(true);
      }
    };

    // Run check authentication whenever isAuthenticated or isLoading changes
    checkAuthentication();
  }, [isAuthenticated, isLoading, router]); // Remove router.isReady to avoid redundant checks

  if (!checked || isLoading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        bgcolor="#f8f9fa" // Tailwind bg-gray-50 equivalent
      >
        <Typography variant="h4" component="h1" color="primary" gutterBottom>
          My Claims Manager
        </Typography>
        <CircularProgress size={60} color="primary" />
        <Typography variant="h6" color="textSecondary" marginTop={2}>
          Loading...
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Please wait while we process your request.
        </Typography>
      </Box>
    );
  } // Render nothing while loading or checking authentication

  // If we reach here, the user is authenticated
  return children;
};

AuthGuard.propTypes = {
  children: PropTypes.node,
};
