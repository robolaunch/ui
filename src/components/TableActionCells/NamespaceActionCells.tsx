import { Fragment, ReactElement, useState } from "react";
import DeleteNamespaceModal from "../../modals/DeleteNamespaceModal";
import TableActionButtons from "../TableActionButtons/TableActionButtons";

interface INSActionCells {
  data: any;
  reload: () => void;
}

export default function NSActionCells({
  data,
  reload,
}: INSActionCells): ReactElement {
  const [isDeleteModalVisible, setIsDeleteModalVisible] =
    useState<boolean>(false);

  return (
    <Fragment>
      <TableActionButtons
        showDeleteButton
        onClickDeleteButton={() => setIsDeleteModalVisible(true)}
      />

      {isDeleteModalVisible && (
        <DeleteNamespaceModal
          data={data || undefined}
          reload={reload}
          handleCloseModal={() => setIsDeleteModalVisible(false)}
          visibleModal={isDeleteModalVisible}
        />
      )}
    </Fragment>
  );
}
