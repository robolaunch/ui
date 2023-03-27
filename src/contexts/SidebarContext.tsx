import React, { createContext, useEffect, useState } from "react";

export const SidebarContext: any = createContext<any>(null);

// eslint-disable-next-line
export default ({ children }: any) => {
  const [sidebarState, setSidebarState] = useState({
    isOpen: false,
    isCreateMode: false,
    page: "",
  });

  const [selectedState, setSelectedState] = useState({
    organization: null,
    roboticsCloud: null,
    fleet: null,
  });

  useEffect(() => {
    console.log(selectedState);
  }, [selectedState]);

  return (
    <SidebarContext.Provider
      value={{
        sidebarState,
        setSidebarState,
        selectedState,
        setSelectedState,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
