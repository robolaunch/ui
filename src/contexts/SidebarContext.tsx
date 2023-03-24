import React, { createContext, useEffect, useState } from "react";
import { useAppSelector } from "../hooks/redux";

export const SidebarContext: any = createContext<any>(null);

// eslint-disable-next-line
export default ({ children }: any) => {
  // eslint-disable-next-line
  const { currentOrganization } = useAppSelector((state) => state.organization);

  const [sidebarState, setSidebarState] = useState({
    isOpen: false,
    isCreateMode: false,
    page: "",
  });

  const [selectedState, setSelectedState] = useState({
    team: null,
    roboticscloud: null,
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
