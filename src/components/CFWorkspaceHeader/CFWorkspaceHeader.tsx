import React, { Fragment, ReactElement } from "react";

export default function CFWorkspaceHeader(): ReactElement {
  return (
    <Fragment>
      <span className="mx-auto text-[0.75rem] font-medium">
        Workspace Repositories
      </span>
      <span className="h-[2px] w-full bg-primary" />
    </Fragment>
  );
}
