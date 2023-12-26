import { ReactElement } from "react";
import { MdRemoveCircleOutline } from "react-icons/md";

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
      <MdRemoveCircleOutline color={disabled ? "gray" : "red"} size={18} />
    </button>
  );
}
