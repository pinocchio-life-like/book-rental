import { createContext, useContext, useState, useEffect } from "react";
import { Ability } from "@casl/ability";
import { defineAbilitiesFor } from "../utils/defineAbilities";
import useAuth from "../hooks/useAuth";

const AbilityContext = createContext();

export const AbilityProvider = ({ children }) => {
  const { user } = useAuth();
  const [ability, setAbility] = useState(new Ability());

  useEffect(() => {
    if (user) {
      setAbility(defineAbilitiesFor(user));
    }
  }, [user]);

  return (
    <AbilityContext.Provider value={ability}>
      {children}
    </AbilityContext.Provider>
  );
};

export const useAbility = () => useContext(AbilityContext);
