import React, { Fragment, ReactElement, useState } from "react";
import Button from "../Button/Button";
import { BiTrash, BiStopCircle, BiPlayCircle } from "react-icons/bi";
import ChangeStateInstanceModal from "../../modals/ChangeStateInstanceModal";
import TerminateInstanceModal from "../../modals/TerminateInstanceModal";
import {
  envOnPremiseFleet,
  envOnPremiseRobot,
} from "../../helpers/envProvider";

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

  console.log(data);

  return (
    <Fragment>
      <div className="card flex gap-4 float-right">
        <Button
          className={`!w-8 !h-8 !bg-transparent !border disabled:!border-layer-light-500 ${
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
            envOnPremiseRobot ||
            (data?.state === "running" || data?.state === "stopped"
              ? false
              : true)
          }
          onClick={
            data?.state === "running" || data?.state === "stopped"
              ? () => setIsChangeStateModalVisible(true)
              : () => {}
          }
        />
        <Button
          className={`!w-8 !h-8 !bg-transparent !border disabled:!border-layer-light-500 ${
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
          disabled={envOnPremiseRobot}
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
