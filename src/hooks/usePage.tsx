import { useContext } from "react";
import { PageContext } from "../contexts/PageContext";

const usePage = () => {
  const usePage = useContext(PageContext);

  return usePage;
};

export default usePage;
