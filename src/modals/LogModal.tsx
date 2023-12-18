import { ReactElement } from "react";
import { Dialog } from "primereact/dialog";
import Terminal from "../components/Terminal/Terminal";

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
      className=" w-[80vw]"
      onHide={() => handleCloseModal()}
    >
      <div className="flex h-full w-full flex-col gap-8">
        <Terminal value={log || ""} />
      </div>
    </Dialog>
  );
}
