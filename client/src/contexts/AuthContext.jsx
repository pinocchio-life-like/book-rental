import React, { createContext, useState, useEffect } from "react";
import {
  setAuthToken,
  login as loginService,
  signup as signupService,
} from "../services/api";
import { defineAbilitiesFor } from "../utils/defineAbilities";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: localStorage.getItem("token"),
    user: null,
  });

  useEffect(() => {
    if (authState.token) {
      setAuthToken(authState.token);
      // Fetch user info if needed
    }
  }, [authState.token]);

  useEffect(() => {
    if (authState.user) {
      const ability = defineAbilitiesFor(authState.user);
      setAuthState((prevState) => ({ ...prevState, ability }));
    }
  }, [authState.user]);

  const login = async (email, password) => {
    const { data } = await loginService(email, password);
    localStorage.setItem("token", data.token);
    setAuthToken(data.token);
    setAuthState({ token: data.token, user: data.user });
  };

  const signup = async (name, email, password) => {
    const { data } = await signupService(name, email, password);
    localStorage.setItem("token", data.token);
    setAuthState({ token: data.token, user: data.user });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuthState({ token: null, user: null });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
