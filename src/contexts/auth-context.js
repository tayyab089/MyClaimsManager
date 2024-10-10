import { createContext, useContext, useEffect, useReducer, useRef } from "react";
import PropTypes from "prop-types";
import { signInApi, signUpApi, validateTokenApi, verifyUserApi } from "../network/auth-api";

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
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;
    return {
      ...state,
      ...(user
        ? {
            isAuthenticated: true,
            isLoading: false,
            user,
          }
        : {
            isLoading: false,
          }),
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;
    return {
      ...state,
      isAuthenticated: true,
      isLoading: false,
      user,
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
  [HANDLERS.SIGN_UP]: (state, action) => {
    const email = action.payload;
    return {
      ...state,
      isAuthenticated: true,
      isLoading: false,
      user: { email },
    };
  },
  [HANDLERS.VERIFY]: (state, action) => {
    const user = action.payload;
    return {
      ...state,
      isAuthenticated: true,
      isLoading: false,
      user,
    };
  },
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);

  const initialize = async () => {
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    try {
      const response = await validateTokenApi();
      if (response?.data?.user) {
        dispatch({
          type: HANDLERS.INITIALIZE,
          payload: response.data.user,
        });
      } else {
        dispatch({ type: HANDLERS.INITIALIZE });
      }
    } catch (err) {
      console.error("Initialization failed:", err);
      dispatch({ type: HANDLERS.INITIALIZE });
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  const signIn = async (email, password) => {
    try {
      const response = await signInApi({ email, password, username: email });
      const user = response.data.user;
      window.sessionStorage.setItem("authenticated", "true");
      window.sessionStorage.setItem("user", JSON.stringify(user));
      dispatch({
        type: HANDLERS.SIGN_IN,
        payload: user,
      });
    } catch (error) {
      console.error("Sign-in failed:", error);
      throw new Error("Please check your email and password");
    }
  };

  const signUp = async (email, password) => {
    try {
      const response = await signUpApi({ email, password, username: email });
      if (response?.data?.type == "success") {
        // After registeration but before verification, only save the email in reduc
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
      if (response?.data?.user) {
        const user = response.data.user;
        // Store authentication state in session
        window.sessionStorage.setItem("authenticated", "true");
        window.sessionStorage.setItem("user", JSON.stringify(user));

        // Dispatch sign-up action with user data
        dispatch({
          type: HANDLERS.VERIFY,
          payload: user,
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

  const signOut = () => {
    window.sessionStorage.removeItem("authenticated");
    window.sessionStorage.removeItem("user");
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
