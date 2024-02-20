import { Dispatch, SetStateAction } from "react";
import { IJob, ILocation } from "../context/misssion.context.interface";

export interface IuseMission {
  missions: any;
  setMissions: any;
  activeMission: any;
  setActiveMission: any;
  hoverWaypoint: any;
  setHoverWaypoint: any;
  isCostMapActive: any;
  setIsCostMapActive: any;
  isDragging: any;
  setIsDragging: any;
  sceneScale: any;
  setSceneScale: any;
  rosMapDetails: any;
  setRosMapDetails: any;
  rightClickRosMapCoordinates: any;
  setRightClickRosMapCoordinates: any;
  handleExportJSON: any;
  handleImportJSON: any;
  handleAddMissions: any;
  handleAddWaypointToMission: any;
  handleStartMission: any;
  missionReducer: any;
}
