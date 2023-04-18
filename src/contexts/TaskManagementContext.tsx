import randomstring from "randomstring";
import React, { createContext, useState } from "react";
import saveAs from "file-saver";
export const TaskManagementContext: any = createContext<any>(null);

// eslint-disable-next-line
export default ({ children }: any) => {
  const [missions, setMissions] = useState<any>([
    {
      id: randomstring.generate(8),
      name: "Mission 1",
      active: true,
      waypoints: [],
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

  return (
    <TaskManagementContext.Provider
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
        handleAddWaypointToMission,
      }}
    >
      {children}
    </TaskManagementContext.Provider>
  );
};