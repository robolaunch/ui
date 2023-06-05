import { useContext } from "react";
import { FunctionalContext } from "../contexts/FunctionalContext";
import { IuseFunctions } from "../interfaces/useFunctionsInterfaces";

const useFunctions = () => {
  const functions: IuseFunctions = useContext(FunctionalContext);

  return functions;
};

export default useFunctions;
