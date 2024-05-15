/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useEffect, useState } from "react";
import { useAppDispatch } from "../hooks/redux";
import { getWaypoints } from "../toolkit/WaypointSlice";
import { IWaypoint } from "../interfaces/task-management.interface";

export const TaskManagementContext: any = createContext<any>(null);

// eslint-disable-next-line
export default ({ children }: any) => {
  const [waypoints, setWaypoints] = useState<IWaypoint[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);

  const dispatch = useAppDispatch();

  async function handleGetWaypoints() {
    const response = await dispatch(getWaypoints());
    const waypoints: IWaypoint[] = response.payload as IWaypoint[];

    setWaypoints(waypoints);
  }

  useEffect(() => {
    handleGetWaypoints();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TaskManagementContext.Provider
      value={{
        waypoints,
        reloadWaypoints: handleGetWaypoints,
      }}
    >
      {children}
    </TaskManagementContext.Provider>
  );
};
