import { Dialog } from "primereact/dialog";
import { ReactElement, useState } from "react";
import Button from "../components/Button/Button";
import { useAppDispatch } from "../hooks/redux";
import { deleteNamespace } from "../toolkit/FleetSlice";

interface IDeleteNamespaceModal {
  data: any;
  reload: () => void;
  handleCloseModal: () => void;
}

export default function DeleteNamespaceModal({
  data,
  reload,
  handleCloseModal,
}: IDeleteNamespaceModal): ReactElement {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  function handleDeleteNamespaceModal() {
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
      visible={true}
      className="w-[40vw]"
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
            onClick={() => handleDeleteNamespaceModal()}
          />
        </div>
      </div>
    </Dialog>
  );
}
