import React, { Fragment, ReactElement, useState } from "react";
import Button from "../Button/Button";
import DeleteLaunchManagerModal from "../../modals/DeleteLaunchManagerModal";

interface IRobotDeleteLaunchManagerButton {
  launchManagerName: string;
}

export default function RobotDeleteLaunchManagerButton({
  launchManagerName,
}: IRobotDeleteLaunchManagerButton): ReactElement {
  const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);

  return (
    <Fragment>
      <Button
        className="text-xs w-full !h-11 !bg-transparent hover:!bg-red-100 !text-red-500 !border !border-red-500 focus:!ring-red-300"
        onClick={() => setIsShowDeleteModal(true)}
        text="Delete Launch Step"
      />
      {isShowDeleteModal && (
        <DeleteLaunchManagerModal
          handleCloseModal={() => setIsShowDeleteModal(false)}
          launchManagerName={launchManagerName}
        />
      )}
    </Fragment>
  );
}
