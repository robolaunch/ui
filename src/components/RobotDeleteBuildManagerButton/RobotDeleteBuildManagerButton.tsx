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
        className="w-full !h-11 text-xs !bg-transparent hover:!bg-red-100 !text-red-500 !border !border-red-500 focus:!ring-red-300"
        text={
          submitting ? (
            <img
              className="w-10 h-10"
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
