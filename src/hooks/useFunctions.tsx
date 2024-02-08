import { IuseFunctions } from "../interfaces/hook/functions.hook.interface";
import { FunctionsContext } from "../contexts/FunctionsContext";
import { useContext } from "react";

const useFunctions = () => {
  const functions: IuseFunctions = useContext(FunctionsContext);

  return functions;
};

export default useFunctions;
