import React, { createContext, useState } from "react";
import { ISelectedState, ISidebarState } from "../interfaces/sidebarInterfaces";

export const SidebarContext: any = createContext<any>(null);

// eslint-disable-next-line
export default ({ children }: any) => {
  const [sidebarState, setSidebarState] = useState<ISidebarState>({
    isOpen: true,
    isCreateMode: true,
    page: "robot",
    currentCreateRobotStep: 2,
  });

  const [selectedState, setSelectedState] = useState<ISelectedState>({
    organization: null,
    roboticsCloud: null,
    fleet: null,
  });

  function handleCreateRobotPreviousStep() {
    setSidebarState((prev: ISidebarState) => {
      return {
        ...prev,
        currentCreateRobotStep: prev.currentCreateRobotStep - 1,
      };
    });
  }

  function handleCreateRobotNextStep() {
    setSidebarState((prev: ISidebarState) => {
      return {
        ...prev,
        currentCreateRobotStep: prev.currentCreateRobotStep + 1,
      };
    });
  }

  return (
    <SidebarContext.Provider
      value={{
        sidebarState,
        setSidebarState,
        selectedState,
        setSelectedState,
        handleCreateRobotPreviousStep,
        handleCreateRobotNextStep,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
