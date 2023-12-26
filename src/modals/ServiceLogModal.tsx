import { ReactElement } from "react";
import { Dialog } from "primereact/dialog";
import { LazyLog } from "@melloware/react-logviewer";

interface IServiceLogModal {
  header?: string;
  log?: string;
  handleCloseModal: () => void;
}

export default function ServiceLogModal({
  header,
  log,
  handleCloseModal,
}: IServiceLogModal): ReactElement {
  return (
    <Dialog
      header={`${header || ""} Service Log`}
      visible={true}
      className="h-full w-[90vw]"
      onHide={() => handleCloseModal()}
    >
      <LazyLog text={log} height={752} scrollToLine={9999999} />
    </Dialog>
  );
}
