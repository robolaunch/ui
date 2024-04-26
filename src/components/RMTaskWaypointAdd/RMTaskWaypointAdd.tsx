import RMTaskWaypointAddModal from "../../modals/RMTaskWaypointAddModal";
import { Fragment, ReactElement, useState } from "react";
import CFAddButton from "../CFAddButton/CFAddButton";

export default function RMTaskWaypointAdd(): ReactElement {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  return (
    <Fragment>
      <CFAddButton onClick={() => setIsOpened(true)} />
      {isOpened && (
        <RMTaskWaypointAddModal handleCloseModal={() => setIsOpened(false)} />
      )}
    </Fragment>
  );
}
