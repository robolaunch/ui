import React, { ReactElement } from "react";
import useMain from "../../hooks/useMain";
import Button from "../Button/Button";

interface ICFCancelButton {
  disabled?: boolean;
  onClick?: () => void;
}

export default function CFCancelButton({
  disabled,
  onClick,
}: ICFCancelButton): ReactElement {
  const { setSidebarState } = useMain();

  return (
    <Button
      onClick={() => {
        if (onClick) {
          onClick();
        } else {
          setSidebarState((prev: any) => {
            return {
              ...prev,
              isCreateMode: false,
              page: "robot",
            };
          });
        }
      }}
      disabled={disabled || false}
      type="button"
      className="!h-11 border border-primary-700 !bg-light-50 text-xs !text-primary-700 transition-all duration-500 hover:!bg-primary-100"
      text="Cancel"
    />
  );
}
