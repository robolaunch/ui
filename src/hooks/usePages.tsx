import { useContext } from "react";
import { PagesContext } from "../contexts/PagesContext";
import { IusePages } from "../interfaces/usePagesInterfaces";

const usePages = () => {
  const usePages: IusePages = useContext(PagesContext);

  return usePages;
};

export default usePages;
