import { Dialog } from "primereact/dialog";
import React, { ReactElement } from "react";
import Terminal from "../components/Terminal/Terminal";

interface ILogsModal {
  log: string;
  handleCloseModal: () => void;
}

export default function LogsModal({
  log,
  handleCloseModal,
}: ILogsModal): ReactElement {
  return (
    <Dialog
      header="Logs"
      visible={true}
      draggable={false}
      className="w-[50vw]"
      onHide={() => handleCloseModal()}
    >
      <div className="h-96">
        <Terminal value={log} />
      </div>
    </Dialog>
  );
}
