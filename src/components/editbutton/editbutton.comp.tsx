import { ReactElement } from "react";
import { RiEditLine } from "react-icons/ri";

interface IEditButton {
  onClick?: () => void;
}

export default function EditButton({ onClick }: IEditButton): ReactElement {
  return (
    <RiEditLine
      className="cursor-pointer text-secondary-600 transition-all duration-300 hover:scale-90"
      size={20}
      onClick={onClick ? onClick : () => {}}
    />
  );
}
