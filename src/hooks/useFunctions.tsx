import { useContext } from "react";
import { FunctionsContext } from "../contexts/FunctionsContext";
import { IuseFunctions } from "../interfaces/useFunctionsInterfaces";

const useFunctions = () => {
  const functions: IuseFunctions = useContext(FunctionsContext);

  return functions;
};

export default useFunctions;
