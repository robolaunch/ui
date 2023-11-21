import { Fragment, ReactElement, useState } from "react";
import DeleteFleetModalModal from "../../modals/DeleteFleetModal";
import TableActionButtons from "../TableActionButtons/TableActionButtons";

interface IFleetActionCells {
  data: any;
  reload: () => void;
}

export default function FleetActionCells({
  data,
  reload,
}: IFleetActionCells): ReactElement {
  const [isDeleteModalVisible, setIsDeleteModalVisible] =
    useState<boolean>(false);

  return (
    <Fragment>
      <TableActionButtons
        showDeleteButton
        onClickDeleteButton={() => setIsDeleteModalVisible(true)}
      />

      {isDeleteModalVisible && (
        <DeleteFleetModalModal
          data={data || undefined}
          reload={reload}
          handleCloseModal={() => setIsDeleteModalVisible(false)}
          visibleModal={isDeleteModalVisible}
        />
      )}
    </Fragment>
  );
}
