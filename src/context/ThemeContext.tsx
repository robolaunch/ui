import React, { useEffect, createContext } from "react";

export const ThemeContext: any = createContext<any>(null);

// eslint-disable-next-line
export default ({ children }: any) => {
  const [theme, setTheme] = React.useState<string>(
    localStorage.theme || "light"
  );

  useEffect(() => {
    localStorage.theme = theme;

    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
