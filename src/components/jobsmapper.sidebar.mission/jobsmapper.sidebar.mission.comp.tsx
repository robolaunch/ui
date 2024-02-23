import { ReactElement } from "react";
import CardLayout from "../../layouts/CardLayout";
import useTask from "../../hooks/useTask";
import AddJob from "../addjob.sidebar.mission/addjob.sidebar.mission";

export default function JobsMapper(): ReactElement {
  const { missionReducer } = useTask();

  return (
    <div className="flex w-full flex-col gap-2">
      {missionReducer.jobs?.map((job, index) => (
        <CardLayout
          key={index}
          className="flex flex-col gap-2 p-4 text-xs !shadow-sm"
        >
          <p>
            <span className="font-medium">Job ID: </span>
            {job.jobID}
          </p>
          <p>
            <span className="font-medium">Robot URL: </span>
            {job.robotUrl}
          </p>
          <p>
            <span className="font-medium">Deadline: </span>
            {job.deadline}
          </p>
          <p>
            <span className="font-medium">Priority: </span>
            {job.priority}
          </p>
          <p>
            <span className="font-medium">Job Status: </span>
            {job.jobStatus}
          </p>
        </CardLayout>
      ))}
      <AddJob />
    </div>
  );
}
