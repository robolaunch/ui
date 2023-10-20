import React, { ReactElement, useEffect, useState } from "react";
import CardLayout from "../../layouts/CardLayout";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { BsFullscreen, BsFullscreenExit } from "react-icons/bs";
import { useAppSelector } from "../../hooks/redux";
import useRobot from "../../hooks/useRobot";
import RestartService from "../RestartService/RestartService";

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
    setIsSettedCookie(false);
    setIdeKey((prev) => prev + 1);
  }, [responseRobot?.robotClusters, setIsSettedCookie]);

  return (
    <div
      key={ideKey}
      id={`CODE_EDITOR_${ideKey}`}
      className={`${
        activeTab === "Code Editor"
          ? "animate__animated animate__fadeIn grid"
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
                            ? "text-layer-primary-500"
                            : "text-layer-light-500"
                        } `}
                  >
                    <span>{tab.name}</span>
                  </div>
                  <div
                    className={`h-[2px] w-full transition-all duration-500 
                  ${
                    tab.name === activeTabCodeEditor
                      ? "bg-layer-primary-500"
                      : "bg-layer-light-100"
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
              handleFullScreen?.active ? "h-screen" : "h-[55rem]"
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
                }, 1500);
              }
            }}
          />

          <div className="absolute bottom-12 right-3">
            <RestartService type="ide" />
          </div>

          {handleFullScreen.active ? (
            <button
              className="absolute bottom-3 right-3"
              onClick={handleFullScreen.exit}
            >
              <BsFullscreenExit
                size={24}
                className="text-layer-light-700 transition-all duration-200 hover:scale-90 hover:text-layer-primary-400"
              />
            </button>
          ) : (
            <button
              className="absolute bottom-3 right-3"
              onClick={handleFullScreen.enter}
            >
              <BsFullscreen
                size={24}
                className=" text-layer-light-700 transition-all duration-200 hover:scale-90 hover:text-layer-primary-400"
              />
            </button>
          )}
        </FullScreen>
      </CardLayout>
    </div>
  );
}
