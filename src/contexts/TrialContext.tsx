import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleTimeConverter } from "../helpers/GeneralFunctions";

export const TrialContext: any = createContext<any>(null);

// eslint-disable-next-line
export default ({ children }: any) => {
  const [time, setTime] = useState<any>({
    remainingTime: 10000, //seconds
    viewer: {
      h: 0,
      m: 0,
      s: 0,
    },
  });
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime({
        ...time,
        remainingTime: time?.remainingTime - 1,
        viewer: handleTimeConverter(time?.remainingTime),
      });
    }, 1000);

    if (time?.remainingTime <= 0) {
      clearInterval(timer);
      navigate("/trial-expired");
    }

    return () => {
      clearInterval(timer);
    };
  }, [navigate, time]);

  return (
    <TrialContext.Provider value={{ time }}>{children}</TrialContext.Provider>
  );
};
