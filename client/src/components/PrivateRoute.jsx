import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AbilityContext } from "../contexts/AbilityContext";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ ability, subject, children }) => {
  const { token } = useAuth();
  const abilityContext = useContext(AbilityContext);

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (!abilityContext.can(ability, subject)) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default PrivateRoute;
