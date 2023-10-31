import React, { ReactElement } from "react";

interface ICFGridButton {
  key: number;
  selected: boolean;
  disabled: boolean;
  text: string | ReactElement;
  onClick: () => void;
}

export default function CFGridButton({
  key,
  selected,
  disabled,
  text,
  onClick,
}: ICFGridButton): ReactElement {
  return (
    <div
      key={key}
      className={`transition-300 flex items-center justify-center rounded border-2 px-1 py-3 text-xs capitalize text-layer-dark-700 hover:scale-95
        ${selected && "border-layer-primary-600 shadow"}
        ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
      onClick={onClick}
    >
      {text}
    </div>
  );
}
