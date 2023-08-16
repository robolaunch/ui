import { Dialog } from "primereact/dialog";
import React, { ReactElement, useState } from "react";
import Button from "../components/Button/Button";
import { useAppDispatch } from "../hooks/redux";
import { deleteEnvironment } from "../toolkit/EnvironmentSlice";

interface IDeleteEnvironmentModal {
  data: any;
  reload: () => void;
  visibleModal: boolean;
  handleCloseModal: () => void;
}

export default function DeleteEnvironmentModal({
  data,
  reload,
  visibleModal,
  handleCloseModal,
}: IDeleteEnvironmentModal): ReactElement {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  function handleDeleteRobotModal() {
    setIsLoading(true);

    dispatch(
      deleteEnvironment({
        organizationId: data?.organizationId,
        roboticsCloudName: data?.roboticsCloudName,
        instanceId: data?.instanceId,
        region: data?.region,
        fleetName: data?.fleetName,
        environmentName: data?.robotName,
      })
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
      <div className="w-full flex flex-col gap-8">
        <p className="text-sm">
          Are you sure you want to delete the application named{" "}
          <span className="font-semibold">{data?.robotName}</span>?
        </p>
        <div className="flex justify-end items-center gap-4">
          <Button
            className="!w-44 !h-11"
            type="submit"
            text={
              isLoading ? (
                <img
                  className="w-10 h-10"
                  src="/svg/general/loading.svg"
                  alt="loading"
                />
              ) : (
                `Delete Application`
              )
            }
            onClick={() => handleDeleteRobotModal()}
          />
        </div>
      </div>
    </Dialog>
  );
}
