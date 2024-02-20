import useMain from "../../hooks/useMain";
import useRobot from "../../hooks/useRobot";
import { ReactElement, useEffect } from "react";

export default function HiddenFrame(): ReactElement {
  const {
    isRobotReady,
    setIsSettedCookie,
    isSettedCookie,
    iFrameId,
    setIFrameId,
    responseRobot,
  } = useRobot();

  const { robotData } = useMain();

  useEffect(() => {
    console.log(responseRobot);
    isRobotReady && !isSettedCookie && setIFrameId(iFrameId + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRobotReady]);

  return (
    <iframe
      key={iFrameId}
      title={String(iFrameId)}
      allow="clipboard-read"
      className="absolute -top-[9999px]"
      src={robotData?.step1?.services?.ide?.httpsEndpoint}
      onLoad={() => {
        setTimeout(() => {
          isRobotReady && !isSettedCookie && setIsSettedCookie(true);
        }, 2500);
      }}
    />
  );
}
