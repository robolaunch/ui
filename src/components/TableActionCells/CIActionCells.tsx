import TableActionButtons from "../TableActionButtons/TableActionButtons";
import { Fragment, ReactElement, useEffect, useState } from "react";
import { envCreatableInstance } from "../../helpers/envProvider";
import { ICloudInstance } from "../../interfaces/cloudInstance.interface";
import VerifyModal from "../../modals/VerifyModal";
import useFunctions from "../../hooks/useFunctions";

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

  useEffect(() => {
    if (!envCreatableInstance) {
      return setDisabledSwitchButton(true);
    }

    if (
      (instance?.providerState === "running" &&
        instance?.rlState === "ConnectionHub_Ready") ||
      instance?.providerState === "stopped"
    ) {
      return setDisabledSwitchButton(false);
    }
    return setDisabledSwitchButton(true);
  }, [instance]);

  const { stopInstance, startInstance, deleteInstance } = useFunctions();

  return (
    <Fragment>
      <TableActionButtons
        showDeleteButton
        disabledDeleteButton={!envCreatableInstance}
        onClickDeleteButton={() => setIsTerminateModalVisible(true)}
        showStartStopButton
        disabledStartStopButton={
          !envCreatableInstance ? true : disabledSwitchButton
        }
        onClickStartStopButton={() => setIsChangeStateModalVisible(true)}
        instanceState={
          instance?.providerState === "running" ? "running" : "stopped"
        }
        loadingStartStopButton={
          !envCreatableInstance ? false : disabledSwitchButton
        }
      />

      {isChangeStateModalVisible && (
        <VerifyModal
          handleCloseModal={() => setIsChangeStateModalVisible(false)}
          loading={
            instance?.providerState === "running"
              ? false
              : instance?.providerState === "stopped"
                ? false
                : true
          }
          disabled={
            instance?.providerState === "running"
              ? false
              : instance?.providerState === "stopped"
                ? false
                : true
          }
          header={`${instance?.providerState === "running" ? "Stop" : "Start"} Instance`}
          handleOnClick={async () => {
            if (instance?.providerState === "running") {
              await stopInstance(instance?.id);
            } else if (instance?.providerState === "stopped") {
              await startInstance(instance?.id);
            }
            setTimeout(() => {
              reload();
              setIsChangeStateModalVisible(false);
            }, 1000);
          }}
          text={
            instance?.providerState === "running"
              ? "Are you sure you want to stop this instance ?"
              : "Are you sure you want to start this instance ?"
          }
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
          handleOnClick={async () => {
            await deleteInstance(instance?.id);
            setTimeout(() => {
              reload();
              setIsTerminateModalVisible(false);
            }, 1000);
          }}
          text={`If you terminate this instance, delete all data associated with it. Including all robots, fleets, and other resources. This action cannot be undone. Are you sure you want to terminate this instance?`}
          buttonText={`Terminate Instance`}
        />
      )}
    </Fragment>
  );
}
