import { Dialog } from "primereact/dialog";
import React, { ReactElement, useState } from "react";
import Button from "../components/Button/Button";
import { useAppDispatch } from "../hooks/redux";
import { terminateInstance } from "../resources/InstanceSlice";

interface ITerminateInstanceModal {
  data: any;
  reload: () => void;
  visibleModal: boolean;
  handleCloseModal: () => void;
}

export default function TerminateInstanceModal({
  data,
  reload,
  visibleModal,
  handleCloseModal,
}: ITerminateInstanceModal): ReactElement {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  console.log(data);

  function handleTerminateInstance() {
    dispatch(
      terminateInstance({
        organizationId: data?.organizationId,
        roboticsCloudName: data?.roboticsCloudName,
        instanceId: data?.instanceId,
        region: data?.region,
      })
    );

    setIsLoading(true);
    setTimeout(() => {
      reload();
      handleCloseModal();
    }, 1000);
  }

  return (
    <Dialog
      header="Terminate Instance Modal"
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
