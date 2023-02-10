import React, { createContext, useState } from "react";

export const SidebarContext: any = createContext<any>(null);

// eslint-disable-next-line
export default ({ children }: any) => {
  const [sidebarState, setSidebarState] = useState({
    isOpen: true,
    mode: "",
    page: "robot",
  });

  return (
    <SidebarContext.Provider
      value={{
        sidebarState,
        setSidebarState,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
