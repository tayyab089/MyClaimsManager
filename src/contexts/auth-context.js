import { createContext, useContext, useEffect, useReducer, useRef } from "react";
import PropTypes from "prop-types";
import { signInApi, signUpApi, validateTokenApi } from "../network/auth-api";

const HANDLERS = {
  INITIALIZE: "INITIALIZE",
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT",
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
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
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
      const response = await validateTokenApi(); // Call API to validate token
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
      const response = await signInApi(email, password); // Call API to sign in
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

  const signUp = async (email, name, password) => {
    try {
      await signUpApi({ email, name, password }); // Call API to sign up
    } catch (error) {
      console.error("Sign-up failed:", error);
      throw new Error("Sign-up failed");
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
