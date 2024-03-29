import { FullScreen, useFullScreenHandle } from "react-full-screen";
import ControlBar from "../../../components/ControlBar/ControlBar";
import { Fragment, ReactElement } from "react";
import Card from "../../../components/Card/Card";
import useRobot from "../../../hooks/useRobot";
import useMain from "../../../hooks/useMain";

export default function JupyterNotebook(): ReactElement {
  const handleFullScreen = useFullScreenHandle();

  const { isRobotReady, isSettedCookie } = useRobot();

  const { robotData } = useMain();

  return (
    <div className="animate-fadeIn flex h-full flex-col gap-6">
      <Card loading className="relative">
        <Fragment>
          {isRobotReady && isSettedCookie && (
            <FullScreen
              className="relative h-full w-full"
              handle={handleFullScreen}
            >
              <iframe
                title="Jupyter Notebook"
                allow="clipboard-read"
                className={`animate-fadeIn h-full w-full
                ${handleFullScreen?.active && "!h-screen"}`}
                src={robotData?.step1?.services.jupyterNotebook?.httpsEndpoint}
              />
              <ControlBar
                type="jupyterNotebook"
                handleFullScreen={handleFullScreen}
              />
            </FullScreen>
          )}
        </Fragment>
      </Card>
    </div>
  );
}
