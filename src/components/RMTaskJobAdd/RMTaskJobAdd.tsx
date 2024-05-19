import { Fragment, ReactElement } from "react";
import CFAddButton from "../CFAddButton/CFAddButton";
import useTaskManagement from "../../hooks/useTaskManagement";

export default function RMTaskJobAdd(): ReactElement {
  const { handleAddJob } = useTaskManagement();

  return (
    <Fragment>
      <CFAddButton onClick={handleAddJob} />
    </Fragment>
  );
}
