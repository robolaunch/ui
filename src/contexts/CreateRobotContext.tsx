import React, { createContext, useState } from "react";

export const CreateRobotContext: any = createContext<any>(null);

// eslint-disable-next-line
export default ({ children }: any) => {
  const [robotData, setRobotData] = useState<any>();

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
