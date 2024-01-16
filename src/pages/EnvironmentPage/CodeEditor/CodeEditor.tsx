import LayoutTabSwitcher from "../../../components/LayoutTabSwitcher/LayoutTabSwitcher";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import ControlBar from "../../../components/ControlBar/ControlBar";
import useCreateRobot from "../../../hooks/useCreateRobot";
import { Fragment, ReactElement, useState } from "react";
import { useAppSelector } from "../../../hooks/redux";
import Card from "../../../components/Card/Card";
import useRobot from "../../../hooks/useRobot";

export default function CodeEditor(): ReactElement {
  const [activeTabCodeEditor, setActiveTabCodeEditor] = useState<
    "Virtual IDE" | "Physical IDE"
  >("Virtual IDE");

  const handleFullScreen = useFullScreenHandle();

  const { activeTab, isRobotReady, isSettedCookie } = useRobot();

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
      {robotData.step1.services.physicalIde?.isEnabled && (
        <LayoutTabSwitcher
          tabs={["Virtual IDE", "Physical IDE"]}
          activeTab={activeTabCodeEditor}
          setActiveTab={setActiveTabCodeEditor}
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
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals allow-top-navigation-by-user-activation"
                title="Virtual IDE"
                allow="clipboard-read"
                className={`animate-fadeIn h-full w-full
                ${
                  activeTabCodeEditor === "Physical IDE" &&
                  "absolute -top-[9999px]"
                }
                ${handleFullScreen?.active && "!h-screen"}`}
                src={urls?.ide || robotData.step1.services.ide?.httpsEndpoint}
              />
              <iframe
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals allow-top-navigation-by-user-activation"
                title="Physical IDE"
                allow="clipboard-read"
                className={`animate-fadeIn h-full w-full
                ${
                  activeTabCodeEditor === "Virtual IDE" &&
                  "absolute -top-[9999px]"
                }
                ${handleFullScreen?.active && "!h-screen"}`}
                src={robotData.step1.services.physicalIde?.httpsEndpoint}
              />
              <ControlBar type="ide" handleFullScreen={handleFullScreen} />
            </FullScreen>
          )}
        </Fragment>
      </Card>
    </div>
  );
}
