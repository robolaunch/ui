import CFCancelButton from "../components/CFCancelButton/CFCancelButton";
import Button from "../components/Button/Button";
import { Dialog } from "primereact/dialog";
import { ReactElement } from "react";
import { IJob } from "../interfaces/task-management.interface";
import { useAppDispatch } from "../hooks/redux";
import { removeJob } from "../toolkit/JobSlice";
import useTaskManagement from "../hooks/useTaskManagement";

interface IRMTaskJobDeleteModal {
  job: IJob;
  handleCloseModal: () => void;
}

export default function RMTaskJobDeleteModal({
  job,
  handleCloseModal,
}: IRMTaskJobDeleteModal): ReactElement {
  const { reloadJobs } = useTaskManagement();

  const dispatch = useAppDispatch();

  async function handleOnSubmit() {
    await dispatch(removeJob(job));
    await reloadJobs();
    handleCloseModal();
  }

  return (
    <Dialog
      header="Remove Job"
      visible={true}
      className="flex h-fit w-[40vw] "
      onHide={handleCloseModal}
      draggable={false}
    >
      <div className="flex flex-col gap-10 p-2">
        <p>Are you sure you want to remove job?</p>
        <div className="mt-4 flex gap-2">
          <CFCancelButton onClick={handleCloseModal} />
          <Button
            type="submit"
            className="!h-11 text-xs"
            text="Remove Job"
            onClick={handleOnSubmit}
          />
        </div>
      </div>
    </Dialog>
  );
}
