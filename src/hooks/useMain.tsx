import { MainContext } from "../contexts/MainContext";
import { useContext } from "react";
import { IuseMain } from "../interfaces/hook/main.hook.interface";

const useMain = () => {
  const useMain: IuseMain = useContext(MainContext);

  return useMain;
};

export default useMain;
