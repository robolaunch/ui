import React, { Fragment, ReactElement, useEffect, useState } from "react";
import useRobot from "../../hooks/useRobot";

export default function HiddenVDIFrame(): ReactElement {
  const [iframeKey, setIframeKey] = useState<number>(0);
  const { responseRobot } = useRobot();

  useEffect(() => {
    const timer = setInterval(() => {
      setIframeKey(iframeKey + 1);
    }, 30000);

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
          onLoad={() => console.log("IDE LOADED")}
        />
      )}
    </Fragment>
  );
}
