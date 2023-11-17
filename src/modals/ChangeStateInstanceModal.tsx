import { Dialog } from "primereact/dialog";
import React, { ReactElement, useState } from "react";
import Button from "../components/Button/Button";
import { useAppDispatch } from "../hooks/redux";
import { startInstance, stopInstance } from "../toolkit/InstanceSlice";

interface IChangeInstanceModal {
  data: any;
  reload: () => void;
  handleCloseModal: () => void;
}

export default function ChangeInstanceModal({
  data,
  reload,
  handleCloseModal,
}: IChangeInstanceModal): ReactElement {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  function handleChangeInstance() {
    if (data?.state === "running") {
      dispatch(
        stopInstance({
          name: data?.name,
          organizationId: data?.organizationId,
          roboticsCloudName: data?.roboticsCloudName,
          instanceId: data?.instanceId,
        }),
      );
    } else if (data?.state === "stopped") {
      dispatch(
        startInstance({
          name: data?.name,
          organizationId: data?.organizationId,
          roboticsCloudName: data?.roboticsCloudName,
          instanceId: data?.instanceId,
        }),
      );
    }

    setIsLoading(true);
    setTimeout(() => {
      reload();
      handleCloseModal();
    }, 1000);
  }

  return (
    <Dialog
      header="Change Instance State"
      visible={true}
      className="w-[30vw]"
      onHide={() => handleCloseModal()}
    >
      <div className="flex w-full flex-col gap-8">
        <p className="text-sm">
          {data?.state === "running"
            ? "Are you sure you want to stop this instance ?"
            : "Are you sure you want to start this instance ?"}
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
                `${data?.state === "running" ? "Stop" : "Start"} Instance`
              )
            }
            onClick={() => handleChangeInstance()}
            disabled={isLoading}
          />
        </div>
      </div>
    </Dialog>
  );
}
