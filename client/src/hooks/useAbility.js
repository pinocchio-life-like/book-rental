import { useContext } from "react";
import { AbilityContext } from "../contexts/AbilityContext";

const useAbility = () => useContext(AbilityContext);

export default useAbility;
