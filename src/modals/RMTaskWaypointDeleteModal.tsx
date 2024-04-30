import CFCancelButton from "../components/CFCancelButton/CFCancelButton";
import Button from "../components/Button/Button";
import { Dialog } from "primereact/dialog";
import { ReactElement } from "react";
import useTask from "../hooks/useTask";
import { IWaypoint } from "../interfaces/context/misssion.context.interface";

interface IRMTaskWaypointDeleteModal {
  handleCloseModal: () => void;
  type: "waypoints" | "waitingPoints";
  waypoint: IWaypoint;
}

export default function RMTaskWaypointDeleteModal({
  handleCloseModal,
  type,
  waypoint,
}: IRMTaskWaypointDeleteModal): ReactElement {
  const { handleRemoveWaitingWaypoint, handleRemoveWaypoint, handleReload } =
    useTask();

  function handleOnSubmit() {
    if (type === "waypoints") {
      console.log("Removing waypoint", waypoint);
      handleRemoveWaypoint(waypoint);
    } else {
      handleRemoveWaitingWaypoint(waypoint);
    }
    handleReload();

    handleCloseModal();
  }

  return (
    <Dialog
      header={`Remove ${type === "waypoints" ? "Waypoint" : "Waiting Point"}`}
      visible={true}
      className="flex h-fit w-[40vw] "
      onHide={handleCloseModal}
      draggable={false}
    >
      <div className="flex flex-col gap-10 p-2">
        <p>Are you sure you want to remove waypoint?</p>
        <div className="mt-4 flex gap-2">
          <CFCancelButton onClick={handleCloseModal} />
          <Button
            type="submit"
            className="!h-11 text-xs"
            text={`Remove ${type === "waypoints" ? "Waypoint" : "Waiting Point"}`}
            onClick={handleOnSubmit}
          />
        </div>
      </div>
    </Dialog>
  );
}
