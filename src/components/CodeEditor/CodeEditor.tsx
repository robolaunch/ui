import React, { ReactElement, useEffect, useState } from "react";
import CardLayout from "../../layouts/CardLayout";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { BsFullscreen, BsFullscreenExit } from "react-icons/bs";
import { useAppSelector } from "../../hooks/redux";

interface ICodeEditor {
  activeTab: string;
  responseRobot: any;
  setIsSettedCookie: any;
}

export default function CodeEditor({
  activeTab,
  responseRobot,
  setIsSettedCookie,
}: ICodeEditor): ReactElement {
  const [activeTabCodeEditor, setActiveTabCodeEditor] = useState<
    "Cloud IDE" | "Physical IDE"
  >("Cloud IDE");

  const handleFullScreen = useFullScreenHandle();
  const [reloadCounter, setReloadCounter] = useState<number>(0);
  const { urls } = useAppSelector((state) => state.robot);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (
        activeTab === "Loading" ||
        activeTab === "Settings" ||
        activeTab === "Teleoperation" ||
        activeTab === "Remote Desktop" ||
        activeTab === "Visualization" ||
        activeTab === "Overview" ||
        activeTab === "Task Management"
      ) {
        console.log("reloadcounter +1");
        setReloadCounter((prevCounter) => prevCounter + 1);
      }
    }, 60 * 1000); // 1 dakika

    return () => {
      clearInterval(intervalId);
    };
  }, [activeTab, responseRobot]);

  const codeEditorTabs = [
    {
      name: "Cloud IDE",
    },
    {
      name: "Physical IDE",
    },
  ];

  return (
    <div
      id="CODE_EDITOR"
      className={`${
        activeTab === "Code Editor"
          ? "grid animate__animated animate__fadeIn"
          : "absolute -top-[9999px]"
      } grid-cols-1 gap-6`}
    >
      {responseRobot?.physicalIdeIngressEndpoint && (
        <CardLayout className="!">
          <ul className="w-full flex justify-center gap-6  p-1 -mb-2.5 rounded">
            {codeEditorTabs.map((tab: any, index: number) => {
              return (
                <li
                  className={`flex w-full items-center flex-col gap-3 cursor-pointer 
                     ${tab?.hidden && "!hidden"}`}
                  onClick={() => setActiveTabCodeEditor(tab.name)}
                  key={index}
                >
                  <div
                    className={`flex gap-1 items-center text-xs font-medium px-2 transition-all duration-500 min-w-max hover:scale-90
                        ${
                          tab.name === activeTabCodeEditor
                            ? "text-layer-primary-500"
                            : "text-layer-light-500"
                        } `}
                  >
                    <span>{tab.name}</span>
                  </div>
                  <div
                    className={`w-full h-[2px] transition-all duration-500 
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
      <CardLayout>
        <FullScreen className="relative" handle={handleFullScreen}>
          <iframe
            key={reloadCounter}
            allow="clipboard-read"
            className={`w-full animate__animated animate__fadeIn ${
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
          {handleFullScreen.active ? (
            <button
              className="absolute bottom-3 right-3"
              onClick={handleFullScreen.exit}
            >
              <BsFullscreenExit
                size={24}
                className="text-layer-light-700 hover:scale-90 hover:text-layer-primary-400 transition-all duration-200"
              />
            </button>
          ) : (
            <button
              className="absolute bottom-3 right-3"
              onClick={handleFullScreen.enter}
            >
              <BsFullscreen
                size={24}
                className=" text-layer-light-700 hover:scale-90 hover:text-layer-primary-400 transition-all duration-200"
              />
            </button>
          )}
        </FullScreen>
      </CardLayout>
    </div>
  );
}
