import { Dispatch, SetStateAction } from "react";
import {
  IJob,
  ILocation,
  ImissionReducerState,
} from "../context/misssion.context.interface";

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
  // missionReducer: ImissionReducerState;
  // handleCreateLocation: (values: {
  //   locationID: string;
  //   position: {
  //     x: number;
  //     y: number;
  //     z: number;
  //   };
  //   orientation: {
  //     x: number;
  //     y: number;
  //     z: number;
  //     w: number;
  //   };
  // }) => void;
  // handleUpdateLocation: (values: {
  //   locationID: string;
  //   position: {
  //     x: number;
  //     y: number;
  //     z: number;
  //   };
  //   orientation: {
  //     x: number;
  //     y: number;
  //     z: number;
  //     w: number;
  //   };
  // }) => void;
}
