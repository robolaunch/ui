import { ISelectedState, ISidebarState } from "../interfaces/mainInterfaces";
import { createContext, useEffect, useState } from "react";
import { IpagesState } from "../interfaces/mainInterfaces";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";

export const MainContext: any = createContext<any>(null);

// eslint-disable-next-line
export default ({ children }: any) => {
  const url = useLocation();

  const { applicationMode } = useAppSelector((state) => state.user);

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

  const [trialState, setTrialState] = useState<any>({
    ip: null,
    time: {
      remainingTime: null,
      viewer: {
        h: 0,
        m: 0,
        s: 0,
      },
    },
  });

  const [itemCount, setItemCount] = useState<number>(0);

  useEffect(() => {
    console.log("SelectedState", selectedState);
  }, [selectedState]);

  useEffect(() => {
    console.log("pagesState", pagesState);
  }, [pagesState]);

  useEffect(() => {
    setSidebarState({
      isOpen: false,
      page: undefined,
      isCreateMode: false,
      instanceTab: "Cloud Instances",
    });
  }, [url]);

  function handleCreateRobotPreviousStep() {
    switch (sidebarState?.page) {
      case "importmanager":
        setSidebarState(
          (prevState: ISidebarState): ISidebarState => ({
            ...prevState,
            page: "robot",
            isCreateMode: false,
          }),
        );
        break;
      case "workspacesmanager":
        setSidebarState(
          (prevState: ISidebarState): ISidebarState => ({
            ...prevState,
            page: "robot",
          }),
        );
        break;
      case "buildsmanager":
        setSidebarState(
          (prevState: ISidebarState): ISidebarState => ({
            ...prevState,
            page: "workspacesmanager",
          }),
        );
    }
  }

  function handleCreateRobotNextStep() {
    switch (sidebarState?.page) {
      case "importmanager":
        setSidebarState(
          (prevState: ISidebarState): ISidebarState => ({
            ...prevState,
            page: "robot",
          }),
        );
        break;
      case "robot":
        setSidebarState(
          (prevState: ISidebarState): ISidebarState => ({
            ...prevState,
            page: "workspacesmanager",
          }),
        );
        break;
      case "workspacesmanager":
        setSidebarState(
          (prevState: ISidebarState): ISidebarState => ({
            ...prevState,
            page: "buildsmanager",
          }),
        );
        break;
      case "buildsmanager":
        setSidebarState(
          (prevState: ISidebarState): ISidebarState => ({
            ...prevState,
            page: "launchsmanager",
          }),
        );
        break;
      case "launchsmanager":
        console.log("launchsmanager");
        break;
    }
  }

  return (
    <MainContext.Provider
      value={{
        applicationMode,
        trialState,
        setTrialState,
        itemCount,
        setItemCount,
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
    </MainContext.Provider>
  );
};
