import React, { Fragment, ReactElement, useState } from "react";
import Button from "../Button/Button";
import DeleteBuildManagerModal from "../../modals/DeleteBuildManagerModal";

interface IRobotDeleteBuildManagerButton {
  disabled: boolean;
  submitting: boolean;
}

export default function RobotDeleteBuildManagerButton({
  disabled,
  submitting,
}: IRobotDeleteBuildManagerButton): ReactElement {
  const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);

  return (
    <Fragment>
      <Button
        type="button"
        disabled={disabled}
        className="!h-11 w-full !border !border-red-500 !bg-transparent text-xs !text-red-500 hover:!bg-red-100 focus:!ring-red-300"
        text={
          submitting ? (
            <img
              className="h-10 w-10"
              src="/svg/general/loading.svg"
              alt="loading"
            />
          ) : (
            `Delete Build Configration`
          )
        }
        onClick={() => setIsShowDeleteModal(true)}
      />
      {isShowDeleteModal && (
        <DeleteBuildManagerModal
          handleCloseModal={() => setIsShowDeleteModal(false)}
        />
      )}
    </Fragment>
  );
}
