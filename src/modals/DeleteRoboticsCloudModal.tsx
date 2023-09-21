import { Dialog } from "primereact/dialog";
import React, { ReactElement, useState } from "react";
import Button from "../components/Button/Button";

interface IDeleteRoboticsCloudModal {
  data: any;
  reload: () => void;
  visibleModal: boolean;
  handleCloseModal: () => void;
}

export default function DeleteRoboticsCloudModal({
  data,
  reload,
  visibleModal,
  handleCloseModal,
}: IDeleteRoboticsCloudModal): ReactElement {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function handleDeleteRoboticsCloud() {
    setIsLoading(true);
    setTimeout(() => {
      reload();
      handleCloseModal();
    }, 1000);
  }

  return (
    <Dialog
      header={`Delete Robotics Cloud ${data?.name?.name}`}
      visible={visibleModal}
      className="w-[30vw]"
      onHide={() => handleCloseModal()}
    >
      <div className="flex w-full flex-col gap-8">
        <p className="text-sm">
          If you terminate this robotics cloud, delete all data associated with
          it. Including all robots, fleets, and other resources. This action
          cannot be undone. Are you sure you want to terminate this robotics
          cloud?
        </p>
        <div className="flex items-center justify-end gap-4">
          <Button
            className="!h-11 !w-44"
            type="submit"
            text={
              isLoading ? (
                <img
                  className="h-10 w-10"
                  src="/svg/general/loading.svg"
                  alt="loading"
                />
              ) : (
                `Delete Robotics Cloud`
              )
            }
            onClick={() => handleDeleteRoboticsCloud()}
          />
        </div>
      </div>
    </Dialog>
  );
}
