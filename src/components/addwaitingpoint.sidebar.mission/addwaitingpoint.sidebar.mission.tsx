import { Fragment, ReactElement, useState } from "react";
import AddButton from "../addbutton/addbutton.comp";
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
    </Fragment>
  );
}
