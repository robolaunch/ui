import { BiPencil, BiPlayCircle, BiStopCircle, BiTrash } from "react-icons/bi";
import { IconBaseProps } from "react-icons";
import Button from "../Button/Button";
import { ReactElement } from "react";

interface ITableActionButton {
  type: "edit" | "delete" | "stop" | "start";
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
}

export default function TableActionButton({
  type,
  disabled,
  loading,
  onClick,
}: ITableActionButton): ReactElement {
  function colorHandle(): string {
    if (disabled) {
      return "text-light-500";
    }

    switch (type) {
      case "delete": {
        return "text-red-500 border-red-500";
      }
    }

    return "text-primary-500 border-primary-500";
  }

  const props: IconBaseProps = {
    size: 14,
  };

  return (
    <Button
      className={`!h-8 !w-8 !border !bg-transparent disabled:!border-light-500 ${colorHandle()} `}
      text={(() => {
        switch (type) {
          case "edit": {
            return <BiPencil {...props} className={colorHandle()} />;
          }
          case "delete": {
            return <BiTrash {...props} className={colorHandle()} />;
          }
          case "start": {
            return <BiPlayCircle {...props} className={colorHandle()} />;
          }
          case "stop": {
            return <BiStopCircle {...props} className={colorHandle()} />;
          }
        }
      })()}
      onClick={onClick}
      disabled={disabled}
      loading={loading}
    />
  );
}
