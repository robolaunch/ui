import { Dialog } from "primereact/dialog";
import React, { ReactElement, useState } from "react";
import Button from "../components/Button/Button";
import { useAppDispatch } from "../hooks/redux";
import { deleteNamespace } from "../toolkit/FleetSlice";

interface IDeleteNamespaceModal {
  data: any;
  reload: () => void;
  visibleModal: boolean;
  handleCloseModal: () => void;
}

export default function DeleteNamespaceModal({
  data,
  reload,
  visibleModal,
  handleCloseModal,
}: IDeleteNamespaceModal): ReactElement {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  function handleDeleteFleetModal() {
    setIsLoading(true);
    dispatch(
      deleteNamespace({
        organizationId: data?.organization?.organizationId,
        roboticsCloudName: data?.roboticsCloud,
        instanceId: data?.instance?.instanceId,
        namespaceName: data?.fleet?.name,
        region: data?.instance?.region,
      }),
    ).then(() => {
      setTimeout(() => {
        reload();
        handleCloseModal();
      }, 1000);
    });
  }

  return (
    <Dialog
      header="Delete Namespace"
      visible={visibleModal}
      className="w-[30vw]"
      onHide={() => handleCloseModal()}
    >
      <div className="flex w-full flex-col gap-8">
        <p className="text-sm">
          If you delete this namespace, delete all data associated with it.
          Including all application, and other resources. This action cannot be
          undone. Are you sure you want to delete this namespace?
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
                `Delete Namespace`
              )
            }
            onClick={() => handleDeleteFleetModal()}
          />
        </div>
      </div>
    </Dialog>
  );
}
