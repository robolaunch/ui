import { ReactElement } from "react";
import { BsPlusCircle } from "react-icons/bs";

interface IAddButton {
  onClick?: () => void;
}

export default function AddButton({ onClick }: IAddButton): ReactElement {
  return (
    <BsPlusCircle
      className="mx-auto mt-4 cursor-pointer text-primary-600 transition-all duration-300 hover:scale-90"
      size={20}
      onClick={onClick ? onClick : () => {}}
    />
  );
}
