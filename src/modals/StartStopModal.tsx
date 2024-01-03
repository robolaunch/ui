import { ReactElement } from "react";
import { Dialog } from "primereact/dialog";
import Button from "../components/Button/Button";

interface IStartStopModal {
  header?: string;
  text?: string;
  handleCloseModal: () => void;
  isRunning?: boolean;
  handleStart: () => void;
  handleStop: () => void;
}

export default function StartStopModal({
  header,
  text,
  handleCloseModal,
  isRunning,
  handleStart,
  handleStop,
}: IStartStopModal): ReactElement {
  return (
    <Dialog
      header={`${header || ""} Service Log`}
      visible={true}
      className="w-[40vw]"
      onHide={() => handleCloseModal()}
    >
      <div className="flex flex-col gap-2">
        <p className="text-sm">{text}</p>
        <div className="flex justify-end gap-4">
          <Button
            className="!h-9 !w-28 border border-primary-500 !bg-transparent !text-primary-500"
            text="Cancel"
            onClick={() => handleCloseModal()}
          />
          <Button
            className="!h-9 !w-28"
            text={isRunning ? "Stop" : "Start"}
            onClick={() => {
              isRunning ? handleStop() : handleStart();
            }}
          />
        </div>
      </div>
    </Dialog>
  );
}
