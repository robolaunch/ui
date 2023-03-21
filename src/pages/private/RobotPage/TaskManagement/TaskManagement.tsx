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

interface ITaskManagement {
  ros: any;
}

export default function TaskManagement({ ros }: ITaskManagement): ReactElement {
  const [mouseCoordinates, setMouseCoordinates] = useState<any>({ x: 0, y: 0 });
  const [activeMission, setActiveMission] = useState<number>();
  const [missions, setMissions] = useState<any>([
    {
      name: "Mission 1",
      active: true,
      waypoints: [],
    },
    {
      name: "Mission 2",
      active: false,
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

  function handleaddWaypointToMission(type: string) {
    if (activeMission !== -1) {
      setMissions((prev: any) => {
        let temp = [...prev];
        temp[activeMission!]?.waypoints?.push({
          name: "Waypoint " + Number(temp[activeMission!].waypoints.length + 1),
          type: type,
          coordinates: {
            x: mouseCoordinates?.x,
            y: mouseCoordinates?.y,
          },
          icon: handleMissionIcon(type),
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
          <span>Go to waypoint </span>
        </div>
      ),
      onClick: () => handleaddWaypointToMission("go"),
    },
    {
      label: (
        <div className="w-full h-full flex items-center gap-2 hover:scale-90 transition-all duration-500">
          <AiOutlinePauseCircle size={20} />
          <span>Go to waypoint and wait</span>
        </div>
      ),

      onClick: () => handleaddWaypointToMission("go_wait"),
    },
    {
      label: (
        <div className="w-full h-full flex items-center gap-2 hover:scale-90 transition-all duration-500">
          <BsCameraVideo size={20} />
          <span>Go to waypoint </span>
        </div>
      ),
      onClick: () => handleaddWaypointToMission("go_takePicture"),
    },
  ];

  function handleMissionIcon(type: string) {
    switch (type) {
      case "go":
        return <CiMapPin size={20} />;
      case "go_wait":
        return <AiOutlinePauseCircle size={20} />;
      case "go_takePicture":
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

  function handleSetWaypointsCoordinates(type: string) {
    let x =
      (rosMapDetails?.x / mouseRef?.current?.clientWidth) * mouse?.x! -
      rosMapDetails?.x / 2;
    let y =
      ((rosMapDetails?.y / mouseRef?.current?.clientHeight) * mouse?.y! -
        rosMapDetails?.y / 2) *
      -1;

    handleWaypoints({
      x: x,
      y: y,
    });
  }

  function handleWaypoints(coordinates: any) {
    var waypoints = new ROSLIB.Topic({
      ros: ros,
      name: "/way_points_web",
      messageType: "std_msgs/msg/String",
    });

    console.log("work", coordinates);
    waypoints.publish({
      data: coordinates.x + `/` + coordinates.y,
    });
  }

  function handleStartMission(paths: string) {
    var waypoints = new ROSLIB.Topic({
      ros: ros,
      name: "/way_points_web",
      messageType: "std_msgs/msg/String",
    });

    waypoints.publish({
      data: paths,
    });
  }

  return (
    <div className="grid grid-cols-12 gap-6 h-[42rem]">
      <CardLayout className="col-span-3 !p-4">
        <Fragment>
          <div className="flex flex-col gap-2">
            {missions.map((mission: any, index: number) => {
              return (
                <Accordion
                  setActiveMission={setActiveMission}
                  id={index}
                  header={
                    <div className="w-full flex items-center justify-between">
                      <span className="text-sm font-medium text-layer-dark-500">
                        {mission?.name}
                      </span>
                      <div className="flex items-center gap-3">
                        <BsPlayCircle
                          size={24}
                          onClick={() => {
                            const temp: any = mission?.waypoints.map(
                              (waypoint: any) => {
                                return `${waypoint?.coordinates?.x}/${waypoint?.coordinates?.y}`;
                              }
                            );
                            handleStartMission(
                              temp.toString().replace(/,/g, "/")
                            );
                          }}
                        />
                        <InputToggle
                          icons={false}
                          checked={mission?.active}
                          onChange={() => {}}
                        />
                        <RxDotsVertical />
                      </div>
                    </div>
                  }
                >
                  <div className="relative flex flex-col gap-3">
                    {mission?.waypoints?.map((waypoint: any) => {
                      return (
                        <div className="flex justify-between items-center p-2 border border-layer-light-200 rounded-lg">
                          <div className="flex items-center gap-3">
                            <BsPlayCircle
                              size={20}
                              onClick={() =>
                                handleWaypoints({
                                  x: waypoint?.coordinates?.x,
                                  y: waypoint?.coordinates?.y,
                                })
                              }
                            />
                            <div className="flex items-center justify-center p-2">
                              {waypoint?.icon}
                            </div>
                            <div className="flex flex-col text-sm gap-1">
                              <span className="text-xs font-semibold">
                                {waypoint?.name}
                              </span>
                              <span className="flex gap-2 text-xs font-extralight">
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
                              </span>
                            </div>
                          </div>
                          <CgTrashEmpty size={20} />
                        </div>
                      );
                    })}
                  </div>
                </Accordion>
              );
            })}
          </div>
          <div className="w-full flex items-center justify-center p-8">
            <button
              className="hover:scale-90 transition-all duration-500"
              onClick={() => {
                setMissions((prev: any) => {
                  return [
                    ...prev,
                    {
                      name: "Mission " + Number(prev?.length + 1),
                      active: true,
                      waypoints: [],
                    },
                  ];
                });
              }}
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
              onClick={() => handleSetWaypointsCoordinates("go")}
            >
              <iframe
                title="map"
                style={{
                  width: rosMapDetails?.resolution?.x * 1.5 + "px",
                  height: rosMapDetails?.resolution?.y * 1.5 + "px",
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
            </div>
          </ContextMenu>
        </div>
      </CardLayout>
    </div>
  );
}
