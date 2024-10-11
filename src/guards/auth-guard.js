import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useAuthContext } from 'src/contexts/auth-context';

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
        console.log('Not authenticated, redirecting');
        await router.replace({
          pathname: '/auth/login',
          query: router.asPath !== '/' ? { continueUrl: router.asPath } : undefined
        });
      } else {
        setChecked(true);
      }
    };

    // Run check authentication whenever isAuthenticated or isLoading changes
    checkAuthentication();
  }, [isAuthenticated, isLoading, router]); // Remove router.isReady to avoid redundant checks

  if (!checked || isLoading) {
    return null; // Render nothing while loading or checking authentication
  }

  // If we reach here, the user is authenticated
  return children;
};

AuthGuard.propTypes = {
  children: PropTypes.node,
};

