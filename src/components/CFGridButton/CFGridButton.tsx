import React, { ReactElement } from "react";

interface ICFGridButton {
  selected: boolean;
  disabled: boolean;
  text: string | ReactElement;
  onClick: () => void;
}

export default function CFGridButton({
  selected,
  disabled,
  text,
  onClick,
}: ICFGridButton): ReactElement {
  return (
    <div
      className={`transition-300 flex items-center justify-center rounded border-2 px-1 py-3 text-xs capitalize text-layer-dark-700 
        ${selected && "border-layer-primary-600 shadow"}
        ${disabled ? "cursor-not-allowed" : "cursor-pointer hover:scale-95"}`}
      onClick={onClick}
    >
      {text}
    </div>
  );
}
