import React, {
  Fragment,
  ReactElement,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import CardLayout from "../../../layouts/CardLayout";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import ROSLIB from "roslib";
import { BsPlusCircle } from "react-icons/bs";
import InputToggle from "../../../components/InputToggle/InputToggle";
import Accordion from "../../../components/Accordion/Accordion";
import { useContextMenu } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";
import useMouse from "@react-hook/mouse-position";
import handleDomRosMouseCoordinatesConverter from "../../../helpers/handleDomtoRosMouseCoordinatesConverter";
import TaskManagementContextMenu from "../../../components/TaskManagementContextMenu/TaskManagementContextMenu";
import RosRobotLocation from "../../../components/RosRobotLocation/RosRobotLocation";

import GridLines from "../../../components/GridLines/GridLines";
import RosWaypointList from "../../../components/RosWaypointList/RosWaypointList";
import RosMapWaypointLayout from "../../../components/RosMapWaypointLayout/RosMapWaypointLayout";
import RosWaypointLine from "../../../components/RosWaypointLine/RosWaypointLine";
import RosNavigationBar from "../../../components/RosNavigationBar/RosNavigationBar";
import RosControlBar from "../../../components/RosControlBar/RosControlBar";
import { TaskManagementContext } from "../../../contexts/TaskManagementContext";
import { EditText } from "react-edit-text";
import RosMapImportExport from "../../../components/RosMapImportExport/RosMapImportExport";
interface ITask {
  ros: any;
}

export default function Task({ ros }: ITask): ReactElement {
  const {
    missions,
    setMissions,
    activeMission,
    setActiveMission,
    isCostMapActive,
    setIsCostMapActive,
    isDragging,
    sceneScale,
    setSceneScale,
    rosMapDetails,
    setRosMapDetails,
    setRightClickRosMapCoordinates,
    handleAddMissions,
    handleAddWaypointToMission,
  }: any = useContext(TaskManagementContext);
  const [isGrabbingMap, setIsGrabbingMap] = useState<boolean>(false);
  const mouseRef = useRef<any>(null);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const MENU_ID = "context-menu";
  const { show } = useContextMenu({
    id: MENU_ID,
  });
  function displayMenu(e: any) {
    show({
      event: e,
    });
  }

  return (
    <div className="w-full h-[42rem] grid grid-cols-10 gap-6">
      <div className="h-full col-span-10 md:col-span-5 lg:col-span-4 xl:col-span-3 2xl:col-span-2  overflow-auto">
        <CardLayout className="h-full">
          <Fragment>
            <div className="h-full flex flex-col gap-2 py-2">
              <div className="flex flex-col gap-1 items-center justify-center font-medium pb-1 ">
                <span>Missions</span>
                <span className="w-20 h-[2px] bg-layer-primary-500" />
              </div>
              {missions?.length ? (
                missions?.map((mission: any, missionIndex: number) => {
                  return (
                    <Accordion
                      key={missionIndex}
                      isOpen={activeMission}
                      setIsOpen={setActiveMission}
                      id={missionIndex}
                      header={
                        <div className="flex items-center justify-between">
                          <EditText
                            style={{
                              maxWidth: "8rem",
                            }}
                            className="flex flex-col gap-1 !text-xs"
                            type="text"
                            value={mission?.name}
                            onChange={(e: any) => {
                              setMissions((prev: any) => {
                                let temp = [...prev];
                                temp[missionIndex].name = e?.target?.value;
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
                        </div>
                      }
                    >
                      <RosWaypointList
                        setMissions={setMissions}
                        missions={missions}
                        mission={mission}
                        missionIndex={missionIndex}
                        activeMission={activeMission}
                      />
                    </Accordion>
                  );
                })
              ) : (
                <div className="mx-auto pt-3 text-xs">No missions yet</div>
              )}

              <BsPlusCircle
                onClick={() => handleAddMissions()}
                className="mx-auto mt-4 hover:scale-90 cursor-pointer transition-all duration-300"
                size={20}
              />
            </div>
          </Fragment>
        </CardLayout>
      </div>
      <div className="h-full col-span-10 md:col-span-5 lg:col-span-6 xl:col-span-7 2xl:col-span-8">
        <CardLayout className="!relative h-full">
          <Fragment>
            <TransformWrapper
              disabled={isDragging}
              onWheel={(e: any) => {
                setSceneScale(e.state.scale);
              }}
              onPanningStart={() => setIsGrabbingMap(true)}
              onPanningStop={() => setIsGrabbingMap(false)}
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
                      cursor: isGrabbingMap ? "grabbing" : "crosshair",
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
                      <RosWaypointLine ros={ros} />
                      <RosMapWaypointLayout />
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
            <RosMapImportExport />
            <RosNavigationBar />
            <RosControlBar />
          </Fragment>
        </CardLayout>
      </div>
      <TaskManagementContextMenu
        MENU_ID={MENU_ID}
        handleAddWaypointToMission={handleAddWaypointToMission}
        activeMission={activeMission}
        handleCostMap={() => {
          setIsCostMapActive((prev: any) => !prev);
        }}
        isCostMapActive={isCostMapActive}
      />
    </div>
  );
}
