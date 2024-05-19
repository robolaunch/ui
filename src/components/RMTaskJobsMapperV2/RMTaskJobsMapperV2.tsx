import { Fragment, ReactElement } from "react";
import useTaskManagement from "../../hooks/useTaskManagement";
import RMTaskJobAdd from "../RMTaskJobAdd/RMTaskJobAdd";
import RMJobCard from "../RMJobCard/RMJobCard";

export default function RMTaskJobsMapperV2(): ReactElement {
  const { jobs } = useTaskManagement();

  return (
    <Fragment>
      {jobs?.map((job, index) => {
        return <RMJobCard job={job} index={index} key={index} />;
      })}
      <RMTaskJobAdd />
    </Fragment>
  );
}
