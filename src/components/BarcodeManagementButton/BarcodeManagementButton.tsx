import { ReactElement } from "react";

interface IBarcodeManagementButton {
  icon: ReactElement;
  onClick: () => void;
}

export default function BarcodeManagementButton({
  icon,
  onClick,
}: IBarcodeManagementButton): ReactElement {
  return (
    <div
      className="transition-500 flex h-9 w-9 cursor-pointer items-center justify-center rounded border border-light-300 bg-light-50 opacity-60 hover:bg-light-100"
      onClick={onClick}
    >
      {icon}
    </div>
  );
}
