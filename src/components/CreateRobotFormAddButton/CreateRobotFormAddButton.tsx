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
      size={18}
      className={`animate-fadeIn mx-auto mt-4 cursor-pointer transition-all duration-500 ${
        disabled
          ? "text-light-600 hover:cursor-not-allowed"
          : "text-primary-700 hover:scale-90 hover:text-primary-500"
      } ${className}`}
    />
  );
}
