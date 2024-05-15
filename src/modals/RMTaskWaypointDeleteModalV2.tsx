import CFCancelButton from "../components/CFCancelButton/CFCancelButton";
import Button from "../components/Button/Button";
import { Dialog } from "primereact/dialog";
import { ReactElement } from "react";
import { IWaypoint } from "../interfaces/task-management.interface";
import { useAppDispatch } from "../hooks/redux";
import useTaskManagement from "../hooks/useTaskManagement";
import { removeWaypoint } from "../toolkit/WaypointSlice";

interface IRMTaskWaypointDeleteModalV2 {
  waypoint: IWaypoint;
  handleCloseModal: () => void;
}

export default function RMTaskWaypointDeleteModalV2({
  waypoint,
  handleCloseModal,
}: IRMTaskWaypointDeleteModalV2): ReactElement {
  const dispatch = useAppDispatch();

  const { reloadWaypoints } = useTaskManagement();

  async function handleOnSubmit() {
    await dispatch(removeWaypoint(waypoint));
    await reloadWaypoints();
    await handleCloseModal();
  }

  return (
    <Dialog
      header="Remove Waypoint"
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
            text="Remove Waypoint"
            onClick={handleOnSubmit}
          />
        </div>
      </div>
    </Dialog>
  );
}
