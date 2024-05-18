/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useEffect, useState } from "react";
import { useAppDispatch } from "../hooks/redux";
import { getWaypoints } from "../toolkit/WaypointSlice";
import { IJob, IWaypoint } from "../interfaces/task-management.interface";
import { getJobs } from "../toolkit/JobSlice";

export const TaskManagementContext: any = createContext<any>(null);

// eslint-disable-next-line
export default ({ children }: any) => {
  const [waypoints, setWaypoints] = useState<IWaypoint[]>([]);
  const [jobs, setJobs] = useState<IJob[]>([]);

  const dispatch = useAppDispatch();

  async function handleGetWaypoints() {
    const response = await dispatch(getWaypoints());
    const waypoints: IWaypoint[] = response.payload as IWaypoint[];

    setWaypoints(waypoints);
  }

  async function handleGetJobs() {
    const response = await dispatch(getJobs());
    const jobs: IJob[] = response.payload as IJob[];

    setJobs(jobs);
  }

  useEffect(() => {
    handleGetWaypoints();
    handleGetJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TaskManagementContext.Provider
      value={{
        jobs,
        waypoints,
        reloadJobs: handleGetJobs,
        reloadWaypoints: handleGetWaypoints,
      }}
    >
      {children}
    </TaskManagementContext.Provider>
  );
};
