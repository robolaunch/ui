import { Fragment, ReactElement, useState } from "react";
import AddButton from "../addbutton/addbutton.comp";
import AddWaitingModal from "../../modals/waitingpoint.modal";
import EditButton from "../editbutton/editbutton.comp";

interface IAddWaitingPoint {
  ros: any;
  initialValues?: any;
}

export default function AddWaitingPoint({
  ros,
  initialValues,
}: IAddWaitingPoint): ReactElement {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Fragment>
      {initialValues ? (
        <EditButton onClick={() => setIsOpen(!isOpen)} />
      ) : (
        <AddButton onClick={() => setIsOpen(!isOpen)} />
      )}
      {isOpen && (
        <AddWaitingModal
          ros={ros}
          header="Add Waiting Point"
          handleCloseModal={() => setIsOpen(false)}
        />
      )}
    </Fragment>
  );
}
