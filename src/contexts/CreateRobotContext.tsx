import React, { createContext, useState } from "react";
import { IRobotData } from "../interfaces/robotInterfaces";
import useSidebar from "../hooks/useSidebar";

export const CreateRobotContext: any = createContext<any>(null);

// eslint-disable-next-line
export default ({ children }: any) => {
  const { selectedState } = useSidebar();

  const [robotData, setRobotData] = useState<IRobotData>({
    step1: {
      organization: selectedState?.organization,
      roboticsCloud: selectedState?.roboticsCloud,
      fleet: selectedState?.fleet,
      name: "",
      storage: 40,
      isVirtualRobot: true,
      isEnabledIDE: true,
      isEnabledROS2Bridge: true,
      remoteDesktop: {
        isEnabled: true,
        sessionCount: 1,
      },
      rosDistros: [],
    },
    step2: {
      workspaces: [
        {
          name: "",
          distro: "",
          repositories: [
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
