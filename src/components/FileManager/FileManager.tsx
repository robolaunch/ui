import React, { ReactElement } from "react";
import CardLayout from "../../layouts/CardLayout";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { useAppSelector } from "../../hooks/redux";
import useRobot from "../../hooks/useRobot";
import RestartService from "../RestartServiceButton/RestartServiceButton";
import FullScreenButton from "../FullScreenButton/FullScreenButton";
import ServiceLogsButton from "../ServiceLogs/ServiceLogs";

export default function CodeEditor(): ReactElement {
  const handleFullScreen = useFullScreenHandle();

  const { responseRobot } = useRobot();

  const { urls } = useAppSelector((state) => state.robot);

  return (
    <div className="animate__animated animate__fadeIn grid h-full">
      <CardLayout loading={true}>
        <FullScreen className="relative" handle={handleFullScreen}>
          <iframe
            allow="clipboard-read"
            className={`animate__animated animate__fadeIn w-full ${
              handleFullScreen?.active ? "h-screen" : "h-[45.4rem]"
            }`}
            src={urls?.ide || responseRobot?.ideIngressEndpoint}
            title="Code Editor"
          />

          <div className="absolute bottom-1 right-4 flex scale-[0.88] flex-col gap-4">
            <ServiceLogsButton type="ide" />
            <RestartService type="ide" />
            <FullScreenButton
              isFullScreen={handleFullScreen.active}
              handleFullScreen={
                handleFullScreen.active
                  ? handleFullScreen.exit
                  : handleFullScreen.enter
              }
            />
          </div>
        </FullScreen>
      </CardLayout>
    </div>
  );
}
