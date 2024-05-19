import CFCancelButton from "../components/CFCancelButton/CFCancelButton";
import Button from "../components/Button/Button";
import { Dialog } from "primereact/dialog";
import { ReactElement } from "react";
import useTaskManagement from "../hooks/useTaskManagement";

interface IRMTaskJobDeleteModal {
  handleCloseModal: () => void;
}

export default function RMTaskJobDeleteModal({
  handleCloseModal,
}: IRMTaskJobDeleteModal): ReactElement {
  const { handleRemoveJob } = useTaskManagement();

  function handleDeleteJob() {
    handleRemoveJob();
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
            onClick={handleDeleteJob}
          />
        </div>
      </div>
    </Dialog>
  );
}
