import React, { FC, useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { TbMoon, TbSun } from "react-icons/tb";

export const ThemeToggle: FC = () => {
  const { theme, setTheme }: any = useContext(ThemeContext);

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="cursor-pointer"
    >
      {theme === "light" ? (
        <TbMoon size={28} className="animate__animated animate__rotateIn" />
      ) : (
        <TbSun size={28} className="animate__animated animate__rotateIn" />
      )}
    </button>
  );
};
