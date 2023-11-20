import { envCreateInstance } from "../../helpers/envProvider";
import ChangeStateInstanceModal from "../../modals/ChangeStateInstanceModal";
import TerminateInstanceModal from "../../modals/TerminateInstanceModal";
import { Fragment, ReactElement, useState } from "react";
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

  return (
    <Fragment>
      <TableActionButtons
        showDeleteButton
        disabledDeleteButton={!envCreateInstance}
        onClickDeleteButton={() => setIsTerminateModalVisible(true)}
        showStartStopButton
        disabledStartStopButton={!envCreateInstance}
        onClickStartStopButton={() => setIsChangeStateModalVisible(true)}
        instanceState={data?.state}
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
