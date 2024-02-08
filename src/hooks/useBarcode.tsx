import { useContext } from "react";
import { BarcodeContext } from "../contexts/BarcodeContext";
import { IuseBarcode } from "../interfaces/hook/barcode.hook.interface";

const useBarcode = () => {
  const useBarcode: IuseBarcode = useContext(BarcodeContext);

  return useBarcode;
};

export default useBarcode;
