import TableActionButton from "../TableActionButton/TableActionButton";
import { ReactElement } from "react";

interface ITableActionButtons {
  showEditButton?: boolean;
  showDeleteButton?: boolean;
  showStartStopButton?: boolean;
  disabledEditButton?: boolean;
  disabledDeleteButton?: boolean;
  disabledStartStopButton?: boolean;
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
  onClickEditButton,
  onClickDeleteButton,
  onClickStartStopButton,
  instanceState,
}: ITableActionButtons): ReactElement {
  return (
    <div className="card float-right flex gap-4">
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
