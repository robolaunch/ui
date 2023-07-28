import { useContext } from "react";
import { VDIContext } from "../contexts/VDIContext";
import { IVDIInterface } from "../interfaces/VDIInterfaces";

const useVDI = () => {
  const useVDI: IVDIInterface = useContext(VDIContext);

  return useVDI;
};

export default useVDI;
