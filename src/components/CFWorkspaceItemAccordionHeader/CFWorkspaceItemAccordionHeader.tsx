import { ReactElement } from "react";
import StateCell from "../TableInformationCells/StateCell";
import { IEnvironmentStep2Workspace } from "../../interfaces/environment/environment.step2.interface";

interface ICFWorkspaceItemAccordionHeader {
  workspace: IEnvironmentStep2Workspace;
  workspaceIndex: number;
  workspaceState: string[];
}

export default function CFWorkspaceItemAccordionHeader({
  workspace,
  workspaceIndex,
  workspaceState,
}: ICFWorkspaceItemAccordionHeader): ReactElement {
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
