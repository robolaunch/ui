import { Dialog } from "primereact/dialog";
import React, { ReactElement, useState } from "react";
import Button from "../components/Button/Button";
import { useAppDispatch } from "../hooks/redux";
import { restartService, vdiSoftReload } from "../toolkit/ServiceSlice";
import useRobot from "../hooks/useRobot";
import useMain from "../hooks/useMain";

interface IDeleteRobotModalModal {
  type: "ide" | "vdi" | "soft-vdi";
  handleCloseModal: () => void;
}

export default function RestartServiceModal({
  type,
  handleCloseModal,
}: IDeleteRobotModalModal): ReactElement {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { responseRobot } = useRobot();
  const { selectedState } = useMain();

  const dispatch = useAppDispatch();

  async function handleRestartService() {
    await setIsLoading(true);

    if (type === "soft-vdi") {
      await dispatch(
        vdiSoftReload({
          organizationId: selectedState.organization?.organizationId!,
          roboticsCloudName: selectedState.roboticsCloud?.name!,
          region: selectedState.roboticsCloud?.region!,
          fleetName: selectedState.fleet?.name!,
          instanceId: selectedState.instance?.instanceId!,
          environmentName: responseRobot.name,
          podName: responseRobot?.vdiPodName,
        }),
      );
      await setIsLoading(false);
      await handleCloseModal();
      await window.location.reload();
      return;
    }

    await dispatch(
      restartService({
        organizationId: selectedState.organization?.organizationId!,
        roboticsCloudName: selectedState.roboticsCloud?.name!,
        region: selectedState.roboticsCloud?.region!,
        fleetName: selectedState.fleet?.name!,
        instanceId: selectedState.instance?.instanceId!,
        environmentName: responseRobot.name,
        podName:
          type === "ide"
            ? responseRobot?.idePodName
            : responseRobot?.vdiPodName,
      }),
    );
    await setIsLoading(false);
    await handleCloseModal();
    await window.location.reload();
  }

  return (
    <Dialog
      header="Restart Service"
      visible={true}
      className="w-[30vw]"
      onHide={() => handleCloseModal()}
    >
      <div className="flex w-full flex-col gap-8">
        <p className="text-sm">
          Are you sure you want to {type === "soft-vdi" && "soft"} restart the{" "}
          <span className="font-semibold">{type}</span> service?
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
                `Restart Service`
              )
            }
            onClick={() => handleRestartService()}
          />
        </div>
      </div>
    </Dialog>
  );
}
