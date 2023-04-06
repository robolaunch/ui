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
import {
  Menu,
  Item,
  Separator,
  Submenu,
  useContextMenu,
} from "react-contexify";
import "react-contexify/dist/ReactContexify.css";
import useMouse from "@react-hook/mouse-position";

interface ITask {
  ros: any;
}

export default function Task({ ros }: ITask): ReactElement {
  const [activeMission, setActiveMission] = useState<number>(-1);
  const [isCostMapActive, setIsCostMapActive] = useState<boolean>(true);
  const [sceneScale, setSceneScale] = useState<number>(1);
  const [rightClickCoordinates, setRightClickCoordinates] = useState<any>();
  const [rosMapDetails, setRosMapDetails] = useState<any>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    console.log(rightClickCoordinates);
  }, [rightClickCoordinates]);

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

  const robotPosition = new ROSLIB.Topic({
    ros: ros,
    name: "/robot_position",
    messageType: "geometry_msgs/msg/PoseStamped",
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
      robotPosition?.unsubscribe();
    };
  }, []);

  const [missions, setMissions] = useState<any>([
    {
      id: randomstring.generate(8),
      name: "Mission 1",
      active: true,
      waypoints: [
        {
          id: randomstring.generate(8),
          name: "Waypoint",
          taskType: "move",
          coordinates: {
            x: 0,
            y: 0,
          },
        },
      ],
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

  const MENU_ID = "menu-id";
  const { show } = useContextMenu({
    id: MENU_ID,
  });

  function handleItemClick({ event, props, triggerEvent, data }: any) {
    console.log(event, props, triggerEvent, data);
  }

  function displayMenu(e: any) {
    show({
      event: e,
    });
  }

  const mouseRef = React.useRef<any>(null);
  const mouse = useMouse(mouseRef, {
    enterDelay: 100,
    leaveDelay: 100,
  });

  useEffect(() => {
    console.log(mouse);
  }, [mouse]);

  return (
    <div className="w-full h-[55rem] grid grid-cols-10 gap-6">
      <div className="h-full col-span-2">
        <CardLayout>
          <Fragment>
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
                    <div className="flex gap-2">
                      {mission?.waypoints?.map(
                        (waypoint: any, waypointIndex: number) => {
                          return (
                            <div key={waypointIndex}>{waypoint?.name}</div>
                          );
                        }
                      )}
                    </div>
                  </Accordion>
                );
              })}
            </div>
          </Fragment>
        </CardLayout>
      </div>

      <div className="h-full col-span-8">
        <CardLayout className="!relative h-full">
          <TransformWrapper
            disabled={activeMission === -1 ? false : true}
            onWheel={(e: any) => {
              setSceneScale(e.state.scale);
            }}
          >
            <TransformComponent>
              <div className="w-full flex items-center justify-center">
                <div
                  className="relative"
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
                      console.log(e);
                      e.preventDefault();
                      displayMenu(e);
                    }}
                    className="absolute inset-0"
                  >
                    <Draggable
                      scale={sceneScale}
                      onStart={() => {
                        console.log("start");
                      }}
                      onStop={(e, data) => {
                        console.log("stop", data);
                      }}
                      disabled={activeMission === -1 ? true : false}
                      bounds="parent"
                      defaultClassNameDragging="cursor-move"
                    >
                      <div className="inline-block">item</div>
                    </Draggable>
                  </div>
                </div>
              </div>
            </TransformComponent>
          </TransformWrapper>
        </CardLayout>
      </div>
      <Menu id={MENU_ID}>
        <Item onClick={handleItemClick}>Item 1</Item>
        <Item onClick={handleItemClick}>Item 2</Item>
        <Separator />
        <Item disabled>Disabled</Item>
        <Separator />
        <Submenu label="Submenu">
          <Item onClick={handleItemClick}>Sub Item 1</Item>
          <Item onClick={handleItemClick}>Sub Item 2</Item>
        </Submenu>
      </Menu>
    </div>
  );
}
