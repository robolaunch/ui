import { deleteLaunchManager } from "../toolkit/RobotSlice";
import useCreateRobot from "../hooks/useCreateRobot";
import Button from "../components/Button/Button";
import { useAppDispatch } from "../hooks/redux";
import { ReactElement, useState } from "react";
import { Dialog } from "primereact/dialog";
import useMain from "../hooks/useMain";

interface IDeleteLaunchManagerModal {
  handleCloseModal: () => void;
  launchManagerName: string;
}

export default function DeleteLaunchManagerModal({
  handleCloseModal,
  launchManagerName,
}: IDeleteLaunchManagerModal): ReactElement {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { selectedState } = useMain();
  const { robotData } = useCreateRobot();

  async function handleDeleteLaunchManager() {
    setIsLoading(true);
    await dispatch(
      deleteLaunchManager({
        organizationId: selectedState?.organization!.id,
        roboticsCloudName: selectedState?.roboticsCloud!.name,
        instanceId: selectedState?.instance?.id!,
        region: selectedState?.roboticsCloud?.region!,
        robotName: robotData?.step1?.details.name,
        fleetName: selectedState?.fleet?.name!,
        physicalInstanceName: robotData?.step1?.details?.physicalInstanceName,
        launchManagerName: launchManagerName,
      }),
    ).then(() => {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    });
  }

  return (
    <Dialog
      header="Delete Launch Manager"
      visible={true}
      className="w-[30vw]"
      onHide={() => handleCloseModal()}
      draggable={false}
    >
      <div className="flex w-full flex-col gap-8">
        <p className="text-sm">
          Are you sure you want to delete this launch manager?
        </p>
        <div className="flex items-center justify-end gap-4">
          <Button
            className="!h-11 !w-44 !bg-red-500 !text-xs disabled:!cursor-not-allowed disabled:!bg-red-400"
            disabled={isLoading}
            type="submit"
            text={
              isLoading ? (
                <img
                  className="h-10 w-10"
                  src="/svg/general/loading.svg"
                  alt="loading"
                />
              ) : (
                `Delete Launch Manager`
              )
            }
            onClick={() => handleDeleteLaunchManager()}
          />
        </div>
      </div>
    </Dialog>
  );
}
