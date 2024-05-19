/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useEffect, useState } from "react";
import { useAppDispatch } from "../hooks/redux";
import { getWaypoints } from "../toolkit/WaypointSlice";
import { IJob, IWaypoint } from "../interfaces/task-management.interface";
import { addJob, getJobs, removeJob, updateJob } from "../toolkit/JobSlice";

export const TaskManagementContext: any = createContext<any>(null);

// eslint-disable-next-line
export default ({ children }: any) => {
  const [activeJob, setActiveJob] = useState<number | undefined>(undefined);
  const [activeWaypoint, setActiveWaypoint] = useState<number | undefined>(
    undefined,
  );

  const [boardScale, setBoardScale] = useState<number>(1);
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

  async function handleAddJob() {
    const newJob: IJob = {
      job_name: "New Job",
      job_id: 0,
      waypoints: [],
    };

    await dispatch(addJob(newJob));
    await handleGetJobs();
  }

  async function handleAddWaypointToJob(waypoint: IWaypoint) {
    const currentJob = jobs[activeJob!];

    const newJob: IJob = {
      ...currentJob,
      waypoints: [...currentJob.waypoints, waypoint],
    };

    await dispatch(updateJob(newJob));
    await handleGetJobs();
  }

  async function handleUpdateJob(job: IJob) {
    await dispatch(updateJob(job));
    await handleGetJobs();
  }

  async function handleRemoveJob() {
    const job = jobs[activeJob!];

    await dispatch(removeJob(job));
    await handleGetJobs();
    await setActiveJob(undefined);
  }

  async function handleUpdateWaypointForJob(waypoint: IWaypoint) {
    const currentJob = jobs[activeJob!];

    const newJob: IJob = {
      ...currentJob,
      waypoints: currentJob.waypoints.map((w, index) =>
        index === activeWaypoint ? waypoint : w,
      ),
    };

    await dispatch(updateJob(newJob));
    await handleGetJobs();
    await setActiveWaypoint(undefined);
  }

  useEffect(() => {
    handleGetWaypoints();
    handleGetJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(jobs);
  }, [jobs]);

  useEffect(() => {
    console.log(activeJob);
  }, [activeJob]);

  useEffect(() => {
    console.log("activeJob", activeJob);
  }, [activeJob]);

  useEffect(() => {
    console.log("activeWaypoint", activeWaypoint);
  }, [activeWaypoint]);

  return (
    <TaskManagementContext.Provider
      value={{
        activeWaypoint,
        setActiveWaypoint,
        activeJob,
        setActiveJob,
        boardScale,
        setBoardScale,
        jobs,
        waypoints,
        reloadJobs: handleGetJobs,
        reloadWaypoints: handleGetWaypoints,
        handleAddWaypointToJob,
        handleAddJob,
        handleUpdateJob,
        handleRemoveJob,
        handleUpdateWaypointForJob,
      }}
    >
      {children}
    </TaskManagementContext.Provider>
  );
};
