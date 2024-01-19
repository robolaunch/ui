import DeleteEnvironmentModal from "../../modals/DeleteEnvironmentModal";
import { Fragment, ReactElement, useState } from "react";
import { BiTrash } from "react-icons/bi";
import Button from "../Button/Button";

interface IEnvironmentActionCells {
  data: any;
  reload: () => void;
}

export default function EnvironmentActionCells({
  data,
  reload,
}: IEnvironmentActionCells): ReactElement {
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
        <DeleteEnvironmentModal
          data={data || undefined}
          reload={reload}
          handleCloseModal={() => setIsDeleteModalVisible(false)}
          visibleModal={isDeleteModalVisible}
        />
      )}
    </Fragment>
  );
}
