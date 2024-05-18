import { ReactElement, useState } from "react";
import TableActionButton from "../TableActionButton/TableActionButton";
import RMTaskJobDeleteModal from "../../modals/RMTaskJobDeleteModal";
import { IJob } from "../../interfaces/task-management.interface";

interface IRMTaskJobCardButtons {
  job: IJob;
}

export default function RMTaskJobCardButtons({
  job,
}: IRMTaskJobCardButtons): ReactElement {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isOpenedEditModal, setIsOpenedEditModal] = useState<boolean>(false);
  const [isOpenedDeleteModal, setIsOpenedDeleteModal] =
    useState<boolean>(false);

  return (
    <div className="flex gap-2">
      <TableActionButton
        type="edit"
        disabled={false}
        onClick={() => setIsOpenedEditModal(true)}
      />

      <TableActionButton
        type="delete"
        disabled={false}
        onClick={() => setIsOpenedDeleteModal(true)}
      />
      {isOpenedDeleteModal && (
        <RMTaskJobDeleteModal
          job={job}
          handleCloseModal={() => setIsOpenedDeleteModal(false)}
        />
      )}
    </div>
  );
}
