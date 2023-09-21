import React, { Fragment, ReactElement } from "react";
import CardLayout from "../../layouts/CardLayout";
import Button from "../Button/Button";
import { RiErrorWarningFill } from "react-icons/ri";

interface IProfileChangePassword {
  className?: string;
}

export default function ProfileChangePassword({
  className,
}: IProfileChangePassword): ReactElement {
  return (
    <CardLayout className={`flex h-fit flex-col gap-8 p-6 ${className}`}>
      <Fragment>
        <p className="text-lg font-bold text-layer-dark-600">Change Password</p>

        <div className="flex flex-col items-end gap-4">
          <div className="flex w-full items-center gap-4 rounded-lg border border-layer-secondary-500 bg-layer-secondary-100 p-4">
            <RiErrorWarningFill
              className="text-2xl text-layer-secondary-600"
              size={32}
            />
            <div className="flex flex-col gap-2">
              <div className="text-sm font-medium">
                You Are Changing Your Password
              </div>
              <p className="text-xs text-layer-dark-500">
                If you want to change your password, we will send you an email
              </p>
            </div>
          </div>
          <Button
            className="!h-10 w-40 text-xs transition-all duration-300"
            text={`Change Password`}
          />
        </div>
      </Fragment>
    </CardLayout>
  );
}
