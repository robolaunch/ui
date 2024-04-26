import { Fragment, ReactElement } from "react";
import useTask from "../../hooks/useTask";

export default function RMTaskJobsMapper(): ReactElement {
  const { missionReducer } = useTask();

  return (
    <Fragment>
      {missionReducer.jobs?.map((job, index) => {
        return <></>;
      })}
    </Fragment>
  );
}
