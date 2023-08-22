import React, { ReactElement } from "react";
import { IRobotWorkspace } from "../../interfaces/robotInterfaces";
import StateCell from "../Cells/StateCell";

interface ICreateRobotWorkspaceItemAccordionHeader {
  workspace: IRobotWorkspace;
  workspaceIndex: number;
  workspaceState: string[];
}

export default function CreateRobotWorkspaceItemAccordionHeader({
  workspace,
  workspaceIndex,
  workspaceState,
}: ICreateRobotWorkspaceItemAccordionHeader): ReactElement {
  return (
    <div className="flex justify-between">
      <span className="font-medium">
        {workspace.name
          ? workspace?.name + " Workspace"
          : `Workspace #${workspaceIndex + 1}`}
      </span>
      <div className="flex items-center gap-2 text-xs">
        {Array.isArray(workspaceState) && workspaceState?.[0] && (
          <div className="flex gap-1.5">
            <span
              title={`Launch State of Cloud Instance`}
              className="font-medium"
            >
              V:
            </span>
            <StateCell state={workspaceState?.[0]} />
          </div>
        )}
        {Array.isArray(workspaceState) && workspaceState?.[1] && (
          <div className="flex gap-1.5">
            <span
              title={`Launch State of Physical Instance`}
              className="font-medium"
            >
              P:
            </span>
            <StateCell state={workspaceState?.[1]} />
          </div>
        )}
      </div>
    </div>
  );
}
