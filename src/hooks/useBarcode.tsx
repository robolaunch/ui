import { useContext } from "react";
import { BarcodeContext } from "../contexts/BarcodeContext";
import { IuseBarcode } from "../interfaces/useBarcodeInterfaces";

const useBarcode = () => {
  const useBarcode: IuseBarcode = useContext(BarcodeContext);

  return useBarcode;
};

export default useBarcode;
