import { deleteBuildManager } from "../toolkit/RobotSlice";
import useCreateRobot from "../hooks/useCreateRobot";
import Button from "../components/Button/Button";
import { useAppDispatch } from "../hooks/redux";
import { ReactElement, useState } from "react";
import { useParams } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import useMain from "../hooks/useMain";

interface IDeleteBuildManagerModal {
  handleCloseModal: () => void;
}

export default function DeleteBuildManagerModal({
  handleCloseModal,
}: IDeleteBuildManagerModal): ReactElement {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const url = useParams();
  const { selectedState } = useMain();
  const { robotData } = useCreateRobot();

  function handleDeleteBuildManager() {
    setIsLoading(true);

    dispatch(
      deleteBuildManager({
        organizationId: selectedState?.organization!.id,
        roboticsCloudName: selectedState?.roboticsCloud!.name,
        instanceId: selectedState?.instance?.id!,
        fleetName: selectedState?.fleet?.name!,
        robotName: url?.robotName as string,
        physicalInstanceName: robotData?.step1.details?.physicalInstanceName,
        region: selectedState?.roboticsCloud!.region,
      }),
    ).then(() => {
      setTimeout(() => {
        window.location.reload();
      }, 2500);
    });
  }

  return (
    <Dialog
      header="Delete Build Manager"
      visible={true}
      className="w-[30vw]"
      onHide={() => handleCloseModal()}
      draggable={false}
    >
      <div className="flex w-full flex-col gap-8">
        <p className="text-sm">
          Are you sure you want to delete this build manager?
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
                `Delete Build Manager`
              )
            }
            onClick={() => handleDeleteBuildManager()}
          />
        </div>
      </div>
    </Dialog>
  );
}
