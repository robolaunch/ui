import { Fragment, ReactElement, useState } from "react";
import CFAddButton from "../CFAddButton/CFAddButton";
import RMTaskWaypointAddModalV2 from "../../modals/RMTaskWaypointAddModalV2";

export default function RMTaskWaypointAddV2(): ReactElement {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  return (
    <Fragment>
      <CFAddButton onClick={() => setIsOpened(true)} />
      {isOpened && (
        <RMTaskWaypointAddModalV2 handleCloseModal={() => setIsOpened(false)} />
      )}
    </Fragment>
  );
}
