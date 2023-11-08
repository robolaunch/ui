import {
  envCreateInstance,
  envOnPremiseFleet,
  envOnPremiseRobot,
} from "../../helpers/envProvider";
import { BiTrash, BiStopCircle, BiPlayCircle } from "react-icons/bi";
import ChangeStateInstanceModal from "../../modals/ChangeStateInstanceModal";
import TerminateInstanceModal from "../../modals/TerminateInstanceModal";
import { Fragment, ReactElement, useState } from "react";
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

  return (
    <Fragment>
      <div className="card float-right flex gap-4">
        <Button
          className={`!h-8 !w-8 !border !bg-transparent disabled:!border-layer-light-500 ${
            data?.state === "running" || data?.state === "stopped"
              ? "!border-layer-primary-500"
              : "!border-layer-dark-100"
          }`}
          text={
            data?.state === "running" ||
            envOnPremiseRobot ||
            envOnPremiseFleet ? (
              <BiStopCircle
                size={20}
                className={`${
                  envOnPremiseRobot
                    ? "text-layer-light-500"
                    : "text-layer-primary-500"
                }`}
              />
            ) : data?.state === "stopped" ? (
              <BiPlayCircle
                size={20}
                className={`${
                  envOnPremiseRobot
                    ? "text-layer-light-500"
                    : "text-layer-primary-500"
                }`}
              />
            ) : (
              <img src="/svg/general/loading.svg" alt="loading" />
            )
          }
          disabled={
            data?.state === "running" || data?.state === "stopped"
              ? false
              : true
          }
          onClick={
            data?.state === "running" || data?.state === "stopped"
              ? () => setIsChangeStateModalVisible(true)
              : () => {}
          }
        />
        <Button
          className={`!h-8 !w-8 !border !bg-transparent disabled:!border-layer-light-500 ${
            data?.state === "running" || data?.state === "stopped"
              ? "!border-red-600"
              : "!border-layer-dark-100"
          }`}
          text={
            data?.state === "running" ||
            data?.state === "stopped" ||
            envOnPremiseRobot ||
            envOnPremiseFleet ? (
              <BiTrash
                className={`${
                  envOnPremiseRobot ? "text-layer-light-500" : "text-red-600"
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
