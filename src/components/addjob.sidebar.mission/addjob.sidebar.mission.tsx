import { Fragment, ReactElement, useState } from "react";
import AddButton from "../addbutton/addbutton.comp";
import EditButton from "../editbutton/editbutton.comp";
import AddJobModal from "../../modals/job.modal";

interface IAddJob {
  initialValues?: any;
}

export default function AddJob({ initialValues }: IAddJob): ReactElement {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Fragment>
      {initialValues ? (
        <EditButton onClick={() => setIsOpen(!isOpen)} />
      ) : (
        <AddButton onClick={() => setIsOpen(!isOpen)} />
      )}
      {isOpen && (
        <AddJobModal
          header="Add Job"
          handleCloseModal={() => setIsOpen(false)}
        />
      )}
    </Fragment>
  );
}
