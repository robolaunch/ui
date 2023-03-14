import React, { Fragment, ReactElement, useEffect, useState } from "react";
import CardLayout from "../../../../layouts/CardLayout";
import Accordion from "../../../../components/Accordion/Accordion";
import InputToggle from "../../../../components/InputToggle/InputToggle";
import { RxDotsVertical } from "react-icons/rx";
import { BsPinMap, BsCameraVideo, BsPlusCircle } from "react-icons/bs";
import { CgTrashEmpty } from "react-icons/cg";
import useMouse from "@react-hook/mouse-position";
import { ContextMenu } from "@ni7r0g3n/react-context-menu";
import { AiOutlinePauseCircle } from "react-icons/ai";
import { toast } from "sonner";
import ROSLIB from "roslib";

interface ITaskManagement {
  ros: any;
}

export default function TaskManagement({ ros }: ITaskManagement): ReactElement {
  const [mouseCoordinates, setMouseCoordinates] = useState<any>({ x: 0, y: 0 });
  const [activeMission, setActiveMission] = useState<number>();
  const [missions, setMissions] = useState<any>([]);

  const ref = React.useRef<any>(null);
  const mouse = useMouse(ref, {
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
            x: Math.ceil(mouseCoordinates?.x),
            y: Math.ceil(mouseCoordinates?.y),
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
        return <BsPinMap size={24} />;
      case "go_wait":
        return <AiOutlinePauseCircle size={24} />;
      case "go_takePicture":
        return <BsCameraVideo size={24} />;
    }
  }

  useEffect(() => {
    const odom = new ROSLIB.Topic({
      ros: ros,
      name: "/odom_rf2o",
      messageType: "nav_msgs/msg/Odometry",
    });
    odom?.subscribe(function (message: any) {
      console.log(message);
    });

    return () => {
      odom.unsubscribe();
    };
  }, []);

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
                            <div className="flex items-center justify-center p-2">
                              {waypoint?.icon}
                            </div>
                            <div className="flex flex-col text-sm font-medium gap-1">
                              <span>{waypoint?.name}</span>
                              <span className="text-xs font-light">
                                {waypoint?.coordinates?.x +
                                  " , " +
                                  waypoint?.coordinates?.y}
                              </span>
                            </div>
                          </div>
                          <CgTrashEmpty size={24} />
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
              img: {ref?.current?.naturalWidth} x {ref?.current?.naturalHeight}
            </span>
            <span>x: {mouse.x}</span>
            <span>y: {mouse.y}</span>{" "}
            <span>rendered img x: {ref?.current?.offsetWidth}</span>
            <span>rendered img y: {ref?.current?.offsetHeight}</span>
            <span>
              real x:{" "}
              {(ref?.current?.naturalWidth / ref?.current?.offsetWidth) *
                mouse.x!}
            </span>
            <span>
              real y:{" "}
              {(ref?.current?.naturalHeight / ref?.current?.offsetHeight) *
                mouse.y!}
            </span>
          </div>
        </Fragment>
      </CardLayout>
      <CardLayout className="col-span-9">
        <div ref={ref} className="relative w-full h-full">
          <ContextMenu
            onOpen={() =>
              setMouseCoordinates({
                x:
                  (ref?.current?.naturalWidth / ref?.current?.offsetWidth) *
                  mouse.x!,
                y:
                  (ref?.current?.naturalHeight / ref?.current?.offsetHeight) *
                  mouse.y!,
              })
            }
            adaptive={true}
            items={activeMission !== -1 ? items : []}
          >
            {ros?.socket?.url && (
              <iframe
                className="absolute inset-0"
                title="map"
                style={{
                  minWidth: "100%",
                  minHeight: "100%",
                  pointerEvents: "none",
                }}
                src={"/html/rosMap.html?" + ros.socket.url}
              />
            )}
          </ContextMenu>

          {missions[activeMission!]?.waypoints?.map((waypoint: any) => {
            return (
              <div
                className="absolute"
                style={{
                  top:
                    waypoint?.coordinates?.y /
                      (ref?.current?.naturalHeight /
                        ref?.current?.offsetHeight) -
                    10,
                  left:
                    waypoint?.coordinates?.x /
                      (ref?.current?.naturalWidth / ref?.current?.offsetWidth) -
                    10,
                }}
              >
                {waypoint?.icon}
              </div>
            );
          })}
        </div>
      </CardLayout>
    </div>
  );
}
