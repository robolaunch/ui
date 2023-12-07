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
      className="!h-11 border border-layer-primary-700 !bg-layer-light-50 text-xs !text-layer-primary-700 transition-all duration-500 hover:!bg-layer-primary-100"
      text="Cancel"
    />
  );
}
