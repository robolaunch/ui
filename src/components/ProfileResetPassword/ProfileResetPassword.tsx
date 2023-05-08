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
    <CardLayout className={`flex flex-col gap-8 p-6 h-fit ${className}`}>
      <Fragment>
        <p className="text-lg font-bold text-layer-dark-600">Change Password</p>

        <div className="flex flex-col gap-4 items-end">
          <div className="w-full flex gap-4 items-center bg-layer-secondary-100 border border-layer-secondary-500 rounded-lg p-4">
            <RiErrorWarningFill
              className="text-layer-secondary-600 text-2xl"
              size={32}
            />
            <div className="flex flex-col gap-2">
              <div className="font-medium text-sm">
                You Are Changing Your Password
              </div>
              <p className="text-xs text-layer-dark-500">
                If you want to change your password, we will send you an email
              </p>
            </div>
          </div>
          <Button
            className="!h-10 w-40 transition-all duration-300 text-xs"
            text={`Change Password`}
          />
        </div>
      </Fragment>
    </CardLayout>
  );
}
