import {
  envCreateInstance,
  envOnPremiseFleet,
  envOnPremiseRobot,
} from "../../helpers/envProvider";
import ChangeStateInstanceModal from "../../modals/ChangeStateInstanceModal";
import TerminateInstanceModal from "../../modals/TerminateInstanceModal";
import { BiTrash, BiStopCircle, BiPlayCircle } from "react-icons/bi";
import { Fragment, ReactElement, useEffect, useState } from "react";
import Button from "../Button/Button";
interface IInstanceActionCells {
  data: any;
  reload: () => void;
}

export default function InstanceActionCells({
  data,
  reload,
}: IInstanceActionCells): ReactElement {
  const [isChangeStateModalVisible, setIsChangeStateModalVisible] =
    useState<boolean>(false);
  const [isTerminateModalVisible, setIsTerminateModalVisible] =
    useState<boolean>(false);
  const [isApplicationMode, setIsApplicationMode] = useState<boolean>(false);

  useEffect(() => {
    setIsApplicationMode(envOnPremiseRobot || envOnPremiseFleet);
  }, []);

  return (
    <Fragment>
      <div className="card float-right flex gap-4">
        <Button
          tooltip="Start/Stop Instance"
          className={`!h-8 !w-8 !border !bg-transparent disabled:!border-layer-light-500 ${
            data?.state === "running" || data?.state === "stopped"
              ? "!border-layer-primary-500"
              : "!border-layer-dark-100"
          }`}
          text={
            data?.state === "running" ? (
              <BiStopCircle
                size={20}
                className={`${
                  isApplicationMode
                    ? "text-layer-light-500"
                    : "text-layer-primary-500"
                }`}
              />
            ) : data?.state === "stopped" ? (
              <BiPlayCircle
                size={20}
                className={`${
                  isApplicationMode
                    ? "text-layer-light-500"
                    : "text-layer-primary-500"
                }`}
              />
            ) : (
              <img src="/svg/general/loading.svg" alt="loading" />
            )
          }
          disabled={
            isApplicationMode ||
            data?.state === "running" ||
            data?.state === "stopped"
              ? false
              : true || !envCreateInstance
          }
          onClick={
            data?.state === "running" || data?.state === "stopped"
              ? () => setIsChangeStateModalVisible(true)
              : () => {}
          }
        />
        <Button
          tooltip="Terminate Instance"
          className={`!h-8 !w-8 !border !bg-transparent disabled:!border-layer-light-500 ${
            data?.state === "running" || data?.state === "stopped"
              ? "!border-red-600"
              : "!border-layer-dark-100"
          }`}
          text={
            data?.state === "running" ||
            data?.state === "stopped" ||
            isApplicationMode ? (
              <BiTrash
                className={`${
                  isApplicationMode ? "text-layer-light-500" : "text-red-600"
                }`}
              />
            ) : (
              <img src="/svg/general/loading.svg" alt="loading" />
            )
          }
          disabled={!envCreateInstance}
          onClick={() => setIsTerminateModalVisible(true)}
        />
      </div>
      {isChangeStateModalVisible && (
        <ChangeStateInstanceModal
          data={data}
          reload={reload}
          handleCloseModal={() => setIsChangeStateModalVisible(false)}
          visibleModal={isChangeStateModalVisible}
        />
      )}
      {isTerminateModalVisible && (
        <TerminateInstanceModal
          data={data}
          reload={reload}
          handleCloseModal={() => setIsTerminateModalVisible(false)}
          visibleModal={isTerminateModalVisible}
        />
      )}
    </Fragment>
  );
}
