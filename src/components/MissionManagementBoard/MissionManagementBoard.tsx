import { Fragment, ReactElement, useEffect, useRef, useState } from "react";
import CardLayout from "../../layouts/CardLayout";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { useContextMenu } from "react-contexify";
import useMouse from "@react-hook/mouse-position";
import useMission from "../../hooks/useMission";
import ROSLIB from "roslib";
import RosWaypointLine from "../RosWaypointLine/RosWaypointLine";
import GridLines from "../GridLines/GridLines";
import RosMapWaypointLayout from "../RosMapWaypointLayout/RosMapWaypointLayout";
import RosBarcodeMapItems from "../RosBarcodeMapItems/RosBarcodeMapItems";
import RosRobotLocation from "../RosRobotLocation/RosRobotLocation";
import RosMapImportExport from "../RosMapImportExport/RosMapImportExport";
import RosNavigationBar from "../RosNavigationBar/RosNavigationBar";
import RosControlBar from "../RosControlBar/RosControlBar";
import TaskManagementContextMenu from "../TaskManagementContextMenu/TaskManagementContextMenu";

interface IMissionManagementBoard {
  ros?: any;
}

export default function MissionManagementBoard({
  ros,
}: IMissionManagementBoard): ReactElement {
  const {
    activeMission,
    isCostMapActive,
    setIsCostMapActive,
    isDragging,
    sceneScale,
    setSceneScale,
    rosMapDetails,
    setRosMapDetails,
    setRightClickRosMapCoordinates,
    handleAddWaypointToMission,
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

  function handleDomRosMouseCoordinatesConverter(arg0: {
    domMapMouseX: number | null;
    domMapMouseY: number | null;
    sceneScale: any;
    rosMapWebsocketWidth: any;
    rosMapWebsocketHeight: any;
    rosMapWidth: any;
    rosMapHeight: any;
  }): any {
    throw new Error("Function not implemented.");
  }

  return (
    <Fragment>
      <div className="col-span-10 h-full md:col-span-5 lg:col-span-6 xl:col-span-7 2xl:col-span-8">
        <CardLayout className="!relative h-full">
          <Fragment>
            <TransformWrapper
              disabled={isDragging}
              onWheel={(e: any) => {
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
                <div className="flex w-full items-center justify-center">
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
                      <RosBarcodeMapItems />
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
    </Fragment>
  );
}
