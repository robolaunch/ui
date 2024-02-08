import { Fragment, ReactElement, useEffect, useState } from "react";
import TableActionButtons from "../TableActionButtons/TableActionButtons";
import VerifyModal from "../../modals/VerifyModal";
import useFunctions from "../../hooks/useFunctions";
import { envCreatableInstance } from "../../helpers/envProvider";
import { ICloudInstance } from "../../interfaces/global/cloudInstance.interface";

interface ICIActionCells {
  instance: ICloudInstance;
  reload: () => void;
}

export default function CIActionCells({
  instance,
  reload,
}: ICIActionCells): ReactElement {
  const [isChangeStateModalVisible, setIsChangeStateModalVisible] =
    useState<boolean>(false);
  const [isTerminateModalVisible, setIsTerminateModalVisible] =
    useState<boolean>(false);
  const [disabledSwitchButton, setDisabledSwitchButton] =
    useState<boolean>(false);

  const { stopInstanceFC, startInstanceFC, deleteInstanceFC } = useFunctions();

  useEffect(() => {
    setDisabledSwitchButton(
      !envCreatableInstance ||
        !(
          (instance?.providerState === "running" &&
            instance?.rlState === "ConnectionHub_Ready") ||
          instance?.providerState === "stopped"
        ),
    );
  }, [instance]);

  async function handleOnClick(action: "start" | "stop" | "delete") {
    if (instance?.id) {
      if (action === "start") await startInstanceFC(instance?.id);
      if (action === "stop") await stopInstanceFC(instance?.id);
      if (action === "delete") await deleteInstanceFC(instance?.id);

      setTimeout(() => {
        reload();
        setIsChangeStateModalVisible(false);
        setIsTerminateModalVisible(false);
      }, 1000);
    }
  }

  return (
    <Fragment>
      <TableActionButtons
        showDeleteButton
        disabledDeleteButton={!envCreatableInstance}
        onClickDeleteButton={() => setIsTerminateModalVisible(true)}
        showStartStopButton
        disabledStartStopButton={!envCreatableInstance || disabledSwitchButton}
        onClickStartStopButton={() => setIsChangeStateModalVisible(true)}
        instanceState={
          instance?.providerState === "running" ? "running" : "stopped"
        }
        loadingStartStopButton={!envCreatableInstance || disabledSwitchButton}
      />

      {isChangeStateModalVisible && (
        <VerifyModal
          handleCloseModal={() => setIsChangeStateModalVisible(false)}
          loading={
            instance?.providerState === "running" ||
            instance?.providerState === "stopped"
          }
          disabled={
            instance?.providerState !== "running" &&
            instance?.providerState !== "stopped"
          }
          header={`${instance?.providerState === "running" ? "Stop" : "Start"} Instance`}
          handleOnClick={() =>
            handleOnClick(
              instance?.providerState === "running" ? "stop" : "start",
            )
          }
          text={`Are you sure you want to ${instance?.providerState === "running" ? "stop" : "start"} this instance?`}
          buttonText={
            instance?.providerState === "running"
              ? "Stop Instance"
              : "Start Instance"
          }
        />
      )}

      {isTerminateModalVisible && (
        <VerifyModal
          handleCloseModal={() => setIsTerminateModalVisible(false)}
          header={`Terminate Instance ${instance?.name}`}
          handleOnClick={() => handleOnClick("delete")}
          text={`If you terminate this instance, delete all data associated with it. This action cannot be undone. Are you sure you want to terminate this instance?`}
          buttonText={`Terminate Instance`}
        />
      )}
    </Fragment>
  );
}
