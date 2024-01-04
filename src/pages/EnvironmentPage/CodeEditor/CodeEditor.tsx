import CodeEditorSwitcher from "../../../components/CodeEditorSwitcher/CodeEditorSwitcher";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import ControlBar from "../../../components/ControlBar/ControlBar";
import { Fragment, ReactElement, useState } from "react";
import { useAppSelector } from "../../../hooks/redux";
import Card from "../../../components/Card/Card";
import useRobot from "../../../hooks/useRobot";
import useCreateRobot from "../../../hooks/useCreateRobot";

export default function CodeEditor(): ReactElement {
  const [activeTabCodeEditor, setActiveTabCodeEditor] = useState<1 | 2>(1);

  const handleFullScreen = useFullScreenHandle();

  const { activeTab, responseRobot, isRobotReady, isSettedCookie } = useRobot();

  const { urls } = useAppSelector((state) => state.robot);

  const { robotData } = useCreateRobot();

  return (
    <div
      className={
        activeTab === "Code Editor"
          ? "animate-fadeIn flex h-full flex-col gap-6"
          : "absolute -top-[9999px]"
      }
    >
      {responseRobot?.physicalIdeIngressEndpoint && (
        <CodeEditorSwitcher
          activeTabCodeEditor={activeTabCodeEditor}
          setActiveTabCodeEditor={setActiveTabCodeEditor}
        />
      )}
      <Card loading className="relative">
        <Fragment>
          {isRobotReady && isSettedCookie && (
            <FullScreen
              className="relative h-full w-full"
              handle={handleFullScreen}
            >
              <iframe
                title="Virtual IDE"
                allow="clipboard-read"
                className={`animate-fadeIn h-full w-full
                ${activeTabCodeEditor === 2 && "absolute -top-[9999px]"}
                ${handleFullScreen?.active && "!h-screen"}`}
                src={urls?.ide || robotData.step1.services.ide?.httpsEndpoint}
              />
              <iframe
                title="Physical IDE"
                allow="clipboard-read"
                className={`animate-fadeIn h-full w-full
                ${activeTabCodeEditor === 1 && "absolute -top-[9999px]"}
                ${handleFullScreen?.active && "!h-screen"}`}
                src={responseRobot?.physicalIdeIngressEndpoint}
              />
              <ControlBar type="ide" handleFullScreen={handleFullScreen} />
            </FullScreen>
          )}
        </Fragment>
      </Card>
    </div>
  );
}
