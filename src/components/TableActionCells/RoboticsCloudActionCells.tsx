import React, { Fragment, ReactElement, useState } from "react";
import Button from "../Button/Button";
import { BiTrash } from "react-icons/bi";
import DeleteRoboticsCloudModal from "../../modals/DeleteRoboticsCloudModal";
import { envOnPremiseRobot } from "../../helpers/envProvider";

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
      <div className="card float-right flex gap-4">
        <Button
          className="!h-8 !w-8 !border !border-red-600 !bg-transparent disabled:!border-layer-light-500"
          text={
            <BiTrash
              className={`${
                envOnPremiseRobot ? "text-layer-light-500" : "text-red-600"
              }`}
            />
          }
          onClick={() => setIsDeleteModalVisible(true)}
          disabled={envOnPremiseRobot}
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
