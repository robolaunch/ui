import RestartService from "../../../components/RestartServiceButton/RestartServiceButton";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { ReactElement, useEffect, useState } from "react";
import ServiceLogs from "../../../components/ServiceLogs/ServiceLogs";
import ServiceJobs from "../../../components/ServiceJobs/ServiceJobs";
import FileBrowser from "../../../components/FileBrowser/FileBrowser";
import useRobot from "../../../hooks/useRobot";
import Card from "../../../components/Card/Card";
import CodeEditorSwitcher from "../../../components/CodeEditorSwitcher/CodeEditorSwitcher";
import FullScreenService from "../../../components/FullScreenService/FullScreenService";

export default function CodeEditor(): ReactElement {
  const [ideKey, setIdeKey] = useState<number>(0);
  const [activeTabCodeEditor, setActiveTabCodeEditor] = useState<
    "Cloud IDE" | "Physical IDE"
  >("Cloud IDE");

  const handleFullScreen = useFullScreenHandle();

  const { activeTab, responseRobot, setIsSettedCookie } = useRobot();

  const codeEditorTabs = [
    {
      name: "Cloud IDE",
    },
    {
      name: "Physical IDE",
    },
  ];

  useEffect(() => {
    setIsSettedCookie(undefined);
    setIdeKey((prev) => prev + 1);
  }, [responseRobot?.robotClusters, setIsSettedCookie]);

  return (
    <div
      key={ideKey}
      id={`CODE_EDITOR_${ideKey}`}
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
          codeEditorTabs={codeEditorTabs}
        />
      )}
      <Card loading className="relative">
        <FullScreen className="h-full w-full" handle={handleFullScreen}>
          <iframe
            allow="clipboard-read"
            className={`animate__animated animate__fadeIn w-full ${
              handleFullScreen?.active ? "h-screen" : "h-full"
            }`}
            src={
              activeTabCodeEditor === "Cloud IDE"
                ? responseRobot?.ideIngressEndpoint
                : responseRobot?.physicalIdeIngressEndpoint
            }
            title="Code Editor"
            onLoad={async () => {
              if (await responseRobot) {
                await setTimeout(() => {
                  setIsSettedCookie(true);
                }, 2500);
              }
            }}
          />
          <div className="absolute bottom-4 right-4 flex flex-col gap-5">
            <FileBrowser type="ide" />
            <ServiceJobs type="ide" />
            <ServiceLogs type="ide" />
            <RestartService type="ide" />
            <FullScreenService handleFullScreen={handleFullScreen} />
          </div>
        </FullScreen>
      </Card>
    </div>
  );
}
