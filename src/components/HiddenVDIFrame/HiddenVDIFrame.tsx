import React, { Fragment, ReactElement, useEffect, useState } from "react";
import useRobot from "../../hooks/useRobot";

export default function HiddenVDIFrame(): ReactElement {
  const [iframeKey, setIframeKey] = useState<number>(0);
  const { responseRobot } = useRobot();

  useEffect(() => {
    const timer = setInterval(() => {
      setIframeKey(iframeKey + 1);
    }, 60000);

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
          src={responseRobot?.ideIngressEndpoint}
        />
      )}
      {responseRobot?.vdiIngressEndpoint && (
        <iframe
          key={iframeKey + 1}
          title="iframe"
          allow="clipboard-read"
          className="absolute -top-[9999px]"
          src={
            responseRobot?.vdiIngressEndpoint?.replace("wss://", "https://") +
            "health"
          }
        />
      )}
    </Fragment>
  );
}
