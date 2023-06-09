import { useContext } from "react";
import { BarcodeManagementContext } from "../contexts/BarcodeManagementContext";

const useBarcodeManagement = () => {
  const useBarcodeManagement = useContext(BarcodeManagementContext);

  return useBarcodeManagement;
};

export default useBarcodeManagement;
