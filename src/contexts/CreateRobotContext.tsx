import React, { createContext, useContext, useState } from "react";
import { SidebarContext } from "./SidebarContext";
import { IRobotData } from "../interfaces/robotInterfaces";

export const CreateRobotContext: any = createContext<any>(null);

// eslint-disable-next-line
export default ({ children }: any) => {
  const { selectedState }: any = useContext(SidebarContext);

  const [robotData, setRobotData] = useState<IRobotData>({
    step1: {
      name: "",
      organization: selectedState?.organization,
      roboticsCloud: selectedState?.roboticsCloud,
      fleet: selectedState?.fleet,
      storage: 0,
      isEnabledIDE: false,
      isEnabledROS2Bridge: false,
      remoteDesktop: {
        isEnabled: false,
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
