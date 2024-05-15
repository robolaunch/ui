import { TaskManagementContext } from "../contexts/TaskManagementContext";
import { useContext } from "react";
import { IWaypoint } from "../interfaces/task-management.interface";

interface IuseTaskManagement {
  waypoints: IWaypoint[];
  reloadWaypoints: () => Promise<void>;
}

const useTaskManagement = () => {
  const useTaskManagement: IuseTaskManagement = useContext(
    TaskManagementContext,
  );

  return useTaskManagement;
};

export default useTaskManagement;
