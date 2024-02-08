import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useMain from "../hooks/useMain";
import { IEnvironment } from "../interfaces/environment/environment.interface";
import { environmentInitialConfig } from "../configs/environment.initial.config";

export const CreateRobotContext: any = createContext<any>(null);

// eslint-disable-next-line
export default ({ children }: any) => {
  const url = useParams();

  const initialRobotData: IEnvironment = environmentInitialConfig;

  const [robotData, setRobotData] = useState<IEnvironment>(initialRobotData);

  const { sidebarState } = useMain();

  useEffect(() => {
    console.log("robotData", robotData);
  }, [robotData]);

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

  return (
    <CreateRobotContext.Provider
      value={{
        robotData,
        setRobotData,
        handleResetRobotForm,
        handleAddLaunchManager,
        /////
      }}
    >
      {children}
    </CreateRobotContext.Provider>
  );
};
