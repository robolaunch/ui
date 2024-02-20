import { Fragment, ReactElement, useState } from "react";
import AddButton from "../addbutton/addbutton.comp";
import AddWaypointModal from "../../modals/waypoint.modal";
import EditButton from "../editbutton/editbutton.comp";

interface IAddWaypoint {
  ros: any;
  initialValues?: any;
}

export default function AddWaypoint({
  ros,
  initialValues,
}: IAddWaypoint): ReactElement {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Fragment>
      {initialValues ? (
        <EditButton onClick={() => setIsOpen(!isOpen)} />
      ) : (
        <AddButton onClick={() => setIsOpen(!isOpen)} />
      )}
      {isOpen && (
        <AddWaypointModal
          ros={ros}
          header="Add Waypoint"
          handleCloseModal={() => setIsOpen(false)}
        />
      )}
    </Fragment>
  );
}
