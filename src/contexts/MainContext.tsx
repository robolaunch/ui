import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";
import {
  ISelectedState,
  ISidebarState,
  IpagesState,
} from "../interfaces/context/main.context.interface";
import { environmentInitialConfig } from "../configs/environment.initial.config";
import { IEnvironment } from "../interfaces/environment/environment.interface";

export const MainContext: any = createContext<any>(null);

// eslint-disable-next-line
export default ({ children }: any) => {
  const url = useParams();

  const { applicationMode } = useAppSelector((state) => state.user);

  const initialRobotData: IEnvironment = environmentInitialConfig;

  const [robotData, setRobotData] = useState<IEnvironment>(initialRobotData);

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

  const [itemCount, setItemCount] = useState<number>(0);

  useEffect(() => {
    setSidebarState({
      isOpen: false,
      page: undefined,
      isCreateMode: false,
      instanceTab: "Cloud Instances",
    });
  }, [url]);

  useEffect(() => {
    if (
      !url.robotName &&
      JSON.stringify(initialRobotData) !== JSON.stringify(robotData) &&
      !sidebarState.isCreateMode
    ) {
      setRobotData(initialRobotData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sidebarState.isCreateMode, url]);

  useEffect(() => {
    console.log("selectedState", selectedState);
  }, [selectedState]);

  useEffect(() => {
    console.log("pagesState", pagesState);
  }, [pagesState]);

  useEffect(() => {
    console.log("robotData", robotData);
  }, [robotData]);

  function handleResetRobotForm() {
    setRobotData(initialRobotData);
  }

  function handleAddLaunchManager() {
    setRobotData((prev: any) => ({
      ...prev,
      step4: {
        ...prev.step4,
        robotLaunchSteps: [
          ...prev.step4.robotLaunchSteps,
          {
            workspace: "",
            entryPointType: "custom",
            entryPointCmd: "",
            instancesName: [],
            robotLmEnvs: [],
          },
        ],
      },
    }));
  }

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
        robotData,
        setRobotData,
        handleResetRobotForm,
        handleAddLaunchManager,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
