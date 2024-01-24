import { Fragment, ReactElement, useState } from "react";
import Button from "../Button/Button";
import StartStopModal from "../../modals/StartStopModal";

interface IStartStopCell {
  isRunning: boolean;
  loading?: boolean;
  disabled?: boolean;
  modalText?: string;
  handleStart: () => void;
  handleStop: () => void;
}

export default function StartStopCell({
  isRunning,
  loading,
  disabled,
  modalText,
  handleStart,
  handleStop,
}: IStartStopCell): ReactElement {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  return (
    <Fragment>
      {loading ? (
        <img
          className="h-10 w-10"
          src="/svg/general/loading.svg"
          alt="loading"
        />
      ) : (
        <Button
          className={`!h-9 ${
            isRunning &&
            "border border-primary-500 !bg-transparent !text-primary-500 disabled:cursor-not-allowed disabled:!border-primary-200 disabled:!text-primary-200"
          }`}
          disabled={disabled}
          loading={loading}
          text={isRunning ? "Stop" : "Start"}
          onClick={() => setIsOpenModal(true)}
        />
      )}
      {isOpenModal && (
        <StartStopModal
          isRunning={isRunning}
          handleStart={handleStart}
          handleStop={handleStop}
          handleCloseModal={() => setIsOpenModal(false)}
          text={modalText}
        />
      )}
    </Fragment>
  );
}
