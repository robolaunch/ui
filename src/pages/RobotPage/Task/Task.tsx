import React, { Fragment, ReactElement, useEffect, useState } from "react";
import CardLayout from "../../../layouts/CardLayout";
import Draggable from "react-draggable";
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
import { TbMapPinFilled } from "react-icons/tb";
import saveAs from "file-saver";
import handleRostoDomMouseCoordinatesConverter from "../../../helpers/handleRostoDomMouseCoordinatesConverter";
import { FaLocationArrow } from "react-icons/fa";
import RosRobotLocation from "../../../components/RosRobotLocation/RosRobotLocation";
interface ITask {
  ros: any;
}

export default function Task({ ros }: ITask): ReactElement {
  const [activeMission, setActiveMission] = useState<number>(-1);
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

  const map = new ROSLIB.Topic({
    ros: ros,
    name: "/map",
    messageType: "nav_msgs/msg/OccupancyGrid",
  });

  const rosWaypointsWeb = new ROSLIB.Topic({
    ros: ros,
    name: "/way_points_web",
    messageType: "std_msgs/msg/String",
  });

  useEffect(() => {
    rosWaypointsWeb?.subscribe(function (message: any) {
      console.log(message);
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
      rosWaypointsWeb?.unsubscribe();
    };
  }, []);

  function handleAddWaypointToMission(type: string) {
    let temp = [...missions];
    temp[activeMission].waypoints.push({
      id: randomstring.generate(8),
      name: "Waypoint",
      taskType: type,
      coordinates: {
        x: rightClickRosMapCoordinates?.x,
        y: rightClickRosMapCoordinates?.y,
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
                    <div className="flex flex-col gap-2">
                      {mission?.waypoints?.map(
                        (waypoint: any, waypointIndex: number) => {
                          return (
                            <div key={waypointIndex} className="flex gap-2">
                              {getWaypointIcon({
                                type: waypoint?.taskType,
                              })}

                              <div className="flex flex-col gap-1 text-xs">
                                <div>{waypoint?.name}</div>
                                <div>
                                  {String(waypoint?.coordinates?.x).slice(0, 5)}{" "}
                                  x{" "}
                                  {String(waypoint?.coordinates?.y).slice(0, 5)}
                                </div>
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>
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
        <CardLayout
          className="!relative h-full"
          style={{
            backgroundImage: `url(/images/bg-transparent.png)`,
          }}
        >
          <TransformWrapper
            disabled={isDragging}
            onWheel={(e: any) => {
              setSceneScale(e.state.scale);
            }}
          >
            <TransformComponent>
              <div className="w-full flex items-center justify-center">
                <div
                  className="relative border-4 border-layer-dark-600"
                  style={{
                    width: rosMapDetails?.resolution?.x + "px",
                    height: rosMapDetails?.resolution?.y + "px",
                  }}
                >
                  <iframe
                    title="map"
                    style={{
                      width: rosMapDetails?.resolution?.x + "px",
                      height: rosMapDetails?.resolution?.y + "px",
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
                    {activeMission !== -1 &&
                      missions[activeMission]?.waypoints?.map(
                        (waypoint: any, waypointIndex: number) => {
                          return (
                            <Draggable
                              key={waypointIndex}
                              scale={sceneScale}
                              defaultPosition={handleRostoDomMouseCoordinatesConverter(
                                {
                                  rosMapWebsocketWidth:
                                    rosMapDetails?.resolution?.x,
                                  rosMapWebsocketHeight:
                                    rosMapDetails?.resolution?.y,
                                  rosMapWidth: rosMapDetails?.x,
                                  rosMapHeight: rosMapDetails?.y,
                                  waypointX: waypoint?.coordinates?.x,
                                  waypointY: waypoint?.coordinates?.y,
                                }
                              )}
                              onStart={() => setIsDragging(true)}
                              onStop={(e, data) => {
                                setIsDragging(false);
                                console.log(e, data);

                                const waypointCoordinates =
                                  handleDomRosMouseCoordinatesConverter({
                                    domMapMouseX: data.x,
                                    domMapMouseY: data.y,
                                    sceneScale: sceneScale,
                                    rosMapWebsocketWidth:
                                      rosMapDetails?.resolution?.x,
                                    rosMapWebsocketHeight:
                                      rosMapDetails?.resolution?.y,
                                    rosMapWidth: rosMapDetails?.x,
                                    rosMapHeight: rosMapDetails?.y,
                                  });

                                setMissions((prev: any) => {
                                  let temp = [...prev];

                                  temp[activeMission].waypoints[
                                    waypointIndex
                                  ].coordinates = {
                                    x: waypointCoordinates?.x,
                                    y: waypointCoordinates?.y,
                                  };
                                  return temp;
                                });
                              }}
                              axis="both"
                              disabled={activeMission === -1 ? true : false}
                              bounds="parent"
                              defaultClassNameDragging="cursor-move"
                            >
                              <div className="absolute !-top-5 ">
                                <TbMapPinFilled
                                  className="text-layer-secondary-500"
                                  size={24}
                                />
                              </div>
                            </Draggable>
                          );
                        }
                      )}
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
