import { ReactElement, useState } from "react";
import TableActionButton from "../TableActionButton/TableActionButton";
import RMTaskJobDeleteModal from "../../modals/RMTaskJobDeleteModal";
import { IJob } from "../../interfaces/task-management.interface";
import RMTaskJobEditModal from "../../modals/RMTaskJobEditModal";

interface IRMTaskJobCardButtonsV2 {
  job: IJob;
}

export default function RMTaskJobCardButtonsV2({
  job,
}: IRMTaskJobCardButtonsV2): ReactElement {
  const [isOpenedEditModal, setIsOpenedEditModal] = useState<boolean>(false);
  const [isOpenedDeleteModal, setIsOpenedDeleteModal] =
    useState<boolean>(false);

  return (
    <div className="flex gap-2">
      <TableActionButton type="start" />
      <TableActionButton
        type="edit"
        onClick={() => setIsOpenedEditModal(true)}
      />
      <TableActionButton
        type="delete"
        onClick={() => setIsOpenedDeleteModal(true)}
      />
      {isOpenedEditModal && (
        <RMTaskJobEditModal
          job={job}
          handleCloseModal={() => setIsOpenedEditModal(false)}
        />
      )}
      {isOpenedDeleteModal && (
        <RMTaskJobDeleteModal
          job={job}
          handleCloseModal={() => setIsOpenedDeleteModal(false)}
        />
      )}
    </div>
  );
}
