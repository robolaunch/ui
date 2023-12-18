import { ReactElement } from "react";
import { Dialog } from "primereact/dialog";
import useRobot from "../hooks/useRobot";
import { LazyLog } from "@melloware/react-logviewer";

interface IServiceLogModal {
  type?: "ide" | "vdi";
  log?: string;
  handleCloseModal: () => void;
}

export default function ServiceLogModal({
  type,
  log,
  handleCloseModal,
}: IServiceLogModal): ReactElement {
  const { responseRobot } = useRobot();

  return (
    <Dialog
      header={`${type === "ide" ? "IDE" : "VDI"} Service Log`}
      visible={true}
      className="h-full w-[90vw]"
      onHide={() => handleCloseModal()}
    >
      <LazyLog
        text={
          type
            ? type === "ide"
              ? responseRobot?.ideApplicationLog
              : responseRobot?.vdiApplicationLog
            : log
        }
        height={752}
        scrollToLine={9999999}
      />
    </Dialog>
  );
}
