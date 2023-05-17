import { Dialog } from "primereact/dialog";
import React, { ReactElement, useState } from "react";
import Button from "../components/Button/Button";
import { useAppDispatch } from "../hooks/redux";
import { startInstance, stopInstance } from "../resources/InstanceSlice";

interface IChangeInstanceModal {
  data: any;
  reload: () => void;
  visibleModal: boolean;
  handleCloseModal: () => void;
}

export default function ChangeInstanceModal({
  data,
  reload,
  visibleModal,
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
        })
      );
    } else if (data?.state === "stopped") {
      dispatch(
        startInstance({
          name: data?.name,
          organizationId: data?.organizationId,
          roboticsCloudName: data?.roboticsCloudName,
          instanceId: data?.instanceId,
        })
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
      visible={visibleModal}
      className="w-[30vw]"
      onHide={() => handleCloseModal()}
    >
      <div className="w-full flex flex-col gap-8">
        <p className="text-sm">Details</p>
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
