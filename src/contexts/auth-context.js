import { createContext, useContext, useEffect, useReducer, useRef } from "react";
import PropTypes from "prop-types";
import { signInApi, signUpApi, validateTokenApi, verifyUserApi, requestPasswordResetApi, forgotPasswordApi} from "../network/auth-api";

const HANDLERS = {
  INITIALIZE: "INITIALIZE",
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT",
  SIGN_UP: "SIGN_UP",
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  token: null,
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;
    return {
      ...state,
      ...(user
        ? {
            isAuthenticated: true,
            user,
          }
        : {}),
      isLoading: false,
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const { email, token } = action.payload;
    return {
      ...state,
      isAuthenticated: true,
      token: token,
      user: { email },
      isLoading: false,
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
    token: null,
    isLoading: false,
  }),
  [HANDLERS.SIGN_UP]: (state, action) => {
    const email = action.payload;
    return {
      ...state,
      isAuthenticated: true,
      user: { email },
      isLoading: false,
    };
  },
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

export const AuthContext = createContext(null);

export const getTokenCookies = () => {
  const name = "token=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");

  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i].trim();
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return null; // Return null if the token is not found
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);

  const initialize = async () => {

    // Prevent re-initialization
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    // Get the token from cookies
    const token = getTokenCookies();

    // If no token exists, dispatch to finish loading and exit
    if (!token) {
      dispatch({ type: HANDLERS.INITIALIZE }); // Finish loading if no token
      return;
    }

    try {
      const response = await validateTokenApi(token);

      if (response.data.type === "success") {
        const user = {
          name: response.data.value?.Username || null, // Using optional chaining
          email:
            response.data.value?.UserAttributes?.find((attr) => attr.Name === "email")?.Value ||
            null,
          emailVerified:
            response.data.value?.UserAttributes?.find((attr) => attr.Name === "email_verified")
              ?.Value === "true" || false,
          id:
            response.data.value?.UserAttributes?.find((attr) => attr.Name === "sub")?.Value || null,
        };
        dispatch({
          type: HANDLERS.INITIALIZE,
          payload: user,
        });
      } else {
        signOut();
        dispatch({ type: HANDLERS.INITIALIZE }); // Dispatch to finish loading
      }
    } catch (err) {
      signOut();
      console.error("Initialization failed:", err);
      dispatch({ type: HANDLERS.INITIALIZE }); // Dispatch to finish loading on error
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  const setTokenCookies = (token, expiresIn) => {
    try {
      const expiresDate = new Date(Date.now() + expiresIn * 1000);
      document.cookie = `token=${encodeURIComponent(
        token
      )}; expires=${expiresDate.toUTCString()}; path=/`;
    } catch (error) {
      console.error("Failed to save cookie:", error);
    }
  };

  const deleteCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };

  const signIn = async (email, password) => {
    try {
      const response = await signInApi({ email, password, username: email });
      const token = response.data.value.AuthenticationResult.AccessToken;
      const expiresIn = response.data.value.AuthenticationResult.ExpiresIn;

      setTokenCookies(token, expiresIn);
      dispatch({
        type: HANDLERS.SIGN_IN,
        payload: { email, token },
      });
    } catch (error) {
      console.error("Sign-in failed:", error);
      throw new Error("Please check your email and password");
    }
  };

  const signUp = async (email, password) => {
    try {
      const response = await signUpApi({ email, password, username: email });
      if (response?.data?.type === "success") {
        // After registration but before verification, only save the email in reducer
        dispatch({
          type: HANDLERS.SIGN_UP,
          payload: email,
        });
      }
    } catch (error) {
      console.error(error);

      if (error.response) {
        const { status, data } = error.response;

        const errorMessage =
          data?.error?.message || "An unexpected error occurred. Please try again.";

        switch (status) {
          case 400:
            throw new Error(errorMessage);
          default:
            throw new Error(errorMessage);
        }
      } else {
        throw new Error("Network error: Please check your connection and try again.");
      }
    }
  };

  const verifyUser = async (code) => {
    try {
      const response = await verifyUserApi({ code, email: state.user.email });
      if (response.data.type === "success") return true;
    } catch (error) {
      console.error(error);

      if (error.response) {
        const { status, data } = error.response;

        const errorMessage =
          data?.error?.message || "An unexpected error occurred. Please try again.";

        switch (status) {
          case 400:
            throw new Error(errorMessage);
          default:
            throw new Error(errorMessage);
        }
      } else {
        throw new Error("Network error: Please check your connection and try again.");
      }
    }
  };

  const sendPasswordReset = async (email) => {
    try {
      const response = await requestPasswordResetApi({ email });
      dispatch({
        type: HANDLERS.SIGN_UP,
        payload: email,
      });
      if (response.data.type === "success") return true;
    } catch (error) {
      console.error(error);

      if (error.response) {
        const { status, data } = error.response;

        const errorMessage =
          data?.error?.message || "An unexpected error occurred. Please try again.";

        switch (status) {
          case 400:
            throw new Error(errorMessage);
          default:
            throw new Error(errorMessage);
        }
      } else {
        throw new Error("Network error: Please check your connection and try again.");
      }
    }
  };

  const forgotPassword = async (email, newPassword, code) => {
    try {
      const response = await forgotPasswordApi({ email, newPassword, code });
      if (response.data.type === "success") return true;
    } catch (error) {
      console.error(error);
  
      if (error.response) {
        const { status, data } = error.response;
  
        const errorMessage =
          data?.message || "Incorrect Code. Please try again.";
  
        switch (status) {
          case 400:
            throw new Error(errorMessage); // Throws the specific error message for client errors
          default:
            throw new Error(errorMessage); // Throws a default error message for other status codes
        }
      } else {
        throw new Error("Network error: Please check your connection and try again.");
      }
    }
  };
  

  const signOut = () => {
    deleteCookie("token");
    dispatch({ type: HANDLERS.SIGN_OUT });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signUp,
        signOut,
        verifyUser,
        sendPasswordReset,
        forgotPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export const useAuthContext = () => useContext(AuthContext);
