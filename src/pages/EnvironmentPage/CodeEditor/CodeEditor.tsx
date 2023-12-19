import RestartService from "../../../components/RestartServiceButton/RestartServiceButton";
import CodeEditorSwitcher from "../../../components/CodeEditorSwitcher/CodeEditorSwitcher";
import FullScreenService from "../../../components/FullScreenService/FullScreenService";
import ServiceLogs from "../../../components/ServiceLogs/ServiceLogs";
import ServiceJobs from "../../../components/ServiceJobs/ServiceJobs";
import FileBrowser from "../../../components/FileBrowser/FileBrowser";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { Fragment, ReactElement, useState } from "react";
import Card from "../../../components/Card/Card";
import useRobot from "../../../hooks/useRobot";

export default function CodeEditor(): ReactElement {
  const [activeTabCodeEditor, setActiveTabCodeEditor] = useState<1 | 2>(1);

  const handleFullScreen = useFullScreenHandle();

  const { activeTab, responseRobot, isRobotReady, isSettedCookie } = useRobot();

  return (
    <div
      className={
        activeTab === "Code Editor"
          ? "animate__animated animate__fadeIn flex h-full flex-col gap-6"
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
            <FullScreen className="h-full w-full" handle={handleFullScreen}>
              <iframe
                title="Virtual IDE"
                allow="clipboard-read"
                className={`animate__animated animate__fadeIn h-full w-full
                ${activeTabCodeEditor === 2 && "absolute -top-[9999px]"}
                ${handleFullScreen?.active && "!h-screen"}`}
                src={responseRobot?.ideIngressEndpoint}
              />
              <iframe
                title="Physical IDE"
                allow="clipboard-read"
                className={`animate__animated animate__fadeIn h-full w-full
                ${activeTabCodeEditor === 1 && "absolute -top-[9999px]"}
                ${handleFullScreen?.active && "!h-screen"}`}
                src={responseRobot?.physicalIdeIngressEndpoint}
              />
              <div className="absolute bottom-4 right-4 flex flex-col gap-5">
                <FileBrowser type="ide" />
                <ServiceJobs type="ide" />
                <ServiceLogs type="ide" />
                <RestartService type="ide" />
                <FullScreenService handleFullScreen={handleFullScreen} />
              </div>
            </FullScreen>
          )}
        </Fragment>
      </Card>
    </div>
  );
}
