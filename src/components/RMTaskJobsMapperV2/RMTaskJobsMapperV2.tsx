import { Fragment, ReactElement } from "react";
import useTaskManagement from "../../hooks/useTaskManagement";
import RMTaskJobCardV2 from "../RMTaskJobCardV2/RMTaskJobCardV2";

export default function RMTaskJobsMapperV2(): ReactElement {
  const { jobs } = useTaskManagement();

  return (
    <Fragment>
      {jobs?.map((job, index) => {
        return <RMTaskJobCardV2 key={index} job={job} />;
      })}
    </Fragment>
  );
}
