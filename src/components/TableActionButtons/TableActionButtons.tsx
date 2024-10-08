import TableActionButton from "../TableActionButton/TableActionButton";
import { ReactElement } from "react";

export interface ITableActionButtons {
  showEditButton?: boolean;
  showDeleteButton?: boolean;
  showStartStopButton?: boolean;
  disabledEditButton?: boolean;
  disabledDeleteButton?: boolean;
  disabledStartStopButton?: boolean;
  loadingStartStopButton?: boolean;
  onClickEditButton?: () => void;
  onClickDeleteButton?: () => void;
  onClickStartStopButton?: () => void;
  instanceState?: "running" | "stopped";
}

export default function TableActionButtons({
  showEditButton,
  showDeleteButton,
  showStartStopButton,
  disabledEditButton,
  disabledDeleteButton,
  disabledStartStopButton,
  loadingStartStopButton,
  onClickEditButton,
  onClickDeleteButton,
  onClickStartStopButton,
  instanceState,
}: ITableActionButtons): ReactElement {
  return (
    <div className="card float-right flex gap-4">
      {showStartStopButton && (
        <TableActionButton
          type={instanceState === "running" ? "stop" : "start"}
          disabled={disabledStartStopButton}
          onClick={onClickStartStopButton}
          loading={loadingStartStopButton}
        />
      )}

      {showEditButton && (
        <TableActionButton
          type="edit"
          disabled={disabledEditButton}
          onClick={onClickEditButton}
        />
      )}

      {showDeleteButton && (
        <TableActionButton
          type="delete"
          disabled={disabledDeleteButton}
          onClick={onClickDeleteButton}
        />
      )}
    </div>
  );
}
