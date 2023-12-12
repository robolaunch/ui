import RestartService from "../RestartServiceButton/RestartServiceButton";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import FullScreenButton from "../FullScreenButton/FullScreenButton";
import { ReactElement, useEffect, useState } from "react";
import ServiceLogs from "../ServiceLogs/ServiceLogs";
import ServiceJobs from "../ServiceJobs/ServiceJobs";
import FileBrowser from "../FileBrowser/FileBrowser";
import { useAppSelector } from "../../hooks/redux";
import CardLayout from "../../layouts/CardLayout";
import useRobot from "../../hooks/useRobot";

export default function CodeEditor(): ReactElement {
  const [ideKey, setIdeKey] = useState<number>(0);
  const [activeTabCodeEditor, setActiveTabCodeEditor] = useState<
    "Cloud IDE" | "Physical IDE"
  >("Cloud IDE");

  const handleFullScreen = useFullScreenHandle();

  const { activeTab, responseRobot, setIsSettedCookie } = useRobot();

  const { urls } = useAppSelector((state) => state.robot);

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
      className={`${
        activeTab === "Code Editor"
          ? "animate__animated animate__fadeIn grid h-full"
          : "absolute -top-[9999px]"
      } grid-cols-1 gap-6`}
    >
      {responseRobot?.physicalIdeIngressEndpoint && (
        <CardLayout className="!">
          <ul className="-mb-2.5 flex w-full justify-center  gap-6 rounded p-1">
            {codeEditorTabs.map((tab: any, index: number) => {
              return (
                <li
                  className={`flex w-full cursor-pointer flex-col items-center gap-3 
                     ${tab?.hidden && "!hidden"}`}
                  onClick={() => setActiveTabCodeEditor(tab.name)}
                  key={index}
                >
                  <div
                    className={`flex min-w-max items-center gap-1 px-2 text-xs font-medium transition-all duration-500 hover:scale-90
                        ${
                          tab.name === activeTabCodeEditor
                            ? "text-primary-500"
                            : "text-light-500"
                        } `}
                  >
                    <span>{tab.name}</span>
                  </div>
                  <div
                    className={`h-[2px] w-full transition-all duration-500 
                  ${
                    tab.name === activeTabCodeEditor
                      ? "bg-primary-500"
                      : "bg-light-100"
                  } `}
                  />
                </li>
              );
            })}
          </ul>
        </CardLayout>
      )}
      <CardLayout loading={true}>
        <FullScreen className="relative" handle={handleFullScreen}>
          <iframe
            allow="clipboard-read"
            className={`animate__animated animate__fadeIn w-full ${
              handleFullScreen?.active ? "h-screen" : "h-[43.4rem]"
            }`}
            src={
              activeTabCodeEditor === "Cloud IDE"
                ? urls?.ide || responseRobot?.ideIngressEndpoint
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

          <div className="absolute bottom-1 right-4 flex scale-[0.88] flex-col gap-4">
            <FileBrowser type="ide" />
            <ServiceJobs type="ide" />
            <ServiceLogs type="ide" />
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
