import { Fragment, ReactElement } from "react";
import useTask from "../../hooks/useTask";
import RMTaskJobCard from "../RMTaskJobCard/RMTaskJobCard";

export default function RMTaskJobsMapper(): ReactElement {
  const { missionReducer } = useTask();

  return (
    <Fragment>
      {missionReducer.jobs?.map((job, index) => {
        return <RMTaskJobCard key={index} job={job} />;
      })}
    </Fragment>
  );
}
