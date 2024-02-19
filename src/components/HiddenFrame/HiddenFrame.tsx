import useRobot from "../../hooks/useRobot";
import { ReactElement, useEffect } from "react";

export default function HiddenFrame(): ReactElement {
  const {
    responseRobot,
    isRobotReady,
    setIsSettedCookie,
    isSettedCookie,
    iFrameId,
    setIFrameId,
  } = useRobot();

  useEffect(() => {
    isRobotReady && !isSettedCookie && setIFrameId(iFrameId + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRobotReady]);

  return (
    <iframe
      key={iFrameId}
      title={String(iFrameId)}
      allow="clipboard-read"
      className="absolute -top-[9999px]"
      src={responseRobot?.ideIngressEndpoint}
      onLoad={() => {
        setTimeout(() => {
          isRobotReady && !isSettedCookie && setIsSettedCookie(true);
        }, 2500);
      }}
    />
  );
}
