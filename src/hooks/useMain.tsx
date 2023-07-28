import { useContext } from "react";
import { MainContext } from "../contexts/MainContext";
import { IuseMain } from "../interfaces/generalInterfaces";

const useMain = () => {
  const useMain: IuseMain = useContext(MainContext);

  return useMain;
};

export default useMain;
