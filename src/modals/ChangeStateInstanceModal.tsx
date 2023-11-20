import { startInstance, stopInstance } from "../toolkit/InstanceSlice";
import Button from "../components/Button/Button";
import { useAppDispatch } from "../hooks/redux";
import { ReactElement, useState } from "react";
import { Dialog } from "primereact/dialog";

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
    setIsLoading(true);

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

    setTimeout(() => {
      reload();
      handleCloseModal();
    }, 1000);
  }

  return (
    <Dialog
      header={`${data?.state === "running" ? "Stop" : "Start"} Instance`}
      visible={true}
      className="w-[40vw]"
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
              data?.state === "running" ? "Stop Instance" : "Start Instance"
            }
            loading={isLoading}
            disabled={isLoading}
            onClick={() => handleChangeInstance()}
          />
        </div>
      </div>
    </Dialog>
  );
}
