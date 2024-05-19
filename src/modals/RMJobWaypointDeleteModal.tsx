import CFCancelButton from "../components/CFCancelButton/CFCancelButton";
import Button from "../components/Button/Button";
import { Dialog } from "primereact/dialog";
import { ReactElement } from "react";
import useTaskManagement from "../hooks/useTaskManagement";

interface IRMJobWaypointDeleteModal {
  handleCloseModal: () => void;
  waypointId: number;
}

export default function RMJobWaypointDeleteModal({
  waypointId,
  handleCloseModal,
}: IRMJobWaypointDeleteModal): ReactElement {
  const { jobs, activeJob, handleUpdateJob } = useTaskManagement();

  async function handleOnSubmit() {
    const job = jobs?.[activeJob!];

    const newJob = {
      ...job,
      waypoints: job.waypoints.filter(
        (waypoint, index) => index !== waypointId,
      ),
    };

    await handleUpdateJob(newJob);
    await handleCloseModal();
  }

  return (
    <Dialog
      header="Remove Waypoint"
      visible={true}
      className="flex h-fit w-[40vw] "
      onHide={handleCloseModal}
      draggable={false}
      closable={false}
    >
      <div className="flex flex-col gap-10 p-2">
        <p>Are you sure you want to remove waypoint?</p>
        <div className="mt-4 flex gap-2">
          <CFCancelButton onMouseDown={handleCloseModal} />
          <Button
            type="submit"
            className="!h-11 text-xs"
            text="Remove Waypoint"
            onMouseDown={handleOnSubmit}
          />
        </div>
      </div>
    </Dialog>
  );
}
