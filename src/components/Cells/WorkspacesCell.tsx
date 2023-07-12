import React, { ReactElement } from "react";
import TextwithTitle from "../TextwithTitle/TextwithTitle";

interface IWorkspacesCell {
  workspaces: any[];
}

export default function WorkspacesCell({
  workspaces,
}: IWorkspacesCell): ReactElement {
  return (
    <div className="flex flex-col items-center gap-2">
      {workspaces?.map((workspace: any) => {
        return (
          <div
            key={workspace?.name}
            className="flex gap-2 border border-layer-light-200 w-fit py-1.5 px-4 rounded"
          >
            <TextwithTitle title="Name:" text={workspace?.name} />
            <TextwithTitle title="Branch:" text={workspace?.branch} />
            <TextwithTitle title="URL:" text={workspace?.url} />
          </div>
        );
      })}
    </div>
  );
}
