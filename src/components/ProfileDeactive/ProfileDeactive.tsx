import React, { Fragment, ReactElement } from "react";
import CardLayout from "../../layouts/CardLayout";
import Button from "../Button/Button";
import { RiErrorWarningFill } from "react-icons/ri";

interface IProfileDeactive {
  className?: string;
}

export default function ProfileDeactive({
  className,
}: IProfileDeactive): ReactElement {
  return (
    <CardLayout className={`flex flex-col gap-8 p-6 h-fit ${className}`}>
      <Fragment>
        <p className="text-lg font-bold text-layer-dark-600">
          Profile Deactive
        </p>

        <div className="flex flex-col gap-4 items-end">
          <div className="w-full flex gap-4 items-center bg-yellow-100 border border-yellow-500 rounded-lg p-4">
            <RiErrorWarningFill
              className="text-yellow-600 text-2xl"
              size={32}
            />
            <div className="flex flex-col gap-2">
              <div className="font-medium text-sm">
                You Are Deactivating Your Account
              </div>
              <p className="text-xs text-layer-dark-500">
                You will no longer be able to access your account and all your
                data will be deleted.
              </p>
            </div>
          </div>
          <Button
            className="!h-10 w-40 bg-red-600 hover:!bg-red-800 !ring-red-400 transition-all duration-300 text-xs"
            text={`Deactive Account`}
          />
        </div>
      </Fragment>
    </CardLayout>
  );
}
