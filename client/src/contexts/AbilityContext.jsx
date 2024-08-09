import { createContext, useState, useEffect } from "react";
import { Ability } from "@casl/ability";
import { defineAbilitiesFor } from "../utils/defineAbilities";
import useAuth from "../hooks/useAuth";

export const AbilityContext = createContext();

export const AbilityProvider = ({ children }) => {
  const { user } = useAuth();
  const [ability, setAbility] = useState(new Ability());

  useEffect(() => {
    if (user) {
      setAbility(defineAbilitiesFor(user));
    } else {
      setAbility(new Ability()); // Provide a default or empty ability
    }
  }, [user]);

  return (
    <AbilityContext.Provider value={ability}>
      {children}
    </AbilityContext.Provider>
  );
};
