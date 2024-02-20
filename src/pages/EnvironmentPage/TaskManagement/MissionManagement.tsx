import { Fragment, ReactElement, useEffect, useRef, useState } from "react";
import handleDomRosMouseCoordinatesConverter from "../../../functions/handleDomtoRosMouseCoordinatesConverter";
import TaskManagementContextMenu from "../../../components/TaskManagementContextMenu/TaskManagementContextMenu";
import RosMapWaypointLayout from "../../../components/RosMapWaypointLayout/RosMapWaypointLayout";
import RosMapImportExport from "../../../components/RosMapImportExport/RosMapImportExport";
import RosBarcodeMapItems from "../../../components/RosBarcodeMapItems/RosBarcodeMapItems";
import RosRobotLocation from "../../../components/RosRobotLocation/RosRobotLocation";
import RosNavigationBar from "../../../components/RosNavigationBar/RosNavigationBar";
import RosWaypointLine from "../../../components/RosWaypointLine/RosWaypointLine";
import RosWaypointList from "../../../components/RosWaypointList/RosWaypointList";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import RosControlBar from "../../../components/RosControlBar/RosControlBar";
import InputToggle from "../../../components/InputToggle/InputToggle";
import Accordion from "../../../components/Accordion/Accordion";
import GridLines from "../../../components/GridLines/GridLines";
import CardLayout from "../../../layouts/CardLayout";
import useMouse from "@react-hook/mouse-position";
import "react-contexify/dist/ReactContexify.css";
import { useContextMenu } from "react-contexify";
import { CgPlayButtonR } from "react-icons/cg";
import { BsPlusCircle } from "react-icons/bs";
import { EditText } from "react-edit-text";
import ROSLIB from "roslib";
import useMission from "../../../hooks/useMission";
import SidebarMissionManagement from "../../../components/sidebar.missionmanagement.comp/sidebar.missionmanagement.comp";

interface ITask {
  ros: any;
}

export default function MissionManagement({ ros }: ITask): ReactElement {
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
    handleStartMission,
  } = useMission();
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

    ros &&
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
    <div className="grid h-full w-full grid-cols-10 gap-6">
      <div className="col-span-10 h-full overflow-auto md:col-span-5 lg:col-span-4 xl:col-span-3  2xl:col-span-2">
        <CardLayout className="!relative h-full p-4">
          <SidebarMissionManagement />
        </CardLayout>
      </div>
      <div className="col-span-10 h-full md:col-span-5 lg:col-span-6 xl:col-span-7 2xl:col-span-8">
        <CardLayout className="!relative h-full">
          <Fragment>
            <TransformWrapper
              disabled={isDragging}
              onWheel={(e: any) => {
                console.log(e.state.scale);
                setSceneScale(e.state.scale);
              }}
              onPanningStart={() => setIsGrabbingMap(true)}
              onPanningStop={() => setIsGrabbingMap(false)}
              maxScale={100}
              wheel={{
                step: sceneScale > 10 ? 10 : 1,
              }}
            >
              <TransformComponent>
                <div
                  style={
                    {
                      // backgroundImage: `url(/images/bg-transparent.png)`,
                    }
                  }
                  className="flex w-full items-center justify-center"
                >
                  <div
                    className="relative border-4 border-light-600"
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
                      src={`/html/rosMap.html?ws=${ros?.socket?.url?.slice(
                        0,
                        ros?.socket?.url?.length - 1,
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
                          }),
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
                      <RosBarcodeMapItems ros={ros} />
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
