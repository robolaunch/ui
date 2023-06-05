import React, { useEffect, createContext, useState } from "react";

export const FunctionalContext: any = createContext<any>(null);

// eslint-disable-next-line
export default ({ children }: any) => {
  return (
    <FunctionalContext.Provider value={{}}>
      {children}
    </FunctionalContext.Provider>
  );
};
