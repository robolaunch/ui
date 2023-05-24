import React, { Fragment, ReactElement, useState } from "react";
import Button from "../Button/Button";
import { BiTrash } from "react-icons/bi";
import DeleteFleetModalModal from "../../modals/DeleteFleetModal";

interface IFleetActionCells {
  data: any;
  reload: () => void;
}

export default function FleetActionCells({
  data,
  reload,
}: IFleetActionCells): ReactElement {
  const [isDeleteModalVisible, setIsDeleteModalVisible] =
    useState<boolean>(false);

  return (
    <Fragment>
      <div className="card flex gap-4 float-right">
        <Button
          className={`!w-8 !h-8 !bg-transparent !border  ${
            data?.fleet?.fleetStatus === "Ready"
              ? "!border-red-600"
              : "!border-layer-dark-100"
          }`}
          text={
            data?.fleet?.fleetStatus === "Ready" ? (
              <BiTrash className="text-red-600" />
            ) : (
              <img src="/svg/general/loading.svg" alt="loading" />
            )
          }
          onClick={() => setIsDeleteModalVisible(true)}
        />
      </div>
      {isDeleteModalVisible && (
        <DeleteFleetModalModal
          data={data || undefined}
          reload={reload}
          handleCloseModal={() => setIsDeleteModalVisible(false)}
          visibleModal={isDeleteModalVisible}
        />
      )}
    </Fragment>
  );
}
