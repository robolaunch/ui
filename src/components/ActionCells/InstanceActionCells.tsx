import React, { Fragment, ReactElement, useState } from "react";
import Button from "../Button/Button";
import { BiTrash, BiStopCircle, BiPlayCircle } from "react-icons/bi";
import ChangeStateInstaceModal from "../../modals/ChangeStateInstaceModal";

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

  return (
    <Fragment>
      <div className="card flex gap-4 float-right">
        {data?.state === "running" ? (
          <Button
            className="!w-8 !h-8 !bg-transparent !border !border-layer-primary-500"
            text={<BiStopCircle size={20} className="text-layer-primary-500" />}
            onClick={() => setIsChangeStateModalVisible(true)}
          />
        ) : data?.state === "stopped" ? (
          <Button
            className="!w-8 !h-8 !bg-transparent !border !border-layer-primary-500"
            text={<BiPlayCircle size={20} className="text-layer-primary-500" />}
            onClick={() => setIsChangeStateModalVisible(true)}
          />
        ) : (
          <Button
            className="!w-8 !h-8 !bg-transparent !border !border-layer-dark-100"
            text={<img src="/svg/general/loading.svg" alt="loading" />}
            disabled
          />
        )}
        <Button
          className="!w-8 !h-8 !bg-transparent !border !border-red-600"
          text={<BiTrash className="text-red-600" />}
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
    </Fragment>
  );
}
