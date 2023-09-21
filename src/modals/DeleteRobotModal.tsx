import { Dialog } from "primereact/dialog";
import React, { ReactElement, useState } from "react";
import Button from "../components/Button/Button";
import { useAppDispatch } from "../hooks/redux";
import { deleteRobot } from "../toolkit/RobotSlice";

interface IDeleteRobotModalModal {
  data: any;
  reload: () => void;
  visibleModal: boolean;
  handleCloseModal: () => void;
}

export default function DeleteRobotModalModal({
  data,
  reload,
  visibleModal,
  handleCloseModal,
}: IDeleteRobotModalModal): ReactElement {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  function handleDeleteRobotModal() {
    setIsLoading(true);

    dispatch(
      deleteRobot({
        organizationId: data?.organizationId,
        roboticsCloudName: data?.roboticsCloudName,
        instanceId: data?.instanceId,
        region: data?.region,
        fleetName: data?.fleetName,
        robotName: data?.robotName,
      }),
    ).then(async (res: any) => {
      (await res) &&
        setTimeout(() => {
          reload();
          handleCloseModal();
        }, 1000);
    });
  }

  return (
    <Dialog
      header="Delete Robot Modal"
      visible={visibleModal}
      className="w-[30vw]"
      onHide={() => handleCloseModal()}
    >
      <div className="flex w-full flex-col gap-8">
        <p className="text-sm">
          Are you sure you want to delete the robot named{" "}
          <span className="font-semibold">{data?.robotName}</span>?
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
                `Delete Robot`
              )
            }
            onClick={() => handleDeleteRobotModal()}
          />
        </div>
      </div>
    </Dialog>
  );
}
