import React, { ReactElement } from "react";
import { BsPlusCircle } from "react-icons/bs";

interface ICreateRobotFormAddButton {
  onClick: () => void;
  description?: string;
  disabled?: boolean;
  className?: string;
}

export default function CreateRobotFormAddButton({
  onClick,
  description,
  disabled,
  className,
}: ICreateRobotFormAddButton): ReactElement {
  return (
    <BsPlusCircle
      title={description}
      onClick={disabled ? () => {} : onClick}
      size={22}
      className={`animate__animated animate__fadeIn mx-auto mt-4 cursor-pointer transition-all duration-500 ${
        disabled
          ? "text-layer-light-600 hover:cursor-not-allowed"
          : "text-layer-primary-700 hover:scale-90 hover:text-layer-primary-500"
      } ${className}`}
    />
  );
}
