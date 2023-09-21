import React, { ReactElement } from "react";

interface ICreateRobotFormDeleteButton {
  onClick: () => void;
  text: string;
  disabled?: boolean;
}

export default function CreateRobotFormDeleteButton({
  onClick,
  text,
  disabled,
}: ICreateRobotFormDeleteButton): ReactElement {
  return (
    <span
      onClick={disabled ? () => {} : onClick}
      className={`mx-auto cursor-pointer text-[0.68rem] font-semibold  ${
        disabled
          ? "text-layer-light-600 hover:cursor-not-allowed"
          : "text-red-500 hover:underline"
      }`}
    >
      {text}
    </span>
  );
}
