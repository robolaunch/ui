import React, { Fragment, ReactElement, useState } from "react";
import Button from "../Button/Button";
import { BiTrash } from "react-icons/bi";
import DeleteRoboticsCloudModal from "../../modals/DeleteRoboticsCloudModal";
import { envOnPremise } from "../../helpers/envProvider";

interface IRoboticsCloudActionCells {
  data: any;
  reload: () => void;
}

export default function RoboticsCloudActionCells({
  data,
  reload,
}: IRoboticsCloudActionCells): ReactElement {
  const [isDeleteModalVisible, setIsDeleteModalVisible] =
    useState<boolean>(false);

  return (
    <Fragment>
      <div className="card flex gap-4 float-right">
        <Button
          className="!w-8 !h-8 !bg-transparent !border !border-red-600 disabled:!border-layer-light-500"
          text={
            <BiTrash
              className={`${
                envOnPremise ? "text-layer-light-500" : "text-red-600"
              }`}
            />
          }
          onClick={() => setIsDeleteModalVisible(true)}
          disabled={envOnPremise}
        />
      </div>
      {isDeleteModalVisible && (
        <DeleteRoboticsCloudModal
          data={data}
          reload={reload}
          handleCloseModal={() => setIsDeleteModalVisible(false)}
          visibleModal={isDeleteModalVisible}
        />
      )}
    </Fragment>
  );
}
