import React, { createContext, useState } from "react";

export const SidebarContext: any = createContext<any>(null);

// eslint-disable-next-line
export default ({ children }: any) => {
  const [sidebarState, setSidebarState] = useState({
    isOpen: true,
    isCreateMode: true,
    page: "robot",
    currentCreateRobotStep: 2,
  });

  const [selectedState, setSelectedState] = useState({
    organization: null,
    roboticsCloud: null,
    fleet: null,
  });

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
