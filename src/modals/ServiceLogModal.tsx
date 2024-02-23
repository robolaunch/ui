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
  console.log(window.innerHeight, window.outerHeight);

  return (
    <Dialog
      draggable={false}
      header={`${header || ""} Service Log`}
      visible={true}
      className="h-fit w-[90vw]"
      onHide={() => handleCloseModal()}
    >
      <LazyLog
        text={log}
        height={(window.innerHeight / 3) * 2}
        scrollToLine={9999999}
      />
    </Dialog>
  );
}
