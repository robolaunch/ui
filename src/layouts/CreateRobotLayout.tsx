import React, {
  Fragment,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
import { SidebarContext } from "../contexts/SidebarContext";
import CreateRobotFormStep1 from "../components/CreateForms/CreateRobotFormStep1";
import CreateRobotFormStep2 from "../components/CreateForms/CreateRobotFormStep2";
import CreateRobotFormStep3 from "../components/CreateForms/CreateRobotFormStep3";
import { JSONTree } from "react-json-tree";
import { IRobotData } from "../interfaces/robotInterfaces";
import { CreateRobotContext } from "../contexts/CreateRobotContext";
import { ISidebarState } from "../interfaces/sidebarInterfaces";

export default function CreateRobotLayout(): ReactElement {
  const {
    sidebarState,
  }: {
    sidebarState: ISidebarState;
  } = useContext(SidebarContext);
  const {
    robotData,
  }: {
    robotData: IRobotData;
  } = useContext(CreateRobotContext);

  const [isShowPreview, setIsShowPreview] = useState<boolean>(false);

  useEffect(() => {
    console.log(sidebarState);
  }, [sidebarState]);

  return (
    <Fragment>
      <ul className="h-10 w-full flex items-center pb-14">
        {[
          `Create Form (${(() => {
            switch (sidebarState?.page) {
              case "robot":
                return "Step 1";
              case "workspacesmanager":
                return "Step 2";
              case "buildsmanager":
                return "Step 3";
            }
          })()})`,
          "Preview JSON",
        ].map((item: any, index: number) => {
          return (
            <li
              key={index}
              className={`w-full flex flex-col gap-3 items-center justify-center text-xs font-medium px-2 transition-all duration-500 min-w-max hover:scale-95 text-layer-light-500 cursor-pointer ${
                isShowPreview &&
                item === "Preview JSON" &&
                "!text-layer-primary-500"
              } 
              ${
                !isShowPreview &&
                item !== "Preview JSON" &&
                "!text-layer-primary-500"
              }
              `}
              onClick={() =>
                setIsShowPreview(item === "Preview JSON" ? true : false)
              }
            >
              <p>{item}</p>
              <span
                className={`w-full bg-layer-light-100 h-[2px]
              ${isShowPreview && item === "Preview JSON" && "!bg-primary"} 
              ${!isShowPreview && item !== "Preview JSON" && "!bg-primary"}
              `}
              />
            </li>
          );
        })}
      </ul>
      {(() => {
        if (isShowPreview) {
          return (
            <div className="bg-black px-4 py-1 !text-sm rounded-md">
              <JSONTree
                data={{
                  robotDetails: robotData?.step1,
                  robotWorkspaces: robotData?.step2,
                  robotBuildSteps: robotData?.step3,
                }}
                theme="bright"
                hideRoot
                invertTheme={false}
                shouldExpandNodeInitially={() => true}
              />
            </div>
          );
        } else {
          switch (sidebarState?.page) {
            case "robot":
              return <CreateRobotFormStep1 />;
            case "workspacesmanager":
              return <CreateRobotFormStep2 />;
            case "buildsmanager":
              return <CreateRobotFormStep3 />;
          }
        }
      })()}
    </Fragment>
  );
}
