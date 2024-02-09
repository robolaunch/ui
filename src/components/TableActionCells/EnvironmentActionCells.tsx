import { Fragment, ReactElement, useState } from "react";
import { IEnvironment } from "../../interfaces/environment/environment.interface";
import { useAppSelector } from "../../hooks/redux";
import useFunctions from "../../hooks/useFunctions";
import VerifyModal from "../../modals/VerifyModal";
import TableActionButtons from "../TableActionButtons/TableActionButtons";

interface IEnvironmentActionCells {
  data: IEnvironment;
  reload: () => void;
}

export default function EnvironmentActionCells({
  data,
  reload,
}: IEnvironmentActionCells): ReactElement {
  const [isDeleteModalVisible, setIsDeleteModalVisible] =
    useState<boolean>(false);

  const { applicationMode } = useAppSelector((state) => state.user);

  const { deleteApplicationFC, deleteRobotFC } = useFunctions();

  async function handleDelete() {
    applicationMode
      ? await deleteApplicationFC(data?.step1?.details?.name)
      : await deleteRobotFC(data?.step1?.details?.name);

    setTimeout(() => {
      reload();
      setIsDeleteModalVisible(false);
    }, 1000);
  }

  return (
    <Fragment>
      <TableActionButtons
        showDeleteButton
        onClickDeleteButton={() => setIsDeleteModalVisible(true)}
      />
      {isDeleteModalVisible && (
        <VerifyModal
          buttonText={`Delete ${applicationMode ? "Application" : "Robot"}`}
          handleCloseModal={() => setIsDeleteModalVisible(false)}
          handleOnClick={handleDelete}
          header={`Delete ${applicationMode ? "Application" : "Robot"}`}
          text={`Are you sure you want to delete this ${applicationMode ? "application" : "robot"} ?`}
        />
      )}
    </Fragment>
  );
}
