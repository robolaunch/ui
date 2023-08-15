import React, { Fragment, ReactElement, useEffect, useState } from "react";
import useRobot from "../../hooks/useRobot";
import { useAppSelector } from "../../hooks/redux";

export default function HiddenFrame(): ReactElement {
  const [iframeKey, setIframeKey] = useState<number>(0);
  const { responseRobot, setIsSettedCookie, isSettedCookie } = useRobot();
  const { urls } = useAppSelector((state) => state.robot);

  useEffect(() => {
    const timer = setInterval(() => {
      setIframeKey(iframeKey + 1);
    }, 5 * 60 * 1000); // 5 minutes

    return () => {
      clearInterval(timer);
    };
  }, [iframeKey]);

  return (
    <Fragment>
      {responseRobot?.ideIngressEndpoint && (
        <iframe
          key={iframeKey}
          title="iframe"
          allow="clipboard-read"
          className="absolute -top-[9999px]"
          src={urls?.ide || responseRobot?.ideIngressEndpoint}
          onLoad={() => {
            setTimeout(() => {
              !isSettedCookie && setIsSettedCookie(true);
            }, 2000);
          }}
        />
      )}
    </Fragment>
  );
}
