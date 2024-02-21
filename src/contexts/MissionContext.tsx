import { createContext, useEffect, useState } from "react";
import useRobot from "../hooks/useRobot";
import randomstring from "randomstring";
import saveAs from "file-saver";
import { toast } from "sonner";
import ROSLIB from "roslib";
export const MissionContext: any = createContext<any>(null);

// eslint-disable-next-line
export default ({ children }: any) => {
  const { ros } = useRobot();
  const [missions, setMissions] = useState<any>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [activeMission, setActiveMission] = useState<number>(-1);
  const [hoverWaypoint, setHoverWaypoint] = useState<number>(-1);
  const [isCostMapActive, setIsCostMapActive] = useState<boolean>(false);
  const [sceneScale, setSceneScale] = useState<number>(1);
  const [rosMapDetails, setRosMapDetails] = useState<any>({
    x: 0,
    y: 0,
  });
  const [rightClickRosMapCoordinates, setRightClickRosMapCoordinates] =
    useState<any>();

  const rosWaypointsWeb = new ROSLIB.Topic({
    ros: ros,
    name: "/way_points_web",
    messageType: "std_msgs/msg/String",
  });

  useEffect(() => {
    ros && rosWaypointsWeb.subscribe(function (message: any) {});

    return () => {
      rosWaypointsWeb.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleAddMissions() {
    let temp = [...missions];
    temp.push({
      id: randomstring.generate(8),
      name: `Mission ${missions.length + 1}`,
      active: true,
      waypoints: [],
    });
    setMissions(temp);
  }
  function handleAddWaypointToMission({
    type,
    x,
    y,
  }: {
    type: string;
    x?: number;
    y?: number;
  }) {
    let temp = [...missions];
    temp[activeMission].waypoints.push({
      id: randomstring.generate(8),
      name: "Waypoint",
      taskType: type,
      coordinates: {
        x: x || rightClickRosMapCoordinates?.x,
        y: y || rightClickRosMapCoordinates?.y,
        z: 0,
      },
    });
    setMissions(temp);
  }
  function handleExportJSON() {
    var blob = new Blob([JSON.stringify(missions)], {
      type: "text/plain;charset=utf-8",
    });
    saveAs(blob, `missions.json`);
  }

  function handleImportJSON(file: any) {
    if (file.type === "application/json") {
      const fileReader = new FileReader();
      fileReader.readAsText(file, "UTF-8");
      fileReader.onload = (e) => {
        setMissions(JSON.parse(e.target?.result as string));
      };
    } else {
      toast.error("Invalid file type. Please upload a JSON file.");
    }
  }

  function handleStartMission(mission: any) {
    rosWaypointsWeb.publish({
      data: JSON.stringify(mission),
    });
  }

  return (
    <MissionContext.Provider
      value={{
        missions,
        setMissions,
        activeMission,
        setActiveMission,
        hoverWaypoint,
        setHoverWaypoint,
        isCostMapActive,
        setIsCostMapActive,
        isDragging,
        setIsDragging,
        sceneScale,
        setSceneScale,
        rosMapDetails,
        setRosMapDetails,
        rightClickRosMapCoordinates,
        setRightClickRosMapCoordinates,
        handleExportJSON,
        handleImportJSON,
        handleAddMissions,
        handleAddWaypointToMission,
        handleStartMission,
      }}
    >
      {children}
    </MissionContext.Provider>
  );
};
