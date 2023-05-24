import { Dialog } from "primereact/dialog";
import React, { ReactElement, useState } from "react";
import Button from "../components/Button/Button";
import { useAppDispatch } from "../hooks/redux";
import { deleteFederatedFleet } from "../resources/FleetSlice";

interface IDeleteFleetModalModal {
  data: any;
  reload: () => void;
  visibleModal: boolean;
  handleCloseModal: () => void;
}

export default function DeleteFleetModalModal({
  data,
  reload,
  visibleModal,
  handleCloseModal,
}: IDeleteFleetModalModal): ReactElement {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  function handleDeleteFleetModal() {
    setIsLoading(true);
    dispatch(
      deleteFederatedFleet({
        organizationId: data?.organization?.organizationId,
        roboticsCloudName: data?.roboticsCloud,
        instanceId: data?.instance?.instanceId,
        robolaunchFederatedFleetsName: data?.fleet?.name,
        region: data?.instance?.region,
      })
    ).then(() => {
      setTimeout(() => {
        reload();
        handleCloseModal();
      }, 1000);
    });
  }

  return (
    <Dialog
      header="Delete Fleet Modal"
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
                `Delete Fleet`
              )
            }
            onClick={() => handleDeleteFleetModal()}
          />
        </div>
      </div>
    </Dialog>
  );
}
