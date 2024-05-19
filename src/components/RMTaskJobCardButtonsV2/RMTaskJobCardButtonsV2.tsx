import { ReactElement, useState } from "react";
import TableActionButton from "../TableActionButton/TableActionButton";
import RMTaskJobDeleteModal from "../../modals/RMTaskJobDeleteModal";
import { IJob } from "../../interfaces/task-management.interface";
import RMTaskJobEditModal from "../../modals/RMTaskJobEditModal";
import { useAppDispatch } from "../../hooks/redux";
import { startJob } from "../../toolkit/JobSlice";

interface IRMTaskJobCardButtonsV2 {
  job: IJob;
}

export default function RMTaskJobCardButtonsV2({
  job,
}: IRMTaskJobCardButtonsV2): ReactElement {
  const [isOpenedEditModal, setIsOpenedEditModal] = useState<boolean>(false);
  const [isOpenedDeleteModal, setIsOpenedDeleteModal] =
    useState<boolean>(false);

  const dispatch = useAppDispatch();
  function handleStartJob() {
    dispatch(startJob(job));
  }

  return (
    <div className="flex gap-2">
      <TableActionButton type="start" onClick={handleStartJob} />
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
          handleCloseModal={() => setIsOpenedEditModal(false)}
        />
      )}
      {isOpenedDeleteModal && (
        <RMTaskJobDeleteModal
          handleCloseModal={() => setIsOpenedDeleteModal(false)}
        />
      )}
    </div>
  );
}
