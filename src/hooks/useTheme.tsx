import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { ITheme } from "../interfaces/themeInterfaces";

const useTheme = () => {
  const useTheme: ITheme = useContext(ThemeContext);

  return useTheme;
};

export default useTheme;
