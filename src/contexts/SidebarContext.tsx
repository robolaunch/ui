import React, { createContext, useEffect, useState } from "react";
import { ISelectedState, ISidebarState } from "../interfaces/sidebarInterfaces";
import { useLocation } from "react-router-dom";

export const SidebarContext: any = createContext<any>(null);

// eslint-disable-next-line
export default ({ children }: any) => {
  const url = useLocation();

  const [sidebarState, setSidebarState] = useState<ISidebarState>({
    isOpen: true,
    isCreateMode: true,
    page: "launchsmanager",
    instanceTab: "Cloud Instances",
  });

  const [selectedState, setSelectedState] = useState<ISelectedState>({
    organization: null,
    roboticsCloud: null,
    instance: null,
    fleet: null,
  });

  useEffect(() => {
    setSidebarState(
      (prevState: ISidebarState): ISidebarState => ({
        ...prevState,
        isOpen: false,
        isCreateMode: false,
        page: undefined,
      })
    );
  }, [url]);

  useEffect(() => {
    console.log(selectedState);
  }, [selectedState]);

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
        setSidebarState(
          (prevState: ISidebarState): ISidebarState => ({
            ...prevState,
            page: "launchsmanager",
          })
        );
        break;
      case "launchsmanager":
        console.log("launchsmanager");
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
