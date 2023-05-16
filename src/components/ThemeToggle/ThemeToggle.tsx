import React, { ReactElement } from "react";
import { TbMoon, TbSun } from "react-icons/tb";
import useTheme from "../../hooks/useTheme";

export default function ThemeToggle(): ReactElement {
  const { theme, setTheme } = useTheme();

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
}
