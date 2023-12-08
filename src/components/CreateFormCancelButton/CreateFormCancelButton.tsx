import React, { ReactElement } from "react";
import useMain from "../../hooks/useMain";
import Button from "../Button/Button";

interface ICFCancelButton {
  disabled?: boolean;
}

export default function CFCancelButton({
  disabled,
}: ICFCancelButton): ReactElement {
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
      className="!bg-light-50 border-primary-700 !text-primary-700 hover:!bg-primary-100 !h-11 border text-xs transition-all duration-500"
      text="Cancel"
    />
  );
}
