import { Fragment, ReactElement } from "react";
import useTask from "../../hooks/useTask";
import RMTaskJobCard from "../RMTaskJobCard/RMTaskJobCard";
import RMTaskJobAdd from "../RMTaskJobAdd/RMTaskJobAdd";

export default function RMTaskJobsMapper(): ReactElement {
  const { missionReducer, handleCreateJob } = useTask();

  return (
    <Fragment>
      {missionReducer.jobs?.map((job, index) => {
        return <RMTaskJobCard key={index} job={job} />;
      })}
      <RMTaskJobAdd />
      <button
        onClick={() => {
          handleCreateJob({
            deadline: "16:00:00",
            jobID: "2",
            jobStatus: "NULL",
            priority: 0,
            robotUrl: "",
            taskList: [
              {
                ActionName: "1",
                LocationId: "1",
              },
              {
                ActionName: "2",
                LocationId: "2",
              },
              {
                ActionName: "3",
                LocationId: "3",
              },
              {
                ActionName: "2.1",
                LocationId: "2",
              },
              {
                ActionName: "1.1",
                LocationId: "1",
              },
            ],
          });
        }}
      >
        add w
      </button>
    </Fragment>
  );
}
