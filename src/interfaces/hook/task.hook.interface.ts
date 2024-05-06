import {
  IJob,
  ImissionReducerState,
  IWaypoint,
} from "../context/misssion.context.interface";

export interface IuseTask {
  missionReducer: ImissionReducerState;
  handleCreateLocation(values: IWaypoint): void;
  handleGetLocations: () => void;
  handleUpdateWaypoint: (values: IWaypoint) => void;
  handleRemoveWaypoint: (values: IWaypoint) => void;
  ///
  handleCreateWaitingPoint(values: IWaypoint): void;
  handleGetWaitingPoints: () => void;
  handleUpdateWaitingPoint(values: IWaypoint): void;
  handleRemoveWaitingWaypoint: (values: IWaypoint) => void;
  ///
  handleCreateJob(values: IJob): void;
  handleGetJobs: () => void;
  handleRemoveJob(values: IJob): void;
  handleReload: () => void;
}
