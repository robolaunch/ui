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
        className="!h-11 w-full !border !border-red-500 !bg-transparent text-xs !text-red-500 hover:!bg-red-100 focus:!ring-red-300"
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
