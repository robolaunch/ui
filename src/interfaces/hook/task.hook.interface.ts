import {
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
  handleCreateJob: (values: {
    jobID: string;
    robotUrl: string | undefined;
    taskList: {
      ActionName: string;
      LocationId: string;
    }[];
    deadline: string;
    priority: 0 | 1 | 2 | 3 | 4 | 5;
  }) => void;
  handleGetJobs: () => void;
  handleDeleteJob: (values: { jobID: string }) => void;
  handleReload: () => void;
}
