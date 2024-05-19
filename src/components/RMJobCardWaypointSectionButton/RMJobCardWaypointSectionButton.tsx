import { Fragment, ReactElement, useState } from "react";
import TableActionButton from "../TableActionButton/TableActionButton";
import RMJobWaypointDeleteModal from "../../modals/RMJobWaypointDeleteModal";
import useTaskManagement from "../../hooks/useTaskManagement";

interface IRMJobCardWaypointSectionButton {
  index: number;
}

export default function RMJobCardWaypointSectionButton({
  index,
}: IRMJobCardWaypointSectionButton): ReactElement {
  const [isOpenedDeleteModal, setIsOpenedDeleteModal] =
    useState<boolean>(false);

  const { activeWaypoint, setActiveWaypoint } = useTaskManagement();

  return (
    <Fragment>
      <TableActionButton
        type={activeWaypoint === index ? "stop" : "edit"}
        onMouseDown={() => setActiveWaypoint(index)}
      />
      <TableActionButton
        type="delete"
        onMouseDown={() => setIsOpenedDeleteModal(true)}
      />
      {isOpenedDeleteModal && (
        <RMJobWaypointDeleteModal
          waypointId={index}
          handleCloseModal={() => setIsOpenedDeleteModal(false)}
        />
      )}
    </Fragment>
  );
}
