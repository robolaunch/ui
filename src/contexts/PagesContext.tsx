import React, { createContext, useState } from "react";
import { IpagesState } from "../interfaces/usePagesInterfaces";

export const PagesContext: any = createContext<any>(null);

// eslint-disable-next-line
export default ({ children }: any) => {
  const [pagesState, setPagesState] = useState<IpagesState>({
    organization: null,
    roboticsCloud: null,
    instance: null,
    fleet: null,
  });

  return (
    <PagesContext.Provider
      value={{
        pagesState,
        setPagesState,
      }}
    >
      {children}
    </PagesContext.Provider>
  );
};
