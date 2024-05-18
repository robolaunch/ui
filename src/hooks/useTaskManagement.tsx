import { TaskManagementContext } from "../contexts/TaskManagementContext";
import { useContext } from "react";
import { IJob, IWaypoint } from "../interfaces/task-management.interface";

interface IuseTaskManagement {
  jobs: IJob[];
  waypoints: IWaypoint[];
  reloadJobs: () => Promise<void>;
  reloadWaypoints: () => Promise<void>;
}

const useTaskManagement = () => {
  const useTaskManagement: IuseTaskManagement = useContext(
    TaskManagementContext,
  );

  return useTaskManagement;
};

export default useTaskManagement;
