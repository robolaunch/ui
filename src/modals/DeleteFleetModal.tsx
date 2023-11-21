import { Dialog } from "primereact/dialog";
import { ReactElement, useState } from "react";
import Button from "../components/Button/Button";
import { useAppDispatch } from "../hooks/redux";
import { deleteFederatedFleet } from "../toolkit/FleetSlice";

interface IDeleteFleetModalModal {
  data: any;
  reload: () => void;
  handleCloseModal: () => void;
}

export default function DeleteFleetModalModal({
  data,
  reload,
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
      header="Delete Fleet"
      visible={true}
      className="w-[40vw]"
      onHide={() => handleCloseModal()}
    >
      <div className="flex w-full flex-col gap-8">
        <p className="text-sm">
          If you delete this fleet, delete all data associated with it.
          Including all robots, and other resources. This action cannot be
          undone. Are you sure you want to delete this fleet?
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
