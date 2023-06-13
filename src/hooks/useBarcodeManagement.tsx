import { useContext } from "react";
import { BarcodeManagementContext } from "../contexts/BarcodeManagementContext";
import { IuseBarcodeManagement } from "../interfaces/useBarcodeManagementInterfaces";

const useBarcodeManagement = () => {
  const useBarcodeManagement: IuseBarcodeManagement = useContext(
    BarcodeManagementContext
  );

  return useBarcodeManagement;
};

export default useBarcodeManagement;
