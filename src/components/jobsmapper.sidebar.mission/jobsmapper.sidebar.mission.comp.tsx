import { ReactElement } from "react";
import CardLayout from "../../layouts/CardLayout";
import useTask from "../../hooks/useTask";
import AddJob from "../addjob.sidebar.mission/addwaypoint.sidebar.mission";

export default function JobsMapper(): ReactElement {
  const { missionReducer } = useTask();

  return (
    <div className="flex w-full flex-col gap-2">
      {missionReducer.jobs?.map((job, index) => (
        <CardLayout
          key={index}
          className="flex flex-col gap-2 text-xs !shadow-sm"
        >
          <p>Job ID: {job.jobID}</p>
          <p>Robot URL: {job.robotUrl}</p>
          <p>Deadline: {job.deadline}</p>
          <p>Priority: {job.priority}</p>
          <p>Job Status: {job.jobStatus}</p>
        </CardLayout>
      ))}
      <AddJob />
    </div>
  );
}
