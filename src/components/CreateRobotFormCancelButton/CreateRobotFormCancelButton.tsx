import React, { ReactElement } from "react";
import useMain from "../../hooks/useMain";
import Button from "../Button/Button";

interface ICreateRobotFormCancelButton {
  disabled?: boolean;
}

export default function CreateRobotFormCancelButton({
  disabled,
}: ICreateRobotFormCancelButton): ReactElement {
  const { setSidebarState } = useMain();

  return (
    <Button
      onClick={() => {
        setSidebarState((prev: any) => {
          return {
            ...prev,
            isCreateMode: false,
            page: "robot",
          };
        });
      }}
      disabled={disabled || false}
      type="button"
      className="!h-11 border border-layer-primary-700 !bg-layer-light-50 text-xs !text-layer-primary-700 transition-all duration-500 hover:!bg-layer-primary-100"
      text="Cancel"
    />
  );
}
