import { ReactElement } from "react";
import { Dialog } from "primereact/dialog";
import useRobot from "../hooks/useRobot";
import Terminal from "../components/Terminal/Terminal";

interface IServiceLogModal {
  type: "ide" | "vdi";
  handleCloseModal: () => void;
}

export default function ServiceLogModal({
  type,
  handleCloseModal,
}: IServiceLogModal): ReactElement {
  const { responseRobot } = useRobot();

  return (
    <Dialog
      header={`${type === "ide" ? "IDE" : "VDI"} Service Log`}
      visible={true}
      className="w-[80vw]"
      onHide={() => handleCloseModal()}
    >
      <div className="flex w-full flex-col gap-8">
        <Terminal
          value={
            type === "ide"
              ? responseRobot?.ideApplicationLog
              : responseRobot?.vdiApplicationLog
          }
        />
      </div>
    </Dialog>
  );
}
