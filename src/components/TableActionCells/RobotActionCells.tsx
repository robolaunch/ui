import DeleteRobotModalModal from "../../modals/DeleteRobotModal";
import { Fragment, ReactElement, useState } from "react";
import { BiTrash } from "react-icons/bi";
import Button from "../Button/Button";

interface IRobotActionCells {
  data: any;
  reload: () => void;
}

export default function RobotActionCells({
  data,
  reload,
}: IRobotActionCells): ReactElement {
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
        <DeleteRobotModalModal
          data={data || undefined}
          reload={reload}
          handleCloseModal={() => setIsDeleteModalVisible(false)}
          visibleModal={isDeleteModalVisible}
        />
      )}
    </Fragment>
  );
}
