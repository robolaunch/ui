import TableActionButtons from "../TableActionButtons/TableActionButtons";
import { INamespace } from "../../interfaces/global/namespace.interface";
import { IFleet } from "../../interfaces/global/fleet.interface";
import { Fragment, ReactElement, useState } from "react";
import useFunctions from "../../hooks/useFunctions";
import { useAppSelector } from "../../hooks/redux";
import VerifyModal from "../../modals/VerifyModal";

interface INSActionCells {
  data: IFleet | INamespace;
  reload: () => void;
}

export default function NSActionCells({
  data,
  reload,
}: INSActionCells): ReactElement {
  const [isDeleteModalVisible, setIsDeleteModalVisible] =
    useState<boolean>(false);
  const { applicationMode } = useAppSelector((state) => state.user);
  const { deleteFleetFC, deleteNamespaceFC } = useFunctions();

  async function handleDelete() {
    applicationMode
      ? await deleteNamespaceFC(data?.name)
      : await deleteFleetFC(data?.name);

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
          buttonText={`Delete ${applicationMode ? "Namespace" : "Fleet"}`}
          text={`Are you sure you want to delete this ${applicationMode ? "namespace" : "fleet"}?`}
          header={`Delete ${applicationMode ? "Namespace" : "Fleet"}`}
          handleCloseModal={() => setIsDeleteModalVisible(false)}
          handleOnClick={handleDelete}
        />
      )}
    </Fragment>
  );
}
