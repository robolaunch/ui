import React, { ReactElement, useEffect, useState } from "react";
import "gridstack/dist/gridstack.min.css";
import { GridStack } from "gridstack";
import { useParams } from "react-router-dom";
import ReactDOMServer from "react-dom/server";
import RosCameraWidget from "../../../../components/RosCameraWidget/RosCameraWidget";
import { useAppSelector } from "../../../../hooks/redux";
import { RootState } from "../../../../app/store";
import RosTopicListWidget from "../../../../components/RosTopicListWidget/RosTopicListWidget";
import RosCmdVelWidget from "../../../../components/RosCmdVelWidget/RosCmdVelWidget";
import { CircleMenu, CircleMenuItem } from "react-circular-menu";
import { BsCameraVideo, BsPinMap } from "react-icons/bs";
import { AiOutlineCode, AiOutlinePlus } from "react-icons/ai";
import RosRosOutWidget from "../../../../components/RosRosOutWidget/RosRosOutWidget";
import RosMapWidget from "../../../../components/RosMapWidget/RosMapWidget";
import { CiViewList } from "react-icons/ci";
import { IoMdCodeWorking } from "react-icons/io";
import RosNetworkWidget from "../../../../components/RosNetworkWidget/RosNetworkWidget";
import RosResourceUsageWidget from "../../../../components/RosResourceUsageWidget/RosResourceUsageWidget";
import { GoGraph } from "react-icons/go";
import { BiErrorCircle } from "react-icons/bi";
import RosEmergencyControlWidget from "../../../../components/RosEmergencyControlWidget/RosEmergencyControlWidget";
interface IVisualization {
  ros: any;
  topicList: string[];
  handleForceUpdate: (page: string) => void;
}

export default function Visualization({
  ros,
  topicList,
  handleForceUpdate,
}: IVisualization): ReactElement {
  const [grid, setGrid] = useState<any>();
  const { currentOrganization } = useAppSelector(
    (state: RootState) => state.organization
  );
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

  const url = useParams();

  const [localStoragePath, setLocalStoragePath] = useState<string>(
    `visualization_${currentOrganization.name}_${url.teamName}_${url.roboticsCloudName}_${url.fleetName}_${url.robotName}`
  );
  const [gridLayout, setGridLayout] = useState<any>(() => {
    if (localStorage.getItem(localStoragePath)) {
      return JSON.parse(
        // @ts-ignore
        localStorage.getItem(localStoragePath)
      );
    }

    return [];
  });

  useEffect(() => {
    const grid: any = GridStack.init({
      float: true,
      acceptWidgets: true,
      alwaysShowResizeHandle: true,
      removable: false,
      resizable: {
        handles: "e, se, s, sw, w",
      },
    });
    setGrid(grid);

    grid.on("change", function () {
      setTimeout(() => {
        window.localStorage.setItem(
          // @ts-ignore
          localStoragePath,
          JSON.stringify(grid.save(true, true).children)
        );
      }, 1000);
    });
  }, [localStoragePath]);

  const handleAddWidget = (widget: string) => {
    const temp = grid.save(true, true).children;
    temp.push({
      x: null,
      y: null,
      w: 3,
      h: 3,
      content:
        widget === "RosCameraWidget"
          ? ReactDOMServer.renderToString(
              <RosCameraWidget
                id={grid.save(true, true).children.length}
                ros={ros}
                topicList={topicList}
                localStoragePath={localStoragePath}
                handleRemoveWidget={handleRemoveWidget}
              />
            )
          : widget === "RosTopicListWidget"
          ? ReactDOMServer.renderToString(
              <RosTopicListWidget
                id={grid.save(true, true).children.length}
                ros={ros}
                handleRemoveWidget={handleRemoveWidget}
              />
            )
          : widget === "RosCmdVelWidget"
          ? ReactDOMServer.renderToString(
              <RosCmdVelWidget
                id={grid.save(true, true).children.length}
                ros={ros}
                handleRemoveWidget={handleRemoveWidget}
              />
            )
          : widget === "RosRosOutWidget"
          ? ReactDOMServer.renderToString(
              <RosRosOutWidget
                id={grid.save(true, true).children.length}
                ros={ros}
                handleRemoveWidget={handleRemoveWidget}
              />
            )
          : widget === "RosMapWidget"
          ? ReactDOMServer.renderToString(
              <RosMapWidget
                id={grid.save(true, true).children.length}
                ros={ros}
                handleRemoveWidget={handleRemoveWidget}
              />
            )
          : widget === "RosNetworkWidget"
          ? ReactDOMServer.renderToString(
              <RosNetworkWidget
                id={grid.save(true, true).children.length}
                ros={ros}
                handleRemoveWidget={handleRemoveWidget}
              />
            )
          : widget === "RosResourceUsageWidget"
          ? ReactDOMServer.renderToString(
              <RosResourceUsageWidget
                id={grid.save(true, true).children.length}
                ros={ros}
                handleRemoveWidget={handleRemoveWidget}
              />
            )
          : widget === "RosEmergencyControlWidget" &&
            ReactDOMServer.renderToString(
              <RosEmergencyControlWidget
                id={grid.save(true, true).children.length}
                ros={ros}
                handleRemoveWidget={handleRemoveWidget}
              />
            ),
    });
    window.localStorage.setItem(
      // @ts-ignore
      localStoragePath,
      JSON.stringify(temp)
    );

    handleForceUpdate("Visualization");
  };

  function handleRemoveWidget(id: number) {
    const temp = JSON.parse(
      // @ts-ignore

      localStorage.getItem(localStoragePath)
    );

    temp.splice(id, 1);

    window.localStorage.setItem(
      // @ts-ignore
      localStoragePath,
      JSON.stringify(temp)
    );

    handleForceUpdate("Visualization");
  }

  return (
    <div className="grid grid-cols-1 gap-4 animate__animated animate__fadeIn">
      <div className="col-span-1 grid-stack min-h-[40rem] max-h-[40rem] z-0">
        {gridLayout.map((item: any, index: number) => {
          console.log(item);
          return (
            <div
              key={index}
              className="grid-stack-item ui-draggable ui-resizable"
              gs-w={item.w}
              gs-h={item.h}
              gs-x={item.x}
              gs-y={item.y}
            >
              <div className="grid-stack-item-content">
                {item.content.search("RosCameraWidget") > 0 && (
                  <RosCameraWidget
                    id={index}
                    ros={ros}
                    topicList={topicList}
                    localStoragePath={localStoragePath}
                    handleRemoveWidget={handleRemoveWidget}
                  />
                )}
                {item.content.search("RosTopicListWidget") > 0 && (
                  <RosTopicListWidget
                    id={index}
                    ros={ros}
                    handleRemoveWidget={handleRemoveWidget}
                  />
                )}
                {item.content.search("RosCmdVelWidget") > 0 && (
                  <RosCmdVelWidget
                    id={index}
                    ros={ros}
                    handleRemoveWidget={handleRemoveWidget}
                  />
                )}
                {item.content.search("RosRosOutWidget") > 0 && (
                  <RosRosOutWidget
                    id={index}
                    ros={ros}
                    handleRemoveWidget={handleRemoveWidget}
                  />
                )}
                {item.content.search("RosMapWidget") > 0 && (
                  <RosMapWidget
                    id={index}
                    ros={ros}
                    handleRemoveWidget={handleRemoveWidget}
                  />
                )}
                {item.content.search("RosNetworkWidget") > 0 && (
                  <RosNetworkWidget
                    id={index}
                    ros={ros}
                    handleRemoveWidget={handleRemoveWidget}
                  />
                )}
                {item.content.search("RosResourceUsageWidget") > 0 && (
                  <RosResourceUsageWidget
                    id={index}
                    ros={ros}
                    handleRemoveWidget={handleRemoveWidget}
                  />
                )}
                {item.content.search("RosEmergencyControlWidget") > 0 && (
                  <RosEmergencyControlWidget
                    id={index}
                    ros={ros}
                    handleRemoveWidget={handleRemoveWidget}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="fixed block  bottom-5 left-1/2 right-1/2 z-10">
        <CircleMenu
          startAngle={180}
          rotationAngle={180}
          itemSize={2}
          radius={10}
          rotationAngleInclusive={true}
          menuToggleElement={
            <div className="flex items-center justify-center w-12 h-12 bg-layer-light-50 hover:bg-layer-light-100 rounded-full cursor-pointer border border-layer-light-200 transition-all duration-500 hover:scale-90">
              <AiOutlinePlus
                size={24}
                className={`text-layer-dark-900 ${
                  isOpenMenu && "rotate-45"
                } transition-all duration-500`}
              />
            </div>
          }
          onMenuToggle={(isOpen) => {
            setIsOpenMenu(isOpen);
          }}
        >
          <CircleMenuItem
            tooltip="Camera"
            className="!border !border-layer-light-600 hover:!bg-layer-light-200 shadow-xl hover:scale-90"
            onClick={() => handleAddWidget("RosCameraWidget")}
          >
            <BsCameraVideo size={24} className="text-layer-light-800" />
          </CircleMenuItem>

          <CircleMenuItem
            tooltip="cmd_vel Logs"
            className="!border !border-layer-light-600 hover:!bg-layer-light-200 shadow-xl hover:scale-90"
            onClick={() => handleAddWidget("RosCmdVelWidget")}
          >
            <AiOutlineCode size={26} className="text-layer-light-800" />
          </CircleMenuItem>

          <CircleMenuItem
            tooltip="Topic List"
            className="!border !border-layer-light-600 hover:!bg-layer-light-200 shadow-xl hover:scale-90"
            onClick={() => handleAddWidget("RosTopicListWidget")}
          >
            <CiViewList size={26} className="text-layer-light-800" />
          </CircleMenuItem>

          <CircleMenuItem
            tooltip="ros_out Logs"
            className="!border !border-layer-light-600 hover:!bg-layer-light-200 shadow-xl hover:scale-90"
            onClick={() => handleAddWidget("RosRosOutWidget")}
          >
            <IoMdCodeWorking size={26} className="text-layer-light-800" />
          </CircleMenuItem>

          <CircleMenuItem
            tooltip="Map"
            className="!border !border-layer-light-600 hover:!bg-layer-light-200 shadow-xl hover:scale-90"
            onClick={() => handleAddWidget("RosMapWidget")}
          >
            <BsPinMap size={20} className="text-layer-light-800" />
          </CircleMenuItem>

          <CircleMenuItem
            tooltip="Network"
            className="!border !border-layer-light-600 hover:!bg-layer-light-200 shadow-xl hover:scale-90"
            onClick={() => handleAddWidget("RosNetworkWidget")}
          >
            <BsPinMap size={20} className="text-layer-light-800" />
          </CircleMenuItem>

          <CircleMenuItem
            tooltip="Resorce Usage"
            className="!border !border-layer-light-600 hover:!bg-layer-light-200 shadow-xl hover:scale-90"
            onClick={() => handleAddWidget("RosResourceUsageWidget")}
          >
            <GoGraph size={20} className="text-layer-light-800" />
          </CircleMenuItem>

          <CircleMenuItem
            tooltip="Emergency Control"
            className="!border !border-layer-light-600 hover:!bg-layer-light-200 shadow-xl hover:scale-90"
            onClick={() => handleAddWidget("RosEmergencyControlWidget")}
          >
            <BiErrorCircle size={20} className="text-layer-light-800" />
          </CircleMenuItem>
        </CircleMenu>
      </div>
    </div>
  );
}
