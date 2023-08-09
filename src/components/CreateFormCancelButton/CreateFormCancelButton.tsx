import React, { ReactElement } from "react";
import useMain from "../../hooks/useMain";
import Button from "../Button/Button";

interface ICreateFormCancelButton {
  disabled?: boolean;
}

export default function CreateFormCancelButton({
  disabled,
}: ICreateFormCancelButton): ReactElement {
  const { setSidebarState } = useMain();

  return (
    <Button
      onClick={() => {
        setSidebarState((prev: any) => {
          return {
            ...prev,
            isCreateMode: false,
          };
        });
      }}
      disabled={disabled}
      type="button"
      className="!h-11 text-xs !bg-layer-light-50 !text-layer-primary-700 hover:!bg-layer-primary-100 border border-layer-primary-700 transition-all duration-500"
      text="Cancel"
    />
  );
}