import React, { Fragment, ReactElement } from "react";

export default function CFWorkspaceHeader(): ReactElement {
  return (
    <Fragment>
      <span className="mx-auto text-[0.75rem] font-medium">
        Workspace Repositories
      </span>
      <span className="bg-primary-500 h-[2px] w-full" />
    </Fragment>
  );
}
