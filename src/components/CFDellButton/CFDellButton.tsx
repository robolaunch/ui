import React, { ReactElement } from "react";
import { IoTrashBinOutline } from "react-icons/io5";

interface ICFDellButton {
  disabled?: boolean;
  onClick: () => void;
}

export default function CFDellButton({
  disabled,
  onClick,
}: ICFDellButton): ReactElement {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="transition-300 hover:scale-90"
    >
      <IoTrashBinOutline color={disabled ? "gray" : "red"} size={18} />
    </button>
  );
}
