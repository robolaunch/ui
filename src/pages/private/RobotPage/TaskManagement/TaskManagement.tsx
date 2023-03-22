import React, { Fragment, ReactElement, useEffect, useState } from "react";
import CardLayout from "../../../../layouts/CardLayout";
import Accordion from "../../../../components/Accordion/Accordion";
import InputToggle from "../../../../components/InputToggle/InputToggle";
import { RxDotsVertical } from "react-icons/rx";
import {
  BsPinMap,
  BsCameraVideo,
  BsPlusCircle,
  BsPlayCircle,
} from "react-icons/bs";
import { CgTrashEmpty } from "react-icons/cg";
import useMouse from "@react-hook/mouse-position";
import { ContextMenu } from "@ni7r0g3n/react-context-menu";
import { AiOutlinePauseCircle } from "react-icons/ai";
import { CiMapPin } from "react-icons/ci";
import { toast } from "sonner";
import ROSLIB from "roslib";
import GridLines from "../../../../components/GridLines/GridLines";
import { IoPauseCircleOutline } from "react-icons/io5";
import { EditText } from "react-edit-text";
import "react-edit-text/dist/index.css";
import randomstring from "randomstring";

interface ITaskManagement {
  ros: any;
}

export default function TaskManagement({ ros }: ITaskManagement): ReactElement {
  const [mouseCoordinates, setMouseCoordinates] = useState<any>({ x: 0, y: 0 });
  const [activeMission, setActiveMission] = useState<number>();
  const [missions, setMissions] = useState<any>([
    {
      id: randomstring.generate(8),
      name: "Mission 1",
      active: true,
      waypoints: [],
    },
  ]);
  const [rosMapDetails, setRosMapDetails] = useState<any>({
    x: 0,
    y: 0,
  });

  const mouseRef = React.useRef<any>(null);
  const mouse = useMouse(mouseRef, {
    enterDelay: 100,
    leaveDelay: 100,
  });

  function handleAddMission() {
    setMissions((prev: any) => {
      return [
        ...prev,
        {
          id: randomstring.generate(8),
          name: "Mission " + Number(prev?.length + 1),
          active: true,
          waypoints: [],
        },
      ];
    });
  }

  function handleAddWaypointToMission(taskType: string) {
    if (activeMission !== -1) {
      setMissions((prev: any) => {
        let temp = [...prev];
        temp[activeMission!]?.waypoints?.push({
          id: randomstring.generate(8),
          name: "Waypoint " + Number(temp[activeMission!].waypoints.length + 1),
          taskType: taskType,
          coordinates: {
            x: mouseCoordinates?.x,
            y: mouseCoordinates?.y,
          },
          icon: handleMissionIcon(taskType),
        });

        return temp;
      });
    } else {
      toast.error("Please right click on the map to add a waypoint");
    }
  }

  const items = [
    {
      label: (
        <div className="w-full h-full flex items-center gap-2 hover:scale-90 transition-all duration-500">
          <BsPinMap size={20} />
          <span>Go to waypoint</span>
        </div>
      ),
      onClick: () => handleAddWaypointToMission("go"),
    },
    {
      label: (
        <div className="w-full h-full flex items-center gap-2 hover:scale-90 transition-all duration-500">
          <AiOutlinePauseCircle size={22} />
          <span>Go to waypoint and wait</span>
        </div>
      ),

      onClick: () => handleAddWaypointToMission("wait"),
    },
    {
      label: (
        <div className="w-full h-full flex items-center gap-2 hover:scale-90 transition-all duration-500">
          <BsCameraVideo size={20} />
          <span>Go to waypoint and take picture</span>
        </div>
      ),
      onClick: () => handleAddWaypointToMission("picture"),
    },
  ];

  function handleMissionIcon(type: string) {
    switch (type) {
      case "go":
        return <CiMapPin size={20} />;
      case "wait":
        return <IoPauseCircleOutline size={20} />;
      case "picture":
        return <BsCameraVideo size={20} />;
    }
  }

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
      map.unsubscribe();
    };
  }, []);

  const rosWaypointsWeb = new ROSLIB.Topic({
    ros: ros,
    name: "/way_points_web",
    messageType: "std_msgs/msg/String",
  });

  useEffect(() => {
    rosWaypointsWeb?.subscribe(function (message: any) {
      console.log(message);
    });

    return () => {
      rosWaypointsWeb.unsubscribe();
    };
  }, []);

  function handleStartWaypoint(data: any) {
    let x =
      (rosMapDetails?.x / mouseRef?.current?.clientWidth) * mouse?.x! -
      rosMapDetails?.x / 2;
    let y =
      ((rosMapDetails?.y / mouseRef?.current?.clientHeight) * mouse?.y! -
        rosMapDetails?.y / 2) *
      -1;

    console.log(
      `${data.id}_${data.type}_${data.taskType}&${data.x ? data.x : x}/${
        data.y ? data.y : y
      }`
    );

    rosWaypointsWeb.publish({
      data: `${data.id}_${data.type}_${data.taskType}&${data.x ? data.x : x}/${
        data.y ? data.y : y
      }`,
    });
  }

  function handleStartMission(data: string) {
    console.log(data);

    rosWaypointsWeb.publish({
      data: data,
    });
  }

  useEffect(() => {
    console.log(missions);
  }, [missions]);

  return (
    <div className="grid grid-cols-12 gap-6 h-[42rem]">
      <CardLayout className="col-span-3 !p-4">
        <Fragment>
          <div className="flex flex-col gap-2">
            {missions.map((mission: any, missionIndex: number) => {
              return (
                <Accordion
                  setActiveMission={setActiveMission}
                  id={missionIndex}
                  header={
                    <div className="w-full flex items-center justify-between">
                      <span className="text-sm font-medium text-layer-dark-500">
                        <EditText
                          value={mission?.name}
                          onChange={(e: any) => {
                            setMissions((prev: any) => {
                              let temp = [...prev];
                              temp[missionIndex].name = e.target.value;
                              return temp;
                            });
                          }}
                        />
                      </span>
                      <div className="flex items-center gap-3">
                        <BsPlayCircle
                          size={24}
                          onClick={() => {
                            let temp = mission?.waypoints?.map(
                              (waypoint: any, waypointIndex: number) => {
                                return `${waypoint?.taskType}&${
                                  waypoint?.coordinates?.x
                                }/${waypoint?.coordinates?.y}${
                                  waypointIndex !==
                                  mission?.waypoints?.length - 1
                                    ? "|"
                                    : ""
                                }`;
                              }
                            );
                            handleStartMission(
                              `${mission.id}_mission_${temp
                                .toString()
                                .replace(/,/g, "")}`
                            );
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
                        <RxDotsVertical />
                      </div>
                    </div>
                  }
                >
                  {mission?.waypoints?.map(
                    (waypoint: any, waypointIndex: number) => {
                      return (
                        <div className="flex justify-between items-center p-2 border border-layer-light-200 rounded-lg">
                          <div className="flex items-center ">
                            <BsPlayCircle
                              size={18}
                              onClick={() =>
                                handleStartWaypoint({
                                  id: waypoint?.id,
                                  type: "waypoint",
                                  taskType: waypoint.taskType,
                                  x: waypoint?.coordinates?.x,
                                  y: waypoint?.coordinates?.y,
                                })
                              }
                            />
                            <div className="flex items-center justify-center p-2">
                              {waypoint?.icon}
                            </div>
                            <div className="text-sm flex items-center gap-2">
                              <EditText
                                className="!text-xs !font-semibold"
                                value={waypoint?.name}
                                onChange={(e) => {
                                  setMissions((prev: any) => {
                                    let temp = [...prev];
                                    temp[missionIndex].waypoints[
                                      waypointIndex
                                    ].name = e.target.value;
                                    return temp;
                                  });
                                }}
                              />
                              <div className="flex gap-2 text-xs font-extralight">
                                <span>
                                  x:{" "}
                                  {waypoint?.coordinates?.x
                                    ?.toString()
                                    .slice(0, 5)}
                                </span>
                                <span>
                                  y:{" "}
                                  {waypoint?.coordinates?.y
                                    ?.toString()
                                    .slice(0, 5)}
                                </span>
                              </div>
                            </div>
                          </div>
                          <CgTrashEmpty size={20} />
                        </div>
                      );
                    }
                  )}
                </Accordion>
              );
            })}
          </div>
          <div className="w-full flex items-center justify-center p-8">
            <button
              className="hover:scale-90 transition-all duration-500"
              onClick={() => handleAddMission()}
            >
              <BsPlusCircle size={24} />
            </button>
          </div>
          <div className="flex flex-col gap-4">
            <span>
              img: {mouseRef?.current?.clientWidth} x{" "}
              {mouseRef?.current?.clientHeight}
            </span>
            <span>x: {mouse.x}</span>
            <span>y: {mouse.y}</span>{" "}
            <span>
              GGX:{" "}
              {(rosMapDetails?.x / mouseRef?.current?.clientWidth) * mouse?.x!}
            </span>
            <span>
              GGY:{" "}
              {(rosMapDetails?.y / mouseRef?.current?.clientHeight) * mouse?.y!}
            </span>
          </div>
        </Fragment>
      </CardLayout>
      <CardLayout className="col-span-9 ">
        <div
          className="w-full h-full flex items-center justify-center
        bg-[#7f7f7f]
        "
        >
          <ContextMenu
            onOpen={() => {
              if (activeMission === -1) {
                toast.error(
                  "if you want to add a waypoint, you need to open or create a mission"
                );
              } else {
                setMouseCoordinates({
                  x:
                    (rosMapDetails?.x / mouseRef?.current?.clientWidth) *
                      mouse?.x! -
                    rosMapDetails?.x / 2,
                  y:
                    ((rosMapDetails?.y / mouseRef?.current?.clientHeight) *
                      mouse?.y! -
                      rosMapDetails?.y / 2) *
                    -1,
                });
              }
            }}
            adaptive={true}
            items={activeMission !== -1 ? items : []}
          >
            <div
              ref={mouseRef}
              className="relative border border-layer-dark-400"
              onClick={() =>
                handleStartWaypoint({
                  id: randomstring.generate(7),
                  type: "waypoint",
                  taskType: "go",
                  x: null,
                  y: null,
                })
              }
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
                src={"/html/rosMap.html?" + ros.socket.url}
              />
              {missions[activeMission!]?.waypoints?.map((waypoint: any) => {
                return (
                  <div
                    className="absolute inset-0 flex flex-col"
                    style={{
                      top:
                        (mouseRef?.current?.clientHeight / rosMapDetails?.y) *
                          (rosMapDetails?.y / 2 - waypoint?.coordinates?.y) -
                        18,
                      left:
                        (mouseRef?.current?.clientWidth / rosMapDetails?.x) *
                          (rosMapDetails?.x / 2 + waypoint?.coordinates?.x) -
                        12,
                    }}
                  >
                    {waypoint?.icon}
                    <span className="text-layer-dark-100 text-[0.64rem] -ml-4">
                      {waypoint?.name}
                    </span>
                  </div>
                );
              })}
              <div className="absolute inset-0">
                <GridLines
                  columns={Math.round(rosMapDetails?.x || 0)}
                  rows={Math.round(rosMapDetails?.y || 0)}
                />
              </div>
            </div>
          </ContextMenu>
        </div>
      </CardLayout>
    </div>
  );
}
