import RMTaskWaypointAddModal from "../../modals/RMTaskWaypointAddModal";
import { Fragment, ReactElement, useState } from "react";
import CFAddButton from "../CFAddButton/CFAddButton";

interface IRMTaskWaypointAdd {
  type: "waypoints" | "waitingPoints";
}

export default function RMTaskWaypointAdd({
  type,
}: IRMTaskWaypointAdd): ReactElement {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  return (
    <Fragment>
      <CFAddButton onClick={() => setIsOpened(true)} />
      {isOpened && (
        <RMTaskWaypointAddModal
          type={type}
          handleCloseModal={() => setIsOpened(false)}
        />
      )}
    </Fragment>
  );
}
