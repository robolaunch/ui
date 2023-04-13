import React, { Fragment, ReactElement, useEffect, useState } from "react";
import CardLayout from "../../../layouts/CardLayout";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import ROSLIB from "roslib";
import randomstring from "randomstring";
import { CgTrashEmpty } from "react-icons/cg";
import { BsPlayCircle } from "react-icons/bs";
import InputToggle from "../../../components/InputToggle/InputToggle";
import Accordion from "../../../components/Accordion/Accordion";
import { useContextMenu } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";
import useMouse from "@react-hook/mouse-position";
import handleDomRosMouseCoordinatesConverter from "../../../helpers/handleDomtoRosMouseCoordinatesConverter";
import TaskManagementContextMenu from "../../../components/TaskManagementContextMenu/TaskManagementContextMenu";
import getWaypointIcon from "../../../helpers/GetWaypointIcon";
import saveAs from "file-saver";
import RosRobotLocation from "../../../components/RosRobotLocation/RosRobotLocation";
import RosDraggableWaypoint from "../../../components/RosDraggableWaypoint/RosDraggableWaypoint";
import GridLines from "../../../components/GridLines/GridLines";
import { FaFlagCheckered, FaLocationArrow } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";
import RosWaypointList from "../../../components/RosWaypointList/RosWaypointList";
import RosMapWaypointLayout from "../../../components/RosMapWaypointLayout/RosMapWaypointLayout";

interface ITask {
  ros: any;
}

export default function Task({ ros }: ITask): ReactElement {
  const [activeMission, setActiveMission] = useState<number>(-1);
  const [hoverWaypoint, setHoverWaypoint] = useState<number>(-1);
  const [isCostMapActive, setIsCostMapActive] = useState<boolean>(true);
  const [sceneScale, setSceneScale] = useState<number>(1);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [rightClickRosMapCoordinates, setRightClickRosMapCoordinates] =
    useState<any>();
  const [rosMapDetails, setRosMapDetails] = useState<any>({
    x: 0,
    y: 0,
  });
  const [missions, setMissions] = useState<any>([
    {
      id: randomstring.generate(8),
      name: "Mission 1",
      active: true,
      waypoints: [],
    },
    {
      id: randomstring.generate(8),
      name: "Mission 2",
      active: true,
      waypoints: [],
    },
    {
      id: randomstring.generate(8),
      name: "Mission 3",
      active: true,
      waypoints: [],
    },
  ]);

  const mouseRef = React.useRef<any>(null);
  const mouse = useMouse(mouseRef, {
    enterDelay: 100,
    leaveDelay: 100,
  });

  useEffect(() => {
    const map = new ROSLIB.Topic({
      ros: ros,
      name: "/map",
      messageType: "nav_msgs/msg/OccupancyGrid",
    });

    map?.subscribe(function (message: any) {
      setRosMapDetails({
        resolution: {
          x: message.info.width,
          y: message.info.height,
        },
        x: message.info.origin.position.x * -2,
        y: message.info.origin.position.y * -2,
      });
    });

    return () => {
      map?.unsubscribe();
    };
  }, []);

  interface IhandleAddWaypointToMission {
    type: string;
    x?: number;
    y?: number;
  }

  function handleAddWaypointToMission({
    type,
    x,
    y,
  }: IhandleAddWaypointToMission) {
    let temp = [...missions];
    temp[activeMission].waypoints.push({
      id: randomstring.generate(8),
      name: "Waypoint",
      taskType: type,
      coordinates: {
        x: x || rightClickRosMapCoordinates?.x,
        y: y || rightClickRosMapCoordinates?.y,
      },
    });
    setMissions(temp);
  }

  const MENU_ID = "context-menu";
  const { show } = useContextMenu({
    id: MENU_ID,
  });
  function displayMenu(e: any) {
    show({
      event: e,
    });
  }

  function handleExportJSON() {
    var blob = new Blob([JSON.stringify(missions)], {
      type: "text/plain;charset=utf-8",
    });
    saveAs(blob, `missions.json`);
  }

  function handleImportJSON(e: any) {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      setMissions(JSON.parse(e.target?.result as string));
    };
  }

  return (
    <div className="w-full h-[42rem] grid grid-cols-10 gap-6">
      <div className="h-full col-span-2">
        <CardLayout>
          <Fragment>
            <div className="h-full flex gap-2">
              <div onClick={() => handleExportJSON()}>export</div>
              <input type="file" onChange={(e: any) => handleImportJSON(e)} />
            </div>
            <div className="flex flex-col gap-1">
              {missions?.map((mission: any, missionIndex: number) => {
                return (
                  <Accordion
                    key={missionIndex}
                    isOpen={activeMission}
                    setIsOpen={setActiveMission}
                    id={missionIndex}
                    header={
                      <div className="flex items-center justify-between">
                        <span>{mission?.name}</span>
                        <div className="flex gap-2">
                          <CgTrashEmpty
                            className="cursor-pointer hover:scale-90 transition-all duration-300 text-red-800"
                            size={20}
                            onClick={() => {
                              setMissions((prev: any) => {
                                let temp = [...prev];
                                temp.splice(missionIndex, 1);
                                return temp;
                              });
                            }}
                          />
                          <InputToggle
                            icons={false}
                            checked={mission?.active}
                            onChange={() => {
                              setMissions((prev: any) => {
                                let temp = [...prev];
                                temp[missionIndex].active =
                                  !temp[missionIndex].active;
                                return temp;
                              });
                            }}
                          />
                          <BsPlayCircle
                            className="cursor-pointer hover:scale-90 transition-all duration-300"
                            size={20}
                          />
                        </div>
                      </div>
                    }
                  >
                    <RosWaypointList
                      setMissions={setMissions}
                      missions={missions}
                      mission={mission}
                      activeMission={activeMission}
                    />
                  </Accordion>
                );
              })}
            </div>
            <div className="flex flex-col text-xs pt-14">
              <span>
                Mouse Map Location on DOM: {mouse?.x} X {mouse?.y}
                {rosMapDetails?.resolution?.y}
              </span>
              <span>
                Map Resolution on DOM: {mouse?.elementWidth} X{" "}
                {mouse?.elementHeight}
              </span>
              <span>
                Map Resolution on Websocket: {rosMapDetails?.resolution?.x} X{" "}
                {rosMapDetails?.resolution?.y}
              </span>
              <span>
                Map Resolution on ROS: {rosMapDetails?.x} X {rosMapDetails?.y}
              </span>
            </div>
          </Fragment>
        </CardLayout>
      </div>

      <div className="h-full col-span-8">
        <CardLayout className="!relative h-full">
          <Fragment>
            <TransformWrapper
              disabled={isDragging}
              onWheel={(e: any) => {
                setSceneScale(e.state.scale);
              }}
            >
              <TransformComponent>
                <div
                  style={{
                    backgroundImage: `url(/images/bg-transparent.png)`,
                  }}
                  className="w-full flex items-center justify-center"
                >
                  <div
                    className="relative border-4 border-layer-dark-600"
                    style={{
                      width: `${rosMapDetails?.resolution?.x}px`,
                      height: `${rosMapDetails?.resolution?.y}px`,
                    }}
                  >
                    <iframe
                      title="map"
                      style={{
                        width: `${rosMapDetails?.resolution?.x}px`,
                        height: `${rosMapDetails?.resolution?.y}px`,
                        maxHeight: "100%",
                        maxWidth: "100%",
                        pointerEvents: "none",
                      }}
                      src={`/html/rosMap.html?ws=${ros.socket.url.slice(
                        0,
                        ros.socket.url.length - 1
                      )}&costmap=${isCostMapActive ? "true" : "false"}`}
                    />

                    <div
                      ref={mouseRef}
                      onContextMenu={(e) => {
                        setRightClickRosMapCoordinates(
                          handleDomRosMouseCoordinatesConverter({
                            domMapMouseX: mouse?.x,
                            domMapMouseY: mouse?.y,
                            sceneScale: sceneScale,
                            rosMapWebsocketWidth: rosMapDetails?.resolution?.x,
                            rosMapWebsocketHeight: rosMapDetails?.resolution?.y,
                            rosMapWidth: rosMapDetails?.x,
                            rosMapHeight: rosMapDetails?.y,
                          })
                        );

                        e.preventDefault();
                        displayMenu(e);
                      }}
                      className="absolute inset-0"
                    >
                      <GridLines
                        columns={rosMapDetails?.x}
                        rows={rosMapDetails?.y}
                      />
                      <RosMapWaypointLayout
                        activeMission={activeMission}
                        missions={missions}
                        setMissions={setMissions}
                        rosMapDetails={rosMapDetails}
                        sceneScale={sceneScale}
                        setIsDragging={setIsDragging}
                        hoverWaypoint={hoverWaypoint}
                      />
                      <RosRobotLocation
                        ros={ros}
                        rosMapWebsocketWidth={rosMapDetails?.resolution?.x}
                        rosMapWebsocketHeight={rosMapDetails?.resolution?.y}
                        rosMapWidth={rosMapDetails?.x}
                        rosMapHeight={rosMapDetails?.y}
                      />
                    </div>
                  </div>
                </div>
              </TransformComponent>
            </TransformWrapper>
            {activeMission !== -1 &&
              missions[activeMission]?.waypoints.length && (
                <div className="absolute top-4 w-full flex items-center justify-center animate__animated animate__fadeIn overflow-auto">
                  <div className="w-[96%] flex p-1 justify-around rounded-lg border border-layer-light-200 bg-layer-light-50">
                    <div className="flex items-center justify-center">
                      <FaLocationArrow
                        className="text-layer-secondary-500"
                        size={12}
                      />
                    </div>
                    <div className="flex items-center justify-center animate__animated animate__fadeIn">
                      <BsArrowRight />
                    </div>
                    {missions[activeMission]?.waypoints?.map(
                      (waypoint: any, waypointIndex: number) => {
                        return (
                          <Fragment>
                            <div
                              key={waypointIndex}
                              onMouseEnter={() =>
                                setHoverWaypoint(waypointIndex)
                              }
                              onMouseLeave={() => setHoverWaypoint(-1)}
                              className="flex gap-2 px-3 py-1 rounded-md items-center justify-center hover:bg-layer-light-100 transition-all duration-300 animate__animated animate__fadeIn"
                            >
                              <span className="text-xs text-layer-light-50 flex items-center justify-center w-5 h-5 rounded-full bg-layer-secondary-500 ">
                                {waypointIndex + 1}
                              </span>

                              {getWaypointIcon({
                                type: waypoint?.taskType,
                              })}

                              <div className="flex flex-col items-center text-xs">
                                <span>{waypoint?.name}</span>
                                <span>
                                  {String(waypoint?.coordinates?.x).slice(0, 5)}{" "}
                                  x{" "}
                                  {String(waypoint?.coordinates?.y).slice(0, 5)}
                                </span>
                              </div>
                            </div>
                            {waypointIndex !==
                              missions[activeMission]?.waypoints.length - 1 && (
                              <div className="flex items-center justify-center animate__animated animate__fadeIn">
                                <div id="test"></div>
                              </div>
                            )}
                          </Fragment>
                        );
                      }
                    )}
                    <div className="flex items-center justify-center animate__animated animate__fadeIn">
                      <BsArrowRight />
                    </div>
                    <div className="flex items-center justify-center animate__animated animate__fadeIn">
                      <FaFlagCheckered
                        className="text-layer-secondary-500"
                        size={16}
                      />
                    </div>
                  </div>
                </div>
              )}
            <div className="absolute bottom-4 w-full flex items-center justify-center">
              <div className="flex rounded-lg border border-layer-light-200 bg-layer-light-50">
                <span className="py-2 px-4 hover:bg-layer-light-100 transition-all duration-300">
                  controlbar
                </span>
                <span className="py-2 px-4 hover:bg-layer-light-100 transition-all duration-300">
                  controlbar
                </span>{" "}
                <span className="py-2 px-4 hover:bg-layer-light-100 transition-all duration-300">
                  controlbar
                </span>
              </div>
            </div>
          </Fragment>
        </CardLayout>
      </div>
      <TaskManagementContextMenu
        MENU_ID={MENU_ID}
        handleAddWaypointToMission={handleAddWaypointToMission}
        activeMission={activeMission}
        handleCostMap={() => {
          setIsCostMapActive((prev) => !prev);
        }}
        isCostMapActive={isCostMapActive}
      />
    </div>
  );
}
