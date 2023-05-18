import React, { Fragment, ReactElement, useState } from "react";
import Button from "../Button/Button";
import { BiTrash, BiStopCircle, BiPlayCircle } from "react-icons/bi";
import ChangeStateInstaceModal from "../../modals/ChangeStateInstaceModal";
import TerminateInstanceModal from "../../modals/TerminateInstanceModal";

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
      <div className="card flex gap-4 float-right">
        <Button
          className={`!w-8 !h-8 !bg-transparent !border ${
            data?.state === "running" || data?.state === "stopped"
              ? "!border-layer-primary-500"
              : "!border-layer-dark-100"
          }`}
          text={
            data?.state === "running" ? (
              <BiStopCircle size={20} className="text-layer-primary-500" />
            ) : data?.state === "stopped" ? (
              <BiPlayCircle size={20} className="text-layer-primary-500" />
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
          className={`!w-8 !h-8 !bg-transparent !border  ${
            data?.state === "running" || data?.state === "stopped"
              ? "!border-red-600"
              : "!border-layer-dark-100"
          }`}
          text={
            data?.state === "running" || data?.state === "stopped" ? (
              <BiTrash className="text-red-600" />
            ) : (
              <img src="/svg/general/loading.svg" alt="loading" />
            )
          }
          onClick={() => setIsTerminateModalVisible(true)}
        />
      </div>
      {isChangeStateModalVisible && (
        <ChangeStateInstaceModal
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
