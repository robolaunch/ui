import { ReactElement, useState } from "react";
import TableActionButton from "../TableActionButton/TableActionButton";
import RMTaskWaypointDeleteModal from "../../modals/RMTaskWaypointDeleteModal";
import { IWaypoint } from "../../interfaces/context/misssion.context.interface";
import RMTaskWaypointUpdateModal from "../../modals/RMTaskWaypointUpdateModal";

interface IRMTaskWaypointCardButtons {
  type: "waypoints" | "waitingPoints";
  waypoint: IWaypoint;
}

export default function RMTaskWaypointCardButtons({
  type,
  waypoint,
}: IRMTaskWaypointCardButtons): ReactElement {
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
      {isOpenedEditModal && (
        <RMTaskWaypointUpdateModal
          type={type}
          waypoint={waypoint}
          handleCloseModal={() => setIsOpenedEditModal(false)}
        />
      )}
      {isOpenedDeleteModal && (
        <RMTaskWaypointDeleteModal
          type={type}
          waypoint={waypoint}
          handleCloseModal={() => setIsOpenedDeleteModal(false)}
        />
      )}
    </div>
  );
}
