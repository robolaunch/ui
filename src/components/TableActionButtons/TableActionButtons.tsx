import TableActionButton from "../TableActionButton/TableActionButton";
import { ReactElement } from "react";

interface ITableActionButtons {
  showEditButton?: boolean;
  showDeleteButton?: boolean;
  disabledEditButton?: boolean;
  disabledDeleteButton?: boolean;
  onClickEditButton?: () => void;
  onClickDeleteButton?: () => void;
}

export default function TableActionButtons({
  showEditButton,
  showDeleteButton,
  disabledEditButton,
  disabledDeleteButton,
  onClickEditButton,
  onClickDeleteButton,
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
