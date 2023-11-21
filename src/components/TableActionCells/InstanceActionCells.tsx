import { envCreateInstance } from "../../helpers/envProvider";
import ChangeStateInstanceModal from "../../modals/ChangeStateInstanceModal";
import TerminateInstanceModal from "../../modals/TerminateInstanceModal";
import { Fragment, ReactElement, useEffect, useState } from "react";
import TableActionButtons from "../TableActionButtons/TableActionButtons";
interface IInstanceActionCells {
  data: any;
  reload: () => void;
}

export default function InstanceActionCells({
  data,
  reload,
}: IInstanceActionCells): ReactElement {
  const [isChangeStateModalVisible, setIsChangeStateModalVisible] =
    useState<boolean>(false);
  const [isTerminateModalVisible, setIsTerminateModalVisible] =
    useState<boolean>(false);

  const [disabledSwitchButton, setDisabledSwitchButton] =
    useState<boolean>(false);

  useEffect(() => {
    if (!envCreateInstance) {
      return setDisabledSwitchButton(true);
    }

    if (
      (data?.state === "running" &&
        data?.robolaunchState === "ConnectionHub_Ready") ||
      data?.state === "stopped"
    ) {
      return setDisabledSwitchButton(false);
    }
    return setDisabledSwitchButton(true);
  }, [data]);

  return (
    <Fragment>
      <TableActionButtons
        showDeleteButton
        disabledDeleteButton={!envCreateInstance}
        onClickDeleteButton={() => setIsTerminateModalVisible(true)}
        showStartStopButton
        disabledStartStopButton={
          !envCreateInstance ? true : disabledSwitchButton
        }
        onClickStartStopButton={() => setIsChangeStateModalVisible(true)}
        instanceState={data?.state}
        loadingStartStopButton={
          !envCreateInstance ? false : disabledSwitchButton
        }
      />

      {isChangeStateModalVisible && (
        <ChangeStateInstanceModal
          data={data}
          reload={reload}
          handleCloseModal={() => setIsChangeStateModalVisible(false)}
        />
      )}
      {isTerminateModalVisible && (
        <TerminateInstanceModal
          data={data}
          reload={reload}
          handleCloseModal={() => setIsTerminateModalVisible(false)}
        />
      )}
    </Fragment>
  );
}
