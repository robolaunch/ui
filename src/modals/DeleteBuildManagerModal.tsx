import React, { ReactElement, useState } from "react";
import { deleteBuildManager } from "../toolkit/RobotSlice";
import Button from "../components/Button/Button";
import { useAppDispatch } from "../hooks/redux";
import { useParams } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import useRobot from "../hooks/useRobot";
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
  const { robotData } = useRobot();

  function handleDeleteBuildManager() {
    setIsLoading(true);

    dispatch(
      deleteBuildManager({
        organizationId: selectedState?.organization?.organizationId,
        roboticsCloudName: selectedState?.roboticsCloud?.name,
        instanceId: selectedState?.instance?.instanceId,
        fleetName: selectedState?.fleet?.name,
        robotName: url?.robotName as string,
        physicalInstanceName: robotData?.step1?.physicalInstanceName,
        region: selectedState?.roboticsCloud?.region,
        buildManagerName: robotData?.step3?.buildManagerName,
      })
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
      <div className="w-full flex flex-col gap-8">
        <p className="text-sm">
          Are you sure you want to delete this build manager?
        </p>
        <div className="flex justify-end items-center gap-4">
          <Button
            className="!w-44 !h-11 !text-xs !bg-red-500 disabled:!bg-red-400 disabled:!cursor-not-allowed"
            disabled={isLoading}
            type="submit"
            text={
              isLoading ? (
                <img
                  className="w-10 h-10"
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
