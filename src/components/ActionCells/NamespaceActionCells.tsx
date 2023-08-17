import React, { Fragment, ReactElement, useState } from "react";
import Button from "../Button/Button";
import { BiTrash } from "react-icons/bi";
import DeleteNamespaceModal from "../../modals/DeleteNamespaceModal";

interface INamespaceActionCells {
  data: any;
  reload: () => void;
}

export default function NamespaceActionCells({
  data,
  reload,
}: INamespaceActionCells): ReactElement {
  const [isDeleteModalVisible, setIsDeleteModalVisible] =
    useState<boolean>(false);

  return (
    <Fragment>
      <div className="card flex gap-4 float-right">
        <Button
          className={`!w-8 !h-8 !bg-transparent !border !border-red-600`}
          text={<BiTrash className="text-red-600" />}
          onClick={() => setIsDeleteModalVisible(true)}
        />
      </div>
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
