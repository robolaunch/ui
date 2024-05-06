import RMTaskJobAddModal from "../../modals/RMTaskJobAddModal";
import { Fragment, ReactElement, useState } from "react";
import CFAddButton from "../CFAddButton/CFAddButton";

export default function RMTaskJobAdd(): ReactElement {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  return (
    <Fragment>
      <CFAddButton onClick={() => setIsOpened(true)} />
      {isOpened && (
        <RMTaskJobAddModal handleCloseModal={() => setIsOpened(false)} />
      )}
    </Fragment>
  );
}
