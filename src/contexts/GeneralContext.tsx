import React, { createContext, useEffect, useState } from "react";
import { ISelectedState, ISidebarState } from "../interfaces/generalInterfaces";
import { useLocation } from "react-router-dom";
import { IpagesState } from "../interfaces/generalInterfaces";

export const GeneralContext: any = createContext<any>(null);

// eslint-disable-next-line
export default ({ children }: any) => {
  const url = useLocation();

  const [sidebarState, setSidebarState] = useState<ISidebarState>({
    isOpen: false,
    isCreateMode: false,
    page: undefined,
    instanceTab: "Cloud Instances",
  });

  const [selectedState, setSelectedState] = useState<ISelectedState>({
    organization: null,
    roboticsCloud: null,
    instance: null,
    fleet: null,
  });

  const [pagesState, setPagesState] = useState<IpagesState>({
    organization: null,
    roboticsCloud: null,
    instance: null,
    fleet: null,
  });

  useEffect(() => {
    console.log(selectedState);
  }, [selectedState]);

  useEffect(() => {
    setSidebarState({
      isOpen: false,
      page: undefined,
      isCreateMode: false,
      instanceTab: "Cloud Instances",
    });
  }, [url]);

  // useEffect(() => {
  //   if (
  //     sidebarState?.page === "organization" ||
  //     sidebarState?.page === "roboticscloud" ||
  //     sidebarState?.page === "instance" ||
  //     sidebarState?.page === "fleet" ||
  //     sidebarState?.page === "robot"
  //   ) {
  //     setSidebarState(
  //       (prevState: ISidebarState): ISidebarState => ({
  //         ...prevState,
  //         isCreateMode: false,
  //       })
  //     );
  //   }
  // }, [sidebarState?.page]);

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
    <GeneralContext.Provider
      value={{
        pagesState,
        setPagesState,
        sidebarState,
        setSidebarState,
        selectedState,
        setSelectedState,
        handleCreateRobotPreviousStep,
        handleCreateRobotNextStep,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};