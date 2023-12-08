import React, { Fragment, ReactElement, useState } from "react";
import CardLayout from "../../layouts/CardLayout";
import Button from "../Button/Button";
import { RiErrorWarningFill } from "react-icons/ri";
import DeactiveAccountModal from "../../modals/DeactiveAccountModal";

interface IProfileDeactivate {
  className?: string;
}

export default function ProfileDeactivate({
  className,
}: IProfileDeactivate): ReactElement {
  const [isShowDeactiveModal, setIsShowDeactiveModal] =
    useState<boolean>(false);

  return (
    <CardLayout className={`flex h-fit flex-col gap-8 p-6 ${className}`}>
      <Fragment>
        <p className="text-light-600 text-lg font-bold">Profile Deactive</p>

        <div className="flex flex-col items-end gap-4">
          <div className="flex w-full items-center gap-4 rounded-lg border border-yellow-500 bg-yellow-100 p-4">
            <RiErrorWarningFill
              className="text-2xl text-yellow-600"
              size={32}
            />
            <div className="flex flex-col gap-2">
              <div className="text-sm font-medium">
                You Are Deactivating Your Account
              </div>
              <p className="text-light-500 text-xs">
                You will no longer be able to access your account and all your
                data will be deleted.
              </p>
            </div>
          </div>
          <Button
            onClick={() => setIsShowDeactiveModal(true)}
            className="!h-10 w-40 bg-red-600 text-xs !ring-red-400 transition-all duration-300 hover:!bg-red-800"
            text={`Deactive Account`}
          />
        </div>
        {isShowDeactiveModal && (
          <DeactiveAccountModal
            handleCloseModal={() => setIsShowDeactiveModal(false)}
            visibleModal={isShowDeactiveModal}
          />
        )}
      </Fragment>
    </CardLayout>
  );
}
