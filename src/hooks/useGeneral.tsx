import { useContext } from "react";
import { GeneralContext } from "../contexts/GeneralContext";
import { IuseGeneral } from "../interfaces/generalInterfaces";

const useGeneral = () => {
  const useGeneral: IuseGeneral = useContext(GeneralContext);

  return useGeneral;
};

export default useGeneral;
