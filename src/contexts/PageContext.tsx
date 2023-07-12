import React, { createContext, useState } from "react";

export const PageContext: any = createContext<any>(null);

// eslint-disable-next-line
export default ({ children }: any) => {
  const [pageState, setPageState] = useState<any>({
    organization: null,
    roboticsCloud: null,
    instance: null,
    fleet: null,
  });

  return (
    <PageContext.Provider
      value={{
        pageState,
        setPageState,
      }}
    >
      {children}
    </PageContext.Provider>
  );
};
