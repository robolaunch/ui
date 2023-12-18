import { ReactElement } from "react";
import { Dialog } from "primereact/dialog";
import { LazyLog } from "@melloware/react-logviewer";

interface ILogModal {
  log?: string;
  handleCloseModal: () => void;
}

export default function LogModal({
  log,
  handleCloseModal,
}: ILogModal): ReactElement {
  return (
    <Dialog
      header={`Logs`}
      visible={true}
      className=" w-[90vw]"
      onHide={() => handleCloseModal()}
    >
      <LazyLog text={log} height={752} scrollToLine={9999999} />
    </Dialog>
  );
}
