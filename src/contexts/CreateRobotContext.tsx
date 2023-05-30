import React, { createContext, useEffect, useState } from "react";
import { IRobotData } from "../interfaces/robotInterfaces";

export const CreateRobotContext: any = createContext<any>(null);

// eslint-disable-next-line
export default ({ children }: any) => {
  const [robotData, setRobotData] = useState<IRobotData>({
    step1: {
      robotName: "",
      isVirtualRobot: true,
      physicalInstanceName: "",
      robotStorage: 40,
      isEnabledIde: true,
      isEnabledROS2Bridge: true,
      remoteDesktop: {
        isEnabled: true,
        sessionCount: 1,
      },
      rosDistros: [],
      gpuEnabledForCloudInstance: true,
      isDevelopmentMode: true,
    },
    step2: {
      workspaces: [
        {
          name: "",
          workspaceDistro: "",
          robotRepositories: [
            {
              name: "",
              url: "",
              branch: "",
            },
          ],
        },
      ],
    },
    step3: {
      steps: [
        {
          name: "",
          workspace: "",
          isScriptCode: false,
          code: "",
        },
      ],
    },
  });

  useEffect(() => {
    console.log(robotData);
  }, [robotData]);

  return (
    <CreateRobotContext.Provider
      value={{
        robotData,
        setRobotData,
      }}
    >
      {children}
    </CreateRobotContext.Provider>
  );
};
