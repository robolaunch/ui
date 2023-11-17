import { Dialog } from "primereact/dialog";
import React, { ReactElement, useState } from "react";
import Button from "../components/Button/Button";
import { useAppDispatch } from "../hooks/redux";
import { terminateInstance } from "../toolkit/InstanceSlice";

interface ITerminateInstanceModal {
  data: any;
  reload: () => void;
  handleCloseModal: () => void;
}

export default function TerminateInstanceModal({
  data,
  reload,
  handleCloseModal,
}: ITerminateInstanceModal): ReactElement {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  function handleTerminateInstance() {
    dispatch(
      terminateInstance({
        organizationId: data?.organizationId,
        roboticsCloudName: data?.roboticsCloudName,
        instanceId: data?.instanceId,
        region: data?.region,
      }),
    );

    setIsLoading(true);
    setTimeout(() => {
      reload();
      handleCloseModal();
    }, 1000);
  }

  return (
    <Dialog
      header={`Terminate Instance ${data?.name}`}
      visible={true}
      className="w-[30vw]"
      onHide={() => handleCloseModal()}
    >
      <div className="flex w-full flex-col gap-8">
        <p className="text-sm">
          If you terminate this instance, delete all data associated with it.
          Including all robots, fleets, and other resources. This action cannot
          be undone. Are you sure you want to terminate this instance?
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
                `Terminate Instance`
              )
            }
            onClick={() => handleTerminateInstance()}
          />
        </div>
      </div>
    </Dialog>
  );
}
