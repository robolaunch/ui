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
        <p className="text-light-600 text-lg font-bold">Change Password</p>

        <div className="flex flex-col items-end gap-4">
          <div className="border-secondary-500 bg-secondary-100 flex w-full items-center gap-4 rounded-lg border p-4">
            <RiErrorWarningFill
              className="text-secondary-600 text-2xl"
              size={32}
            />
            <div className="flex flex-col gap-2">
              <div className="text-sm font-medium">
                You Are Changing Your Password
              </div>
              <p className="text-light-500 text-xs">
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
