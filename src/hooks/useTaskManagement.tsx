import { TaskManagementContext } from "../contexts/TaskManagementContext";
import { Dispatch, SetStateAction, useContext } from "react";
import { IJob, IWaypoint } from "../interfaces/task-management.interface";

interface IuseTaskManagement {
  activeWaypoint: number | undefined;
  setActiveWaypoint: Dispatch<SetStateAction<number | undefined>>;
  jobs: IJob[];
  waypoints: IWaypoint[];
  reloadJobs: () => Promise<void>;
  reloadWaypoints: () => Promise<void>;
  boardScale: number;
  setBoardScale: Dispatch<SetStateAction<number>>;
  activeJob: number | undefined;
  setActiveJob: Dispatch<SetStateAction<number | undefined>>;
  handleAddWaypointToJob(waypoint: IWaypoint): Promise<void>;
  handleAddJob: () => Promise<void>;
  handleUpdateJob: (job: IJob) => Promise<void>;
  handleRemoveJob: () => Promise<void>;
  handleUpdateWaypointForJob: (waypoint: IWaypoint) => Promise<void>;
}

const useTaskManagement = () => {
  const useTaskManagement: IuseTaskManagement = useContext(
    TaskManagementContext,
  );

  return useTaskManagement;
};

export default useTaskManagement;
