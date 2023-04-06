import React, { Fragment, ReactElement, useEffect, useState } from "react";
import CardLayout from "../../../layouts/CardLayout";
import Accordion from "../../../components/Accordion/Accordion";
import InputToggle from "../../../components/InputToggle/InputToggle";
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
import GridLines from "../../../components/GridLines/GridLines";
import { IoPauseCircleOutline } from "react-icons/io5";
import { EditText } from "react-edit-text";
import randomstring from "randomstring";
import "react-edit-text/dist/index.css";
import { saveAs } from "file-saver";
import { Rnd } from "react-rnd";

interface ITaskManagement {
  ros: any;
}

export default function TaskManagement({ ros }: ITaskManagement): ReactElement {
  const [mouseCoordinates, setMouseCoordinates] = useState<any>({ x: 0, y: 0 });
  const [activeMission, setActiveMission] = useState<number>();
  const [isCostMap, setIsCostMap] = useState<boolean>(true);
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
          // icon: handleMissionIcon(taskType),
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
        <div className="w-full h-full flex items-center gap-2 hover:scale-90 transition-all duration-300">
          <BsPinMap size={20} />
          <span>Go to waypoint</span>
        </div>
      ),
      onClick: () => handleAddWaypointToMission("go"),
    },
    {
      label: (
        <div className="w-full h-full flex items-center gap-2 hover:scale-90 transition-all duration-300">
          <AiOutlinePauseCircle size={22} />
          <span>Go to waypoint and wait</span>
        </div>
      ),

      onClick: () => handleAddWaypointToMission("wait"),
    },
    {
      label: (
        <div className="w-full h-full flex items-center gap-2 hover:scale-90 transition-all duration-300">
          <BsCameraVideo size={20} />
          <span>Go to waypoint and take picture</span>
        </div>
      ),
      onClick: () => handleAddWaypointToMission("picture"),
    },
  ];

  function handleWaypointIcon(type: string) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    return () => {
      rosWaypointsWeb.unsubscribe();
      map.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(missions);
  }, [missions]);

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
    <div className="grid grid-cols-12 gap-6 h-[42rem]">
      <CardLayout className="col-span-12 lg:col-span-5 xl:col-span-4 2xl:col-span-3 !p-4">
        <Fragment>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <div onClick={() => setIsCostMap(!isCostMap)}>cosmap</div>
              <div onClick={() => handleExportJSON()}>export</div>
              <input type="file" onChange={(e: any) => handleImportJSON(e)} />
            </div>

            {missions.map((mission: any, missionIndex: number) => {
              return (
                <Accordion
                  activeMission={activeMission}
                  setActiveMission={setActiveMission}
                  id={missionIndex}
                  key={missionIndex}
                  header={
                    <div className="w-full flex items-center justify-between">
                      <span className="text-xs font-bold text-layer-dark-500">
                        <EditText
                          value={mission?.name}
                          onChange={(e: any) => {
                            if (e.target.value.length < 16) {
                              setMissions((prev: any) => {
                                let temp = [...prev];
                                temp[missionIndex].name = e.target.value;
                                return temp;
                              });
                            }
                          }}
                        />
                      </span>
                      <div className="flex items-center gap-3">
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
                      </div>
                    </div>
                  }
                >
                  <div className="flex flex-col gap-2">
                    {mission?.waypoints?.map(
                      (waypoint: any, waypointIndex: number) => {
                        return (
                          <div className="flex justify-between items-center p-2 border border-layer-light-100 rounded-lg">
                            <div className="flex items-center ">
                              <div className="flex items-center justify-center p-2">
                                {handleWaypointIcon(waypoint?.taskType)}
                              </div>
                              <div className="text-sm flex items-center gap-2">
                                <EditText
                                  className="!text-xs !font-medium"
                                  value={waypoint?.name}
                                  onChange={(e) => {
                                    if (e.target.value.length < 16) {
                                      setMissions((prev: any) => {
                                        let temp = [...prev];
                                        temp[missionIndex].waypoints[
                                          waypointIndex
                                        ].name = e.target.value;
                                        return temp;
                                      });
                                    }
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
                            <div className="flex gap-4">
                              <CgTrashEmpty
                                className="cursor-pointer hover:scale-90 transition-all duration-300 text-red-800"
                                size={20}
                                onClick={() => {
                                  setMissions((prev: any) => {
                                    let temp = [...prev];
                                    temp[missionIndex].waypoints.splice(
                                      waypointIndex,
                                      1
                                    );
                                    return temp;
                                  });
                                }}
                              />
                              <BsPlayCircle
                                className="cursor-pointer hover:scale-90 transition-all duration-300"
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
                            </div>
                          </div>
                        );
                      }
                    )}
                    {mission?.waypoints?.length === 0 && (
                      <div className="flex items-center justify-center">
                        <span className="text-xs text-layer-dark-500">
                          No waypoints
                        </span>
                      </div>
                    )}
                  </div>
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
          <div className="w-full flex items-center gap-4 text-xs">
            <span>
              img: {mouseRef?.current?.clientWidth} x{" "}
              {mouseRef?.current?.clientHeight}
            </span>
            <span>x: {mouse.x}</span>
            <span>y: {mouse.y}</span>{" "}
            <span>
              rosX:
              {((rosMapDetails?.x / mouseRef?.current?.clientWidth) * mouse?.x!)
                .toString()
                .slice(0, 5)}
            </span>
            <span>
              rosY:
              {(
                (rosMapDetails?.y / mouseRef?.current?.clientHeight) *
                mouse?.y!
              )
                .toString()
                .slice(0, 5)}
            </span>
          </div>
        </Fragment>
      </CardLayout>
      <CardLayout className="col-span-12 lg:col-span-7 xl:col-span-8 2xl:col-span-9">
        <div
          className="w-full h-full flex items-center justify-center
        
          
        "
          style={{
            background:
              "linear-gradient(135deg, rgba(127,127,127,1) 0%, rgba(23,23,23,1) 100%)",
          }}
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
              className="relative border border-layer-dark-400 cursor-pointer"
              onClick={(e: any) => {
                if (e.detail === 2) {
                  handleStartWaypoint({
                    id: randomstring.generate(7),
                    type: "waypoint",
                    taskType: "go",
                    x: null,
                    y: null,
                  });
                }
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
                )}&costmap=${isCostMap ? "true" : "false"}`}
              />
              {missions[activeMission!]?.waypoints?.map(
                (waypoint: any, waypointIndex: number) => {
                  return (
                    <Rnd
                      maxHeight={"100%"}
                      maxWidth={"100%"}
                      className="!relative z-50 bg-slate-800"
                      enableResizing={false}
                      onDragStop={(e: any, d: any) => {
                        setMouseCoordinates({
                          x:
                            (rosMapDetails?.x /
                              mouseRef?.current?.clientWidth) *
                              mouse?.x! -
                            rosMapDetails?.x / 2,
                          y:
                            ((rosMapDetails?.y /
                              mouseRef?.current?.clientHeight) *
                              mouse?.y! -
                              rosMapDetails?.y / 2) *
                            -1,
                        });

                        setMissions((prev: any) => {
                          let temp = [...prev];
                          temp[activeMission!].waypoints[
                            waypointIndex
                          ].coordinates = {
                            x: mouseCoordinates?.x,
                            y: mouseCoordinates?.y,
                          };
                          return temp;
                        });
                      }}
                    >
                      <div
                        className="absolute inset-0 flex flex-col z-40"
                        style={{
                          top:
                            (mouseRef?.current?.clientHeight /
                              rosMapDetails?.y) *
                              (rosMapDetails?.y / 2 -
                                waypoint?.coordinates?.y) -
                            18,
                          left:
                            (mouseRef?.current?.clientWidth /
                              rosMapDetails?.x) *
                              (rosMapDetails?.x / 2 +
                                waypoint?.coordinates?.x) -
                            12,
                        }}
                      >
                        {handleWaypointIcon(waypoint?.taskType)}
                        <span className="text-layer-dark-100 text-[0.64rem] -ml-4">
                          {waypoint?.name}
                        </span>
                      </div>
                    </Rnd>
                  );
                }
              )}
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
