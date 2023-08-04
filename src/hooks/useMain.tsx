import { IuseMain } from "../interfaces/mainInterfaces";
import { MainContext } from "../contexts/MainContext";
import { useContext } from "react";

const useMain = () => {
  const useMain: IuseMain = useContext(MainContext);

  return useMain;
};

export default useMain;
