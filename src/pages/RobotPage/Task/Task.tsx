import React, { Fragment, ReactElement, useContext, useEffect } from "react";
import CardLayout from "../../../layouts/CardLayout";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import ROSLIB from "roslib";
import { BsPlayCircle, BsPlusCircle } from "react-icons/bs";
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
import Button from "../../../components/Button/Button";
import { FileUploader } from "react-drag-drop-files";
import { RiArrowGoBackFill } from "react-icons/ri";
import { FaStopCircle } from "react-icons/fa";
import { CiExport, CiImport } from "react-icons/ci";
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
    handleExportJSON,
    handleImportJSON,
    handleAddMissions,
    handleAddWaypointToMission,
  }: any = useContext(TaskManagementContext);

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
        <CardLayout>
          <Fragment>
            <div className="h-full flex flex-col gap-1 py-2">
              <div className="mx-auto font-medium pb-1">Missions</div>
              {missions.length ? (
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
                          <div className="flex gap-2">
                            <BsPlayCircle
                              className="cursor-pointer hover:scale-90 transition-all duration-300"
                              size={20}
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
            <RosNavigationBar />
            <div className="absolute left-4 bottom-4 cursor-pointer z-10">
              <div className="flex flex-col rounded-lg border border-layer-light-200 bg-layer-light-50 text-xs">
                <div
                  className="flex gap-2 py-2 px-4 hover:bg-layer-light-100 transition-all duration-300"
                  onClick={() => handleExportJSON()}
                >
                  <CiExport size={16} />
                  <span>Export</span>
                </div>
                <FileUploader
                  label="text"
                  multiple={false}
                  handleChange={(e: any) => {
                    console.log(e);
                    handleImportJSON(e);
                  }}
                  name="file"
                  types={["json"]}
                >
                  <div className="flex gap-2 py-2 px-4 hover:bg-layer-light-100 transition-all duration-300">
                    <CiImport size={16} />
                    <span>Import</span>
                  </div>
                </FileUploader>
              </div>
            </div>
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
