import { createContext, useState, useEffect } from "react";
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
    user: JSON.parse(localStorage.getItem("user")), // Load user from local storage
  });

  useEffect(() => {
    if (authState.token) {
      setAuthToken(authState.token);
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
    localStorage.setItem("user", JSON.stringify(data.user)); // Save user data in local storage
    setAuthToken(data.token);
    setAuthState({ token: data.token, user: data.user });
  };

  const signup = async (name, email, password, location, phone) => {
    const { data } = await signupService(
      name,
      email,
      password,
      location,
      phone
    );
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user)); // Save user data in local storage
    setAuthState({ token: data.token, user: data.user });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user"); // Remove user data from local storage
    setAuthState({ token: null, user: null });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
