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
      <div className="card float-right flex gap-4">
        <Button
          className={`!h-8 !w-8 !border !border-red-600 !bg-transparent`}
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
