import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

interface ITheme {
  theme: "light" | "dark";
  setTheme: React.Dispatch<React.SetStateAction<"light" | "dark">>;
}

const useTheme = () => {
  const useTheme: ITheme = useContext(ThemeContext);

  return useTheme;
};

export default useTheme;
