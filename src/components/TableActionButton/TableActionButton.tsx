import { BiPencil, BiPlayCircle, BiStopCircle, BiTrash } from "react-icons/bi";
import { ReactElement } from "react";
import Button from "../Button/Button";

interface ITableActionButton {
  type: "edit" | "delete" | "stop" | "start";
  disabled?: boolean;
  onClick?: () => void;
}

export default function TableActionButton({
  type,
  disabled,
  onClick,
}: ITableActionButton): ReactElement {
  function colorHandle(): string {
    if (disabled) {
      return "text-layer-light-500";
    }

    switch (type) {
      case "delete": {
        return "text-red-500 border-red-500";
      }
    }

    return "text-layer-primary-500 border-layer-primary-500";
  }

  return (
    <Button
      className={`!h-8 !w-8 !border   !bg-transparent disabled:!border-layer-light-500 ${colorHandle()} `}
      text={(() => {
        switch (type) {
          case "edit": {
            return <BiPencil className={colorHandle()} />;
          }
          case "delete": {
            return <BiTrash className={colorHandle()} />;
          }
          case "start": {
            return <BiPlayCircle className={colorHandle()} />;
          }
          case "stop": {
            return <BiStopCircle className={colorHandle()} />;
          }
        }
      })()}
      onClick={onClick}
      disabled={disabled}
    />
  );
}
