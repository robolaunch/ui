import { ReactElement, useState } from "react";
import TableActionButton from "../TableActionButton/TableActionButton";
import { IWaypoint } from "../../interfaces/task-management.interface";
import RMTaskWaypointDeleteModalV2 from "../../modals/RMTaskWaypointDeleteModalV2";

interface IRMTaskWaypointCardButtons {
  waypoint: IWaypoint;
}

export default function RMTaskWaypointCardButtons({
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
      {/* {isOpenedEditModal && (
        <RMTaskWaypointUpdateModalV2
          waypoint={waypoint}
          handleCloseModal={() => setIsOpenedEditModal(false)}
        />
      )} */}
      {isOpenedDeleteModal && (
        <RMTaskWaypointDeleteModalV2
          waypoint={waypoint}
          handleCloseModal={() => setIsOpenedDeleteModal(false)}
        />
      )}
    </div>
  );
}
