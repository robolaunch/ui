import React, { Fragment, ReactElement } from "react";
import { Outlet } from "react-router-dom";
import TrialContext from "../contexts/TrialContext";

export default function TrialLayout(): ReactElement {
  return (
    <Fragment>
      <TrialContext>
        <Outlet />
      </TrialContext>
    </Fragment>
  );
}
