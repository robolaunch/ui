import useRobot from "../../hooks/useRobot";
import { ReactElement } from "react";

export default function HiddenFrame(): ReactElement {
  const {
    responseRobot,
    isRobotReady,
    setIsSettedCookie,
    isSettedCookie,
    iFrameId,
  } = useRobot();

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
