import React, { createContext, useState } from "react";
import { ISelectedState, ISidebarState } from "../interfaces/sidebarInterfaces";

export const SidebarContext: any = createContext<any>(null);

// eslint-disable-next-line
export default ({ children }: any) => {
  const [sidebarState, setSidebarState] = useState<ISidebarState>({
    isOpen: false,
    isCreateMode: false,
    page: undefined,
  });

  const [selectedState, setSelectedState] = useState<ISelectedState>({
    organization: null,
    roboticsCloud: null,
    instance: null,
    fleet: null,
  });

  function handleCreateRobotPreviousStep() {
    switch (sidebarState?.page) {
      case "workspacesmanager":
        setSidebarState(
          (prevState: ISidebarState): ISidebarState => ({
            ...prevState,
            page: "robot",
          })
        );
        break;
      case "buildsmanager":
        setSidebarState(
          (prevState: ISidebarState): ISidebarState => ({
            ...prevState,
            page: "workspacesmanager",
          })
        );
    }
  }

  function handleCreateRobotNextStep() {
    switch (sidebarState?.page) {
      case "robot":
        setSidebarState(
          (prevState: ISidebarState): ISidebarState => ({
            ...prevState,
            page: "workspacesmanager",
          })
        );
        break;
      case "workspacesmanager":
        setSidebarState(
          (prevState: ISidebarState): ISidebarState => ({
            ...prevState,
            page: "buildsmanager",
          })
        );
        break;
      case "buildsmanager":
        console.log("createrobot");
        break;
    }
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
